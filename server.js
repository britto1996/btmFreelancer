const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const { response } = require("express");
const { request } = require("http");
const connectDB = require("./db");
const User = require("./userModel");
require("dotenv").config();
const PORT = process.env.PORT || 9000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

connectDB();

app.post("/", (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=India,${req.body.city}&units=metric&appid=fbcb4f4a1767b17076d039597e00f18d`;
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      res.send(`
      <h1>Your weather condition is ${weatherDescription}</h1>
      <h1>temprature in ${req.body.city} is ${temp} degree celcius</h1>
      <img src="https://source.unsplash.com/random/200x200?sig=2"/>`);
    });
  });
});

app.post("/register", (req, res) => {
  const mail = req.body.email;
  const name = req.body.name;

  const comment = req.body.comment;

  if (!name || !mail || !comment) {
    res.redirect("/failure.html");
  }

  if (!isEmail(mail)) {
    res.redirect("/failure.html");
  }

  const user = new User({
    name: name,
    email: mail,
    comment: comment,
  });

  user.save().then((response) => res.redirect("/success.html"));

  function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== "" && email.match(emailFormat)) {
      return true;
    } else {
      return false;
    }
  }

  //construct req data
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

//API KEY : 9e6d62f3df34879e2de4acb279ffa36b-us6

//List Id : de72131ea9

//mailchimp url : https://us6.api.mailchimp.com/3.0/lists/{listUniqueId}/members/
