import { Form, Link } from "react-router-dom";
import classes from "./PropertyList.module.css";
import { useEffect, useState } from "react";
import { getAuthToken } from "../utils/auth";
import Rating from "react-rating";
import starRed from "./assets/red.png";
import starGrey from "./assets/grey.png";
import starGold from "./assets/yellow.png";

const PropertyList = ({ properties }) => {
  const token = getAuthToken();
  const [categories, setCategories] = useState();

  useEffect(() => {

    const getCategories = async () => {
      const response = await fetch("http://localhost:8000/category", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw json({ message: "Could not fetch properties" }, { status: 500 });
      } else {
        const resData = await response.json();

        setCategories(resData.categories);
      }
    };

    getCategories();
  }, [fetch]);

  return (
    <div className={classes.propertiesPage}>
      <div className={classes.propertiesForm}>
        <Form className={classes.form}>
          <p>
            <label htmlFor="tara">Country</label>
            <input id="tara" type="text" name="tara" />
          </p>

          <p>
            <label htmlFor="oras">City</label>
            <input id="oras" type="text" name="oras" />
          </p>

          <p>
            <label htmlFor="categorie">Category</label>
            <select name="category" id="category">
              <option value=""></option>
              {categories &&
                categories.map((category) => {
                  return <option value={category._id}>{category.title}</option>;
                })}
            </select>
          </p>

          <p>
            <label htmlFor="data_start">Data start</label>
            <input id="data_start" type="date" name="data_start" />
          </p>
          <p>
            <label htmlFor="data_end">Data end</label>
            <input id="data_end" type="date" name="data_end" />
          </p>
          <div className={classes.actions}>

            <button style={{ backgroundColor: "red" }}>
              {"Search"}
            </button>
          </div>
        </Form>
      </div>
      <div className={classes.properties}>
        <h1>All Properties</h1>
        <ul className={classes.list}>
          {properties.map((property) => (
            <li key={property.id} className={classes.item}>
              <Link to={`/properties/${property._id}`}>
                <img
                  src={`http://localhost:8000/${property.image[0]}`}
                  alt={property.title}
                ></img>
                <div style={{ color: 'white' }} className={classes.content}>
                  <h2 >Category  {property.category}  {property.title}</h2>
                  <p>Country:  {property.tara}, City:  {property.oras},Street:  {property.strada}, Surface:  {property.suprafata}</p>{/* <time>{property.oras}</time> */}
                  <p>Owner:  {property.owner}</p>
                  <h2 >Price:  {property.price}  {property.currency}</h2>
                  <Rating
                    placeholderRating={property.rating}
                    emptySymbol={
                      <img src={starGrey} className="icon"  style={{ width: '20px', height: '20px' }}/>
                    }
                    placeholderSymbol={
                      <img src={starRed} className="icon" style={{ width: '20px', height: '20px' }} />
                    }
                    fullSymbol={
                      <img src={starGold} className="icon"  style={{ width: '20px', height: '20px'}}/>
                    }
                    readonly={true}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyList;