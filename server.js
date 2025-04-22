const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());  // Para permitir acceso desde el frontend en Netlify
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Variable para almacenar los últimos datos
let ultimoDato = {
  device: 'N/A',
  time: 'N/A',
  station: 'N/A',
  data: 'N/A',
  rssi: 'N/A',
  seqNumber: 'N/A',
  deviceTypeId: 'N/A'
};

// Endpoint para recibir datos de Sigfox
app.put('/api/sigfox', (req, res) => {
  const { device, time, station, data, rssi, seqNumber, deviceTypeId } = req.body;

  ultimoDato = {
    device: device || 'N/A',
    time: time || new Date().toISOString(),
    station: station || 'N/A',
    data: data || 'N/A',
    rssi: rssi || 'N/A',
    seqNumber: seqNumber || 'N/A',
    deviceTypeId: deviceTypeId || 'N/A'
  };

  console.log('Datos recibidos de Sigfox:', ultimoDato);
  res.status(200).send('OK');
});

// Endpoint para consultar los últimos datos desde el frontend
app.get('/data', (req, res) => {
  res.json(ultimoDato);
});

// Iniciar el servidor en el puerto 3000 o el que esté disponible
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
