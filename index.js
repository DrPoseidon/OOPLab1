const express = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express;
const port = 3000;
var objectPool = 3;
app.use(bodyParser.json());
app.use(cors());
app.post("/data", urlencodedParser, (req, res) => {
  if (objectPool !== 0) {
    const data = `http://localhost:3000/${req.body.url}`;
    res.send(data);
    app.get(`/${req.body.url}`, (req, res) => {
      res.send(`В пуле осталось ${objectPool}`);
    });
    objectPool--;
    console.log(objectPool);
  } else {
    res.send(400);
  }
});
app.post("/clear", urlencodedParser, (req, res) => {
  objectPool = 3;
  res.send(200);
});

app.listen(port);
