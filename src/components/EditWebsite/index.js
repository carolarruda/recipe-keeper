import "../styles/style.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditWebsite = ({ websites, setWebsites }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");


  
  useEffect(() => {
    const fetchInitialValueTwo = () => {
      fetch(`http://localhost:4000/websites/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
          setImage(data.image);
          setUrl(data.url);
        })
        .catch((error) => {
          console.error("Error fetching initial value:", error);
        });
    };
  
    fetchInitialValueTwo();
  }, [params.id]);
  
  
  
  function handleSubmit(e) {
    e.preventDefault();
    const editWebsite = {
      name,
      image,
      url,
    };
    const optsWeb = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editWebsite),
    };

    fetch(`http://localhost:4000/websites/${params.id}`, optsWeb)
      .then((response) => response.json())
      .then(() => {
        fetch("http://localhost:4000/websites")
          .then((response) => response.json())
          .then((data) => {
            setWebsites(data);
            navigate('/favourites')
          }
         );
      });
  }

  const handleChangeTwo = (e, setState) => {
    setState(e.target.value);
  };

  return (
    <>
      {websites.map(
        (website) =>
          website.id.toString() === params.id && (
            <section className="form-container" key={params.id}>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
              ></link>
              <div className="big-container">
                <form
                  className="form-stack recipe-form"
                  onSubmit={handleSubmit}
                >
                  <div className="first-column">
                    <div className="segment">
                      <label htmlFor="recipeTitle">Website Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e)=> handleChangeTwo(e, setName)}
                      />
                    </div>
                    <div className="segment">
                      <label htmlFor="image">Image url</label>
                      <input type="url" value={image}      onChange={(e)=> handleChangeTwo(e, setImage)} />
                    </div>
                    <div className="segment">
                      <label htmlFor="image">Website url</label>
                      <input type="url" value={url}      onChange={(e)=> handleChangeTwo(e, setUrl)} />
                    </div>
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

export default EditWebsite;
