require('dotenv').config();
const express = require('express');
const connectDB = require('./database/db.js');

const app = express();
app.use(express.json());


// Import Routes
app.use('/', require('./routes/router.js'));
app.use('/', require('./routes/router.js'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


app.get('/', (req, res) => {
    res.send('Server is running...');
});
