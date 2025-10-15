require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connection = require('./config/db');
const routes = require('./routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // for logging http requets

// health check
app.get('/', (req, res) => res.send("Health check"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connection();
});