import React, {useState, useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import RecipeDetails from '../Components/RecipeDetails.jsx';
import ProductComp from '../Components/Product.jsx'
import './Details.css';
import Map from '../Components/Map'
const Details = ({match}) => {

    const [recipe, setrecipe] = useState({});
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState("")


    useEffect(() => {
        getRecipe();
        getProduct();
        setLoading(false)
    },[]);

    const getRecipe = () => {
        const req = `/details/?id=${match.params.id}`;
        fetch(req)
        .then((res) => res.json())
        .then((data) => {
            setrecipe(data)
            setSummary(data.summary.replace(/(<([^>]+)>)/gi, ""));
        });
    }

    const getProduct = () => {
        const req = `/products/?id=${match.params.id}`;
        fetch(req)
        .then((res) => res.json())
        .then((data) => {
            console.log("products:" + data)
            setProduct(data)
        });

    }


    return (
<div className='Details'>
    {loading ? <h2>...loading...</h2> :
        <div> 
            <div className= 'row'>
                <div className= 'column'>
            <img src={recipe.image}/>
            </div  >
                <div className= 'column'>
            <h2>{recipe.title}</h2>
            <h3>Ready in: {recipe.readyInMinutes} Mins</h3>
            <h3>Serves: {recipe.servings}</h3>
            <p>{summary}</p>
            </div>
            </div>
            <div className='row'>
                <div className= 'column'>
            <RecipeDetails 
            ingredients={recipe.extendedIngredients}
            summary={recipe.summary}
            />
            </div>
            <div className='shopping column'>
            <h3>Shopping List</h3>
            {products.map(product => (
            <ProductComp
            name={product.name}
            image ={product.image}
            price = {product.price}
            />
            ))}
            </div>
            </div>
            <div>
                <h2>Don't Want to Cook?</h2>
                <h4>Here's Some Restaurants serving this dish?</h4>
            <Map cuisine={recipe.title}/>
            </div>
        </div>
    }
        </div>
    )
}

export default Details
