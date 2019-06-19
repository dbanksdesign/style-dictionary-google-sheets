const fetch = require('node-fetch');

// Some of this code is taken from
// https://github.com/kaelig/google-spreadsheets-theo

// This creates the URL to get the data from a google spreadsheet
// in JSON format. You need to supply the key, which is the long string of
// alpha-numeric characters in the URL when you are editing it. Then the 
// worksheetId is the index of the worksheet you want to use.
const createFeedUrl = function(key, worksheetId) {
  return `https://spreadsheets.google.com/feeds/list/${key}/${worksheetId}/public/values?alt=json`;
}

// This does the actual fetching of the JSON data
const fetchSpreadsheetFeed = async function(key, worksheetId) {
  const response = await fetch(createFeedUrl(key, worksheetId));
  const json = await response.json();
  return json;
};


// This maps the JSON returned from google and creates a 'properties'
// object which we will pass to Style Dictionary. 
const mapJsonToTokens = function(json) {
  return json.feed.entry.reduce((ret, token) => {
    // It is quite hard to represent a nested object in a table.
    // This logic is quite brittle and assumes the CTI structure, where
    // category, type, item, subitem, state represent the 5 layers
    // of an object:
    //  category: {
    //    type: {
    //      item: {
    //        subitem: {
    //          state: {
    const category = token.gsx$category.$t;
    const type = token.gsx$type.$t;
    const item = token.gsx$item.$t;
    const subitem = token.gsx$subitem.$t;
    const state = token.gsx$state.$t;
    const value = token.gsx$value.$t;
    const comment = token.gsx$comment.$t;
    let newToken;
    
    // This logic assumes each token at least has a
    // category, type, and item. Subitem and state can be empty
    
    // This will make sure the object structure is ok before
    // writing anything
    if (!ret[category]) {
      ret[category] = {}
    }
    
    if (!ret[category][type]) {
      ret[category][type] = {}
    }
    
    if (!ret[category][type][item]) {
      ret[category][type][item] = {}
    }
    
    if (!!subitem) {
      if (!ret[category][type][item][subitem]) {
        ret[category][type][item][subitem] = {}
      }
      
      if (!!state) {
        if (!ret[category][type][item][subitem][state]) {
          ret[category][type][item][subitem][state] = {}
        }
        newToken = ret[category][type][item][subitem][state];
      } else {
        newToken = ret[category][type][item][subitem];
      }
    } else {
      newToken = ret[category][type][item];
    }
    
    newToken.value = value;
    newToken.comment = comment;

    return ret;
  }, {})
};

const getTokens = async function({ id, worksheet }) {
  const tokenJSON = await fetchSpreadsheetFeed(id, worksheet);
  return mapJsonToTokens(tokenJSON);
}

module.exports = getTokens;