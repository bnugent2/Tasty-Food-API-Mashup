import React from "react";
import Grid from "@material-ui/core/Grid";

import "./RecipeDetails.css";

const RecipeDetails = ({ingredients }) => {
  return (
    <div className='RecipeDetails'>
          <h3>Ingredients</h3>
          <ol className="ingredients">
            {ingredients
              ? ingredients.map((ingredient) => <li>{ingredient.original}</li>)
              : null}
          </ol>
    </div>
  );
};

export default RecipeDetails;
