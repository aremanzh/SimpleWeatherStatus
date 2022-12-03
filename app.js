const express = require("express");
const https = require("https");
const ejs = require("ejs");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var longitude = "101.6911";
var latitude = "2.9353";

var weatherStatus = "Rain";
var weatherDesc = "moderate rain";
var weatherIcon = "10n";
var weatherIconUrl =
  "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

var weatherTemp = "25.93°";
var weatherPressure = "1009";
var weatherHumidity = "85";

var weatherSpeed = "1.18";
var weatherDegree = "343";

var Country = "My";
var Name = "Putrajaya";

app.get("/", (req, res) => {
  res.render("index", {
    weatherStatus: weatherStatus,
    weatherDesc: weatherDesc,
    weatherTemp: weatherTemp,
    weatherPressure: weatherPressure,
    weatherHumidity: weatherHumidity,
    weatherSpeed: weatherSpeed,
    weatherIconUrl: weatherIconUrl,
    Country: Country,
    Name: Name,
  });
});

app.post("/", (req, res) => {
  const query = req.body.location;
  const apiKey = process.env.APIKEY;
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);

      weatherStatus = weatherData.weather[0].main;
      weatherDesc = weatherData.weather[0].description;
      weatherIcon = weatherData.weather[0].icon;
      weatherTemp = weatherData.main.temp;
      weatherPressure = weatherData.main.pressure;
      weatherHumidity = weatherData.main.humidity;
      weatherSpeed = weatherData.wind.speed;
      weatherIconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@4x.png";
      Country = weatherData.sys.country;
      Name = weatherData.name;

      res.redirect("/");
    });
  });
});

app.listen(process.env.PORT, function () {
  console.log("Server has started");
});
