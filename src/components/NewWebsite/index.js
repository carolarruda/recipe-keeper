import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewWebsite = ({ websites, setWebsites }) => {

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleImage = (e) => {
    setImage(e.target.value);
  };
  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const newWebsite = {
      name,
      image,
      url,

    };
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWebsite),
    };

    fetch("http://localhost:4000/websites", opts)
      .then((response) => response.json())
      .then(() => {
        navigate(`/favourites`);
        setName("")
        setImage("")
        setUrl("")
        setWebsites(websites);
        fetch("http://localhost:4000/websites")
          .then((response) => response.json())
          .then((data) => setWebsites(data));
      });
  }

  return (
    <section className="form-container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="big-container">
        <form className="form-stack recipe-form" onSubmit={handleSubmit}>
          <div className="first-column">
            <div className="segment">
              <label htmlFor="recipeTitle">Website Name</label>
              <input type="text" required value={name} onChange={handleName} />
            </div>
            <div className="segment">
              <label htmlFor="image">Image url</label>
              <input type="url" value={image} onChange={handleImage} />
            </div>
            <div className="segment">
              <label htmlFor="image">Website url</label>
              <input type="url" value={url} onChange={handleUrl} />
            </div>
          </div>

          <div className="fifth-column segment">
            <button type="submit">Save</button>
            <button>Cancel</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewWebsite;
