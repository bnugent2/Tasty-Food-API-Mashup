const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');



const getProducts = (req, res) => {
    res.products = []
    const token = req.app.get('token')
    const options = {
        method: 'GET',
        headers: {
            'Authorization' :  'Bearer ' + token,
            "Content-Type": "application/json"
        }
    };

    req.ingredients.map(ingredient => {
    let query = encodeURIComponent(ingredient);
    const URL = `https://api.kroger.com/v1/products?filter.term=${query}&filter.limit=1&filter.locationId=01400441`
    fetch(URL, options)
    .then((res) =>res.json())
    .then(data => {
        if(data.data.length===0){
            res.products.push({
                name : "Could not find Product",
                image: "",
                price: ""
            })
        }
        else{
       data.data.map(product => {
        res.products.push({
            name : product.description,
            image: product.images[0].sizes[0].url,
            price: product.items[0].price.regular === null ? "Price not Available" : product.items[0].price.regular
        })
        })
    }
        if(res.products.length == req.ingredients.length){
            res.send(res.products)
        }
    })
    .catch((err) => {
        console.log(err)
        res.send("Error:" + err)
    })
})
}


const getRecipes = (req, res, next) => {
    let id = req.query.id;
    req.ingredients = []
    const API_KEY = process.env.SPOONACULAR_KEY;
    const URL = `https://api.spoonacular.com/recipes/${id}/information?&apiKey=${API_KEY}`
    try {
    fetch(URL)
    .then((res) =>res.json())
    .then(data => {
       data.extendedIngredients.map(ingredient => {
        req.ingredients.push(ingredient.name)
        })
        next();
    })
} catch (error) {
    return res.status(400).json({ error: error.toString() });
  }


}

router.get('/', [getRecipes,getProducts] );



module.exports = router;