import { useParams } from "react-router-dom";

const RecipeView = ({ recipes }) => {
  const params = useParams();

  return (
    <div>
      {recipes.map(
        (recipe) =>
          recipe.id.toString() === `${params.id}` && (
            <>
              <h1>{recipe.title}</h1>
              <ol>
                {recipe.instructions.split("\n").map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ol>
            </>
          )
      )}
    </div>
  );
};

export default RecipeView;
