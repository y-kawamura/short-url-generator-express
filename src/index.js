const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const app = express();
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());

app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.get("/:slug", (req, res) => {
  const { slug } = req.params;
  res.json({
    message: slug,
  });
});

app.post("/url", (req, res) => {
  console.log(req.body);

  res.json({
    url: req.body.url,
    slug: req.body.slug,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀Listening on port ${port}`));
