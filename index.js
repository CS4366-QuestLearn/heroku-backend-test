const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', require('./utils/auth'))


app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));