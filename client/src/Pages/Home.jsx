import React, {useEffect, useState} from 'react';
import './Home.css'

import Recipe from "../Components/Recipe"

import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import Error from "../Errors/Error"

const Home = () => {

    const [search, setsearch] = useState("");
    const [query, setquery] = useState(" ");
    const [recipes, setrecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const req = `/recipes/?name=${query}`;

    useEffect(() => {
        getRecipes();
    }, [query]);

    const getRecipes = () => {
        fetch(req)
        .then((res) => {
            if(res.status == 200){
                setError(false)
                return res.json()
            }else{
                setError(true)
                return res.json();
            } 
        })
        .then((data) => {
            data.error === true ? setErrorMessage(data.message) :
            setrecipes(data.data.results)
        })
        .then(setLoading(false))
    }

    const updateSearch = e => {
            setsearch(e.target.value);
    }

    const getSearch = e => {
        e.preventDefault();
        setquery(search);
    }

    return (  
        <div className='Home'>
            <div className='searchbar'>
                <div className='search'>
                <h2>Find a Recipe</h2>
             <TextField id="search"  size="small" label="Search for Recipe" variant="filled" value={search} onChange={updateSearch}
             InputProps={{
                style:{backgroundColor: "whitesmoke" ,opacity: "80%"},
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}/>
              &nbsp;
              &nbsp;
            <Button variant="contained" color="primary" type="submit" onClick={getSearch}>
                Search
            </Button>
            </div>
            </div>
            { loading ===true ? <CircularProgress /> :
            <div className='results'>
            {error === true ? <Error message= {errorMessage}/> :
            <Grid container spacing={2}>
            {recipes.map(recipe => (
                <Recipe id={recipe.id} title={recipe.title} image={recipe.image}/>
            ))}
            </Grid>
}
            </div>
}
        </div>
    );
}
 
export default Home;