const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.ido0m.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const Device = require('./models/device'); 
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const port = 5000;

const name = "Heater";
var data = [];
/*
const ourDevice = new Device({
  name,
  data
});
ourDevice.save(err => {
  console.log('successfully added device');
});
*/
const low = 10;
const high = 40;
randomtemp = Math.floor(Math.random() * (high - low) + low);
const bed_temp = randomtemp;
const nozel_temp = randomtemp;
const thedata = {nozel_temp: nozel_temp, bed_temp: bed_temp};

Device.findOneAndUpdate(
  { name: "Heater" },
  { $push: { sensorData: thedata } },
  function (error, success) {
    if (error) {
	console.log(error);
    } else {
	console.log(success);
    }
  }
);


app.get('/api/test', (req, res) => {
  res.send('The API is working!');
});

app.get('/api/devices', (req, res) => {
  Device.find({}, (err, devices) => {
    if (err == true) {
      return res.send(err);
    } else {
      return res.send(devices);
    }
  });
});


app.post('/api/devices', (req, res) => {
  const { name, floor, sensorData } = req.body;
  const newDevice = new Device({
    name,
    floor,
    sensorData
  });
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
  });
});


app.post('/api/send-command', (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
