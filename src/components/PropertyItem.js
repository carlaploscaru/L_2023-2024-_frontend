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

  let showButtons = true;
  if (window.location.href.includes("book")) {
    showButtons = false;
  }
  return (
    <article className={classes.property}>
      {/* <img src={property.image} alt={property.title}></img> */}
      <h1>{property.title}</h1>
      {
        property.image && property.image.map(img => <img width={300} height={300} style={{margin :"10px"}}src={`http://localhost:8000/${img}`} />)
      }
      <p>{property.owner.nume}</p>
      <p>{property.category.title}</p>
      {userId && (userId === property.owner.id) && <menu className={classes.actions}>
        {showButtons && <Link to="edit">Edit</Link>}
        {showButtons && <button onClick={startDeleteHandler}>Delete</button>}
        {showButtons && <Link to="book" >Book</Link>}
      </menu>}
    </article>
  );
};

export default PropertyItem;
