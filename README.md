# Google Spreadsheet → Style Dictionary

<img src="assets/style-dictionary-google-sheets.png" alt="Google sheets and style dictionary logo" width="100" style="padding:20px" align="right" />

This example is based on the [google-spreadsheet-theo example](https://github.com/kaelig/google-spreadsheets-theo) written by [Kaelig](https://twitter.com/kaelig) (all credit goes to him for the idea, I'm just piggy-backing on it). This basically does the same thing, but for Style Dictionary. You write your design tokens in a Google spreadsheet and then this will take that it and put it into Style Dictionary and 💥bam💥! 

Before you start you will need a [Google spreadsheet like this one](https://docs.google.com/spreadsheets/d/1PlKmwVnQwSJaZvzHki3HI7I5WoqmMCvWY8hi3kzFjpA). You can use that one for now if you'd like, but you can't edit it. If you are creating your own, make sure the spreadsheet is publicly viewable and that you publish it to the web: File → Publish to the web. Then click the Publish button (leave the default options).


#### Running the example

First of all, set up the required dependencies running the command `npm install` in your local CLI environment (if you prefer to use *yarn*, update the commands accordingly).

At this point, if you want to build the tokens run `npm run build`. This command will generate the files in the `build` folder.


#### How does it work

It fetches data from the public google sheets JSON API, formats it into an object, and passes it to Style Dictionary which does its thing. 


#### What to look at

`getTokens.js` is a function that takes a google sheet ID and worksheet ID. It makes the request to google sheets to get the data, then format into a properties object which we can then pass to Style Dictionary. 

`build.js` is where we take the formatted data from `getTokens.js` and plug it into Style Dictionary. There is a commented out section at the bottom of the file if you want to use data from multiple google sheets documents or worksheets. 