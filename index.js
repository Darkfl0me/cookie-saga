const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const whitelist = ['http://local.shyamlaldigitalwale.com:3000']

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    console.log(origin, 'origin');
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.options("*", cors());
app.get("/cookie", (req, res) => {
  res.cookie('key', 'value', {
    maxAge: 24 * 60 * 60,
    httpOnly: true,
    domain: '.shyamlaldigitalwale.com',
    secure: false,
  })
  res.json({
    msg: "success"
  });
})

app.listen(port, () => {
  console.log('app listening on port ' + port);
})
