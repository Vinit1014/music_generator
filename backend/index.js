const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');
const trackRoutes = require('./routes/tracks');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', trackRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
