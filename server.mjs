import * as path from "path";
import fs from "fs";
import express from "express";
import https from "https";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const rootDir = process.cwd();
const port = 3000;
const app = express();

app.use(express.static('spa/build'))

app.get("/client.mjs", (_, res) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.sendFile(path.join(rootDir, "client.mjs"), {
    maxAge: -1,
    cacheControl: false,
  });
});

app.get("/", (_, res) => {
  res.send(":)");
});

app.get("/*", (_, res ) => {
  res.sendFile(path.join(rootDir, "spa/build/index.html"));
})

https.createServer({
  key: fs.readFileSync(path.join(rootDir, '/certs/server.key')),
  cert: fs.readFileSync(path.join(rootDir, '/certs/server.cert'))
}, app)
    .listen(port, function () {
      console.log('Example app listening on port 3000! Go to https://localhost:3000/')
    });


