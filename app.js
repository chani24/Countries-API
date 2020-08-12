const express = require('express');
const app = express();
const fs = require('fs');
let countriesJson = JSON.parse(fs.readFileSync('countries-states-cities.json', 'utf-8'));
let listOfCountriesJson = JSON.parse(fs.readFileSync('countries.json', 'utf-8'));

const countryNames = listOfCountriesJson.map(country => country.name);


app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.listen(process.env.PORT);

app.get('/countries/list', function (req, res) {
   res.send(JSON.stringify(countryNames));
  });



  app.get('/countries/details/:country', function (req, res) {
    const country = req.params.country;
    const parsedCountries = country.split('-').join(' ');

    const countryDetails = countriesJson.find(countries => countries.name == country);

    res.send(JSON.stringify(countryDetails));
   });