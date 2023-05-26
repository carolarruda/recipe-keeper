import "./style.css";

const NewRecipe = () => {
  return (
    <section className="form-container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="big-container">
        <form className="form-stack recipe-form">
          <label htmlFor="recipeTitle">Recipe Title</label>
          <input type="text" required />
          <label htmlFor="recipeIngredients">Ingredients</label>
          <textarea type="text" required />
          <label htmlFor="recipeInstructions">Instructions</label>
          <textarea type="text" required />
          <label htmlFor="image">Image url</label>
          <input type="url" />
          <label htmlFor="rating">Star Rating</label>
          <div class="rating">
            <input type="radio" id="star5" name="rating" value="5" />
            <label for="star5"></label>
            <input type="radio" id="star4" name="rating" value="4" />
            <label for="star4"></label>
            <input type="radio" id="star3" name="rating" value="3" />
            <label for="star3"></label>
            <input type="radio" id="star2" name="rating" value="2" />
            <label for="star2"></label>
            <input type="radio" id="star1" name="rating" value="1" />
            <label for="star1"></label>
          </div>
          <label htmlFor="prepTime">Prep Time</label>
          <input type="time" />
          <label htmlFor="cookTime">Cook Time</label>
          <input type="time" />
          <label htmlFor="numberServings">Servings</label>
          <input type="number" />
          <label htmlFor="notes">Notes</label>
          <input type="text" />
          <label htmlFor="courses">Course</label>
          <label for='entree'>Entree</label>
          <input type="radio" id="entree" name="course" value="entree" /> 
          <label for='main'>Main</label>
          <input type="radio" id="main" name="course" value="main" /> 
          <label for='dessert'>Dessert</label>
          <input type="radio" id="dessert" name="course" value="dessert" /> 
         
        </form>
      </div>
    </section>
  );
};

export default NewRecipe;
