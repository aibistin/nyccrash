/* Express Server App for launching on Heroku */
import express, { static } from "express";
//var path = require ('path');
/* Heroku usually supplies a port # */
const port = process.env.PORT || 8080;
const app = express();

app.use(static(__dirname + "/dist/"));

/* Capture all routes */
app.get(/.*/, function(req, resp) {
  resp.sendfile(__dirname + "/dist/index.html");
});

app.listen(port);

console.log("Server started!");
