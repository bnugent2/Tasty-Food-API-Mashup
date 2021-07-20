const express = require('express');
const router = express.Router();
const zomato = require('zomato-api');

const client = zomato({
    userKey: process.env.ZOMATO_KEY
});


router.get('/', (req, res) => {
    let search = req.query.name;
    let lat = req.query.lat;
    let lng = req.query.lng;
    client.search({
        q: search,
        lat: lat,
        lon: lng,
        radius: 3000,
        count: 10
    })
    .then(response => {
        response.restaurants.length === 0 ? res.status(300).send({
            error : true,
            message : "Cannot Find Any Nearby Restaurants Matching Criteria"
        }) :
        res.status(200).send({
            error: false,
            data: response
        })
    })
});

module.exports = router;