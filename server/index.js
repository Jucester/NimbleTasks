const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./src/config/database');

// Inicializate server
const app = express();
// Connect the DB
connectDB();

const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());

app.use(morgan('dev'));
app.use(express.json({ extended: true }));


// Import routes

app.use('/api/users', require('./src/routes/user.routes'));
app.use('/api/login', require('./src/routes/auth.routes'));
app.use('/api/projects', require('./src/routes/projects.routes'));
app.use('/api/tasks', require('./src/routes/tasks.routes'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})