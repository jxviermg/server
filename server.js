const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); // para permitir que tu frontend en Netlify acceda
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let ultimoDato = {
  id: 'N/A',
  time: 'N/A',
  temperature: 'N/A',
  gps: 'N/A'
};

// Endpoint para que Sigfox mande datos con PUT
app.put('/api/sigfox', (req, res) => {
  const { id, time, temperature, lat, lng } = req.body;

  ultimoDato = {
    id: id || 'N/A',
    time: time || new Date().toISOString(),
    temperature: temperature || 'N/A',
    gps: lat && lng ? `${lat}, ${lng}` : 'N/A'
  };

  console.log('Datos recibidos de Sigfox:', ultimoDato);
  res.status(200).send('OK');
});

// Endpoint para que el frontend consulte datos
app.get('/data', (req, res) => {
  res.json(ultimoDato);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
