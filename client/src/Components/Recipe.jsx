import React from 'react'

import './Recipe.css';
import Grid from '@material-ui/core/Grid';

import {Link} from 'react-router-dom';

const Recipe = ({id,title,image}) => {
    return (
        <Grid item xs={3}>
        <Link className='link' to ={`/recipe/${id}`}>
        <div className='card'>
            <img src={image} alt="" />
            <div className="card__info">
                <h2>{title}</h2>
            </div>
        </div>
        </Link>
        </Grid>
    );
};

export default Recipe;
