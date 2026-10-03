const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    app: 'mi-app',
    status: 'ok',
    message: 'Aplicación creada con dbv-specs-ops',
    framework: 'dbv-specs-ops'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor arrancado en http://localhost:${PORT}`);
});
