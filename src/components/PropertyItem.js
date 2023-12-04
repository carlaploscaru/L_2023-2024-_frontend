import { Link, useSubmit } from "react-router-dom";
import classes from "./PropertyItem.module.css";
import { getUserId } from "../utils/auth";

const PropertyItem = ({ property }) => {
  const submit = useSubmit();
  const userId = getUserId();

  const startDeleteHandler = () => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  };

  return (
    <article className={classes.property}>
      {/* <img src={property.image} alt={property.title}></img> */}
      <h1>{property.title}</h1>

      <p>{property.owner.nume}</p>
      <p>{property.category.title}</p>
      {userId && (userId === property.owner.id ) && <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>}
    </article>
  );
};

export default PropertyItem;
