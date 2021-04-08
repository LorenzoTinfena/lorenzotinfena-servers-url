const path = require('path');
const express = require('express');
const { Console } = require('console');
var bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001;

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get("/api/urls.json", (req, res) => {
  res.json([
    {title: "Youtube", url: "youtube.com"},
    {title: "Google", url: "google.com"},
    {title: "Hub docker", url: "hub.docker.com"}
  ]);
});

app.post("/api/update-urls", urlencodedParser, (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});
/* like
  [
    {"title": "Youtube", "url": "youtube.com"},
    {"title": "Google", "url": "google.com"},
    {"title": "Hub docker", "url": "hub.docker.com"}
  ]
*/

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});