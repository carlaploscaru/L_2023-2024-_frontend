import { Link } from "react-router-dom";
import classes from "./PropertyList.module.css";

const PropertyList = ({ properties }) => {
  return (
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
              <div style={{color:'white'}} className={classes.content}>
                <h2 >Title:  {property.title}</h2>
                <p>Suprafata:  {property.suprafata}</p>
                <p>Tara:  {property.tara}</p>
                <p>Oras:  {property.oras}</p>{/* <time>{property.oras}</time> */}
                <p>Judet:  {property.judet}</p>
                <p>Strada:  {property.strada}</p>
                <p>Category:  {property.category}</p>
                <p>Owner:  {property.owner}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;