require('dotenv').config();



const { Client } = require('pg');
const path = require('path');
const express = require('express');
const { Console } = require('console');
var bodyParser = require('body-parser');
const { sha256 } = require('js-sha256');

const PORT = process.env.PORT || 3001;

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get("/api/urls.json", (req, res) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  client.connect();

  client.query('SELECT * FROM public.urls', (err, resQuery) => {
    if (err) throw err;
    res.json(resQuery.rows)
    client.end();
  });
});

app.post("/api/update-urls", urlencodedParser, (req, res) => {
  /*
body example:
  { 
    "password": "UPDATE_URLS_SECRET",
    "urls": [
      {"title": "Youtube", "url": "youtube.com"},
      {"title": "Google", "url": "google.com"},
      {"title": "Hub docker", "url": "hub.docker.com"}]
  }
  */
  //check password
  print('update urls, body:')
  print(req.body)
  if (sha256(req.body.password) != process.env.UPDATE_URLS_SECRET_SHA256) {
    res.sendStatus(401)
    return
  }
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  client.connect();

  query = 'TRUNCATE public.urls; INSERT INTO public.urls VALUES '
  req.body.urls.forEach(value => query += `(\'${value.title}\', \'${value.url}\'), `)
  query = query.substring(0, query.length - 2)

  client.query(query, (err, res) => {
    if (err) throw err;
    client.end();
  });

  res.sendStatus(200);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});