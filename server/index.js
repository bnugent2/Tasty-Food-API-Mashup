const express = require('express');
const logger = require('morgan');
const fetch = require('node-fetch');
const path = require('path');
const btoa = require('btoa');
const dotenv = require('dotenv')
dotenv.config();
const port = 3000;


const recipesRouter = require('./Routes/Recipes');
const detailsRouter = require('./Routes/Details');
const productsRouter = require('./Routes/Products');
const restaurantRouter = require('./Routes/Restaurant');

const app = express();

app.use(express.static('../client/build'))

app.use(logger('tiny'));

app.use('/recipes', recipesRouter);
app.use('/details', detailsRouter);
app.use('/products', productsRouter);
app.use('/restaurants', restaurantRouter);


const getToken = (req, res, next) => {
    const client_id = process.env.KROGER_CLIENT_ID
    const client_secret = process.env.KROGER_CLIENT_SECRET;
    const URL = 'https://api.kroger.com/v1/connect/oauth2/token'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' :  'Basic ' + btoa(client_id + ':' + client_secret)
        },
        body:'grant_type=client_credentials&scope=product.compact'

    }

    fetch(URL, options)
    .then((res) =>res.json())
    .then(data => {
        app.set('token', data.access_token)
    });
};

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  })



app.listen(port, () => {
    getToken();
    console.log(`Server listening at port:${port}`)
});