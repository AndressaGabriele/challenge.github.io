const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/paintCalculatorRoutes')

app.use(cors());
app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 8080;
app.listen(8080, () => {
  console.log(`Server is running on port ${PORT}`);
});
