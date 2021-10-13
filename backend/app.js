const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
// app.use('/api/v1', router);

app.get('/getAll', (req, res) => {
    console.log('getAll...');
})

app.listen(process.env.PORT, () => {
    console.log('backend is running on PORT ', process.env.PORT);
});