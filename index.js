const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const whitelist = ['http://local.shyamlaldigitalwale.com']

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionSuccessStatus: 200
}

cors(corsOptions);

app.options("*", cors());
app.get("/cookie", (req, res) => {
  res.cookie('key', 'value', {
    maxAge: 24 * 60 * 60,
    httpOnly: true,
    domain: '.shyamlaldigitalwale.com',
    secure: true,
  })
  res.json({
    msg: "success"
  });
})

app.listen(port, () => {
  console.log('app listening on port ' + port);
})