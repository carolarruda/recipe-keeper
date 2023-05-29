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
          <div className="first-column">
            <div className="segment">
              <label htmlFor="recipeTitle">Recipe Title</label>
              <input type="text" required />
            </div>
            <div className="segment">
              <label htmlFor="image">Image url</label>
              <input type="url" />
            </div>
   
            <div className="inline">
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
            </div>
            <div className="segment">
              <label htmlFor="courses">Course</label>
              <select name="course" id="courses" style={{ fontSize: '9px' }}>
              <option value="" disabled selected hidden>Choose course</option>
                <option value="entree">Entree</option>
                <option value="main">Main</option>
                <option value="dessert">Dessert</option>
              </select>
             
            </div>
            <div className="segment">
              <label htmlFor="prepTime">Prep Time</label>
              <input type="time" />
            </div>
            <div className="segment">
              <label htmlFor="cookTime">Cook Time</label>
              <input type="time" />
            </div>
            <div className="segment">
              <label htmlFor="numberServings">Servings</label>
              <input type="number" />
            </div>
          </div>

          <div className="second-column segment">
            <label htmlFor="recipeIngredients">Ingredients</label>
            <textarea type="text" required rows="28"/>
          </div>

          <div className="third-column segment">
            <label htmlFor="recipeInstructions">Instructions</label>
            <textarea type="text" required rows="28"/>
          </div>

          <div className="fourth-column segment">
            <label htmlFor="notes">Notes</label>
            <textarea type="text" rows="28" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewRecipe;
