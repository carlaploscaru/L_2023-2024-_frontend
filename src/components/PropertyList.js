import { Link } from "react-router-dom";
import classes from "./PropertyList.module.css";

const PropertyList = ({ properties }) => {
  return (
    <div className={classes.properties}>
      <h1>All Properties</h1>
      <ul className={classes.list}>
        {properties.map((property) => (
          <li key={property.id} className={classes.item}>
            <Link to={`/properties/${property.id}`}>
              {/* <img src={property.image} alt={property.title} /> */}
              <div className={classes.content}>
                <h2>{property.title}</h2>
                <time>{property.oras}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;