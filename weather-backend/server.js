const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 8081; // Changed port to 8081

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/weatherdb'); // Removed deprecated options

const weatherHistorySchema = new mongoose.Schema({
  city: String,
  date: String,
  time: String,
  temp: Number,
  weather: String
});

const WeatherHistory = mongoose.model('WeatherHistory', weatherHistorySchema);

app.post('/api/weatherHistory/:cityName', (req, res) => {
  const cityName = req.params.cityName;
  const historyEntry = { city: cityName, ...req.body };

  WeatherHistory.create(historyEntry, (err, entry) => {
    if (err) {
      return res.status(500).json({ error: 'Error saving weather history' });
    }
    res.status(200).json(entry);
  });
});

app.get('/api/weatherHistory/:cityName', (req, res) => {
  const cityName = req.params.cityName;

  WeatherHistory.find({ city: cityName }, (err, entries) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching weather history' });
    }
    res.status(200).json(entries);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
