const StyleDictionary = require('style-dictionary');
const getTokens = require('./getTokens');

// This is an async function so it returns a promise
getTokens({
  id: `1PlKmwVnQwSJaZvzHki3HI7I5WoqmMCvWY8hi3kzFjpA`,
  worksheet: `1`
})
  // The output is a properties object
  .then(properties => {
    StyleDictionary.extend('./config.json')
      .extend({ properties })
      // You can chain the 'extend' method so first we add the configuration
      // then we add the properties
      .buildAllPlatforms()
  });
  
// If you want to separate your tokens across worksheets you can do this:
// Promise.all([
//   getTokens({
//     id: `1PlKmwVnQwSJaZvzHki3HI7I5WoqmMCvWY8hi3kzFjpA`,
//     worksheet: `1`
//   }),
//   getTokens({
//     id: `1PlKmwVnQwSJaZvzHki3HI7I5WoqmMCvWY8hi3kzFjpA`,
//     worksheet: `2`
//   }),
//   getTokens({
//     id: `1PlKmwVnQwSJaZvzHki3HI7I5WoqmMCvWY8hi3kzFjpA`,
//     worksheet: `3`
//   }),
// ]).then(values => {
//   // values is an array of the return values of all the promises
  
//   // .extend returns a copy of itself, so now we can chain 
//   // iteratively for each properties object returned from getTokens.
//   // .extend does a deep merge so we don't have to worry about
//   // conflicts.
//   let styleDictionary = StyleDictionary.extend('./config.json');
  
//   values.forEach(properties => {
//     styleDictionary = styleDictionary.extend({ properties })
//   });
  
//   styleDictionary.buildAllPlatforms();
// });