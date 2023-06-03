import "../styles/style.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipe = ({ recipes, setRecipes }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [rating, setRating] = useState("");
  const [course, setCourse] = useState("");
  const [prep, setPrep] = useState("");
  const [cook, setCook] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchInitialValue();
  }, []);

  const fetchInitialValue = () => {
    fetch(`http://localhost:4000/recipes/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setPhoto(data.photo);
        setRating(data.rating);
        setCourse(data.course);
        setPrep(data.prep);
        setCook(data.cook);
        setServings(data.servings);
        setIngredients(data.ingredients);
        setInstructions(data.instructions);
        setNotes(data.notes);
      })
      .catch((error) => {
        console.error("Error fetching initial value:", error);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const editedRecipe = {
      title,
      photo,
      rating,
      course,
      prep,
      cook,
      servings,
      ingredients,
      instructions,
      notes,

    };

    const postOpts = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedRecipe),
    };

    fetch(`http://localhost:4000/recipes/${params.id}`, postOpts)
      .then((response) => response.json())
      .then(() => {
        fetch("http://localhost:4000/recipes")
          .then((response) => response.json())
          .then((data) => {
            navigate(`/${params.id}`);
            setRecipes(data);
          });
      });
  }

  const handleChange = (e, setState) => {
    setState(e.target.value);
  };

  return (
    <>
      {recipes.map(
        (recipe) =>
          recipe.id.toString() === params.id && (
            <section className="form-container" key={params.id}>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
              ></link>
              <div className="big-container" id="set-height">
                <form
                  className="form-stack recipe-form"
                  onSubmit={handleSubmit}
                  key={recipe.id}
                >
                  <div className="first-column">
                    <div className="segment">
                      <label htmlFor="recipeTitle">Recipe Title</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => handleChange(e, setTitle)}
                      />
                    </div>
                    <div className="segment">
                      <label htmlFor="image">Image url</label>
                      <input type="url" value={photo} onChange={(e)=> handleChange(e, setPhoto)} />
                    </div>

                    <div className="inline">
                      <label htmlFor="rating">Star Rating</label>
                      <div className="rating">
                        <input
                          type="radio"
                          id="star5"
                          name="rating"
                          value="5"
                          onChange={(e) => handleChange(e, setRating)}
                          checked={rating === "5"}
                        />
                        <label htmlFor="star5"></label>
                        <input
                          type="radio"
                          id="star4"
                          name="rating"
                          value="4"
                          onChange={(e) => handleChange(e, setRating)}
                          checked={rating === "4"}
                        />
                        <label htmlFor="star4"></label>
                        <input
                          type="radio"
                          id="star3"
                          name="rating"
                          value="3"
                          onChange={(e) => handleChange(e, setRating)}
                          checked={rating === "3"}
                        />
                        <label htmlFor="star3"></label>
                        <input
                          type="radio"
                          id="star2"
                          name="rating"
                          value="2"
                          onChange={(e) => handleChange(e, setRating)}
                          checked={rating === "2"}
                        />
                        <label htmlFor="star2"></label>
                        <input
                          type="radio"
                          id="star1"
                          name="rating"
                          value="1"
                          onChange={(e) => handleChange(e, setRating)}
                          checked={rating === "1"}
                        />
                        <label htmlFor="star1"></label>
                      </div>
                    </div>
                    <div className="segment">
                      <label htmlFor="courses">Course</label>
                      <select
                        defaultValue={"DEFAULT"}
                        name="course"
                        id="courses"
                        style={{ fontSize: "9px" }}
                        onChange={(e)=> handleChange(e, setCourse)}
                      >
                        <option value="DEFAULT" disabled>
                          Choose course
                        </option>
                        <option value="entree" checked={course === "entree"}>
                          Entree
                        </option>
                        <option value="main" checked={course === "main"}>
                          Main
                        </option>
                        <option value="dessert" checked={course === "dessert"}>
                          Dessert
                        </option>
                      </select>
                    </div>
                    <div className="segment">
                      <label htmlFor="prepTime">Prep Time</label>
                      <input
                        type="time"
                        style={{ width: "50px" }}
                        onChange={(e)=> handleChange(e, setPrep)}
                        value={prep}
                      />
                    </div>
                    <div className="segment">
                      <label htmlFor="cookTime">Cook Time</label>
                      <input
                        type="time"
                        style={{ width: "50px" }}
                        onChange={(e)=> handleChange(e, setCook)}
                        value={cook}
                      />
                    </div>
                    <div className="segment">
                      <label htmlFor="numberServings">Servings</label>
                      <input
                        type="number"
                        style={{ width: "50px" }}
                        onChange={(e)=> handleChange(e, setServings)}
                        value={servings}
                      />
                    </div>
                  </div>

                  <div className="second-column segment">
                    <label htmlFor="recipeIngredients">Ingredients</label>
                    <textarea
                      type="text"
          
                      onChange={(e)=> handleChange(e, setIngredients)}
                      value={ingredients}
                    />
                  </div>

                  <div className="third-column segment">
                    <label htmlFor="recipeInstructions">Instructions</label>
                    <textarea
                      type="text"
                            onChange={(e)=> handleChange(e, setInstructions)}
                      value={instructions}
                    />
                  </div>

                  <div className="fourth-column segment">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                      type="text"
  
                      onChange={(e)=> handleChange(e, setNotes)}
                      value={notes}
                    />
                  </div>
                  <div className="fifth-column segment">
                    <button type="submit">Save</button>
                    <button>Cancel</button>
                  </div>
                </form>
              </div>
            </section>
          )
      )}
    </>
  );
};

export default EditRecipe;
