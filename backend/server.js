// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { port, allowedOrigin } = require('./config/config');

const authRoutes = require('./routes/authRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const postRoutes = require('./routes/postRoutes');
const emailRoutes = require('./routes/emailRoutes');

const app = express();

app.use(cors({ origin: allowedOrigin }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/auth', authRoutes);
app.use('/organization', organizationRoutes);
app.use('/posts', postRoutes);
app.use('/email', emailRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
