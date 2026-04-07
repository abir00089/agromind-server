const express = require("express");
const app = express();

app.use(express.json());

// Store latest sensor data
let sensorData = {
  soil_moisture: 0,
  temperature: 0,
  humidity: 0,
  ph: 0,
  pump: 1
};

// 📥 RECEIVE DATA FROM ESP32
app.post("/data", (req, res) => {
const { soil_moisture, temperature, humidity, ph, pump } = req.body;

if (
  soil_moisture === undefined ||
  temperature === undefined ||
  humidity === undefined ||
  ph === undefined ||
  pump === undefined
) {
  return res.status(400).json({ error: "Missing fields" });
}

sensorData = {
  soil_moisture,
  temperature,
  humidity,
  ph,
  pump
  };

  console.log("📡 Data received:", sensorData);

  res.status(200).json({ message: "Data received successfully" });
});

// 📤 SEND DATA TO FRONTEND
app.get("/data", (req, res) => {
  res.json(sensorData);
});

// 🌐 ROOT CHECK
app.get("/", (req, res) => {
  res.send("AgroMind Backend Running 🚀");
});

// PORT (Render compatible)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
