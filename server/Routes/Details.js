const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');



router.get('/', (req,res) => {
    let id = req.query.id;
    const API_KEY = process.env.SPOONACULAR_KEY;
    const URL = `https://api.spoonacular.com/recipes/${id}/information?&apiKey=${API_KEY}`
    fetch(URL)
    .then((res) =>res.json())
    .then(data => res.send(data))

});



module.exports = router;



