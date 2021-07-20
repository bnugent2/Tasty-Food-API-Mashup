const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/* GET users listing. */
router.get('/', (req, res) => {
    let name = req.query.name;
    const API_KEY = process.env.SPOONACULAR_KEY;
    const URL = `https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}`
    fetch(URL)
    .then((res) =>res.json())
    .then(data => {
        data.results.length === 0 ? res.status(300).send({
            error : true,
            message : "No Results for given search term"
        }) :
        res.status(200).send({
            error: false,
            data: data})
    })
});

module.exports = router;