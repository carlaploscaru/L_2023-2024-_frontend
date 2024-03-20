import { Link, useSubmit } from "react-router-dom";
import classes from "./PropertyItem.module.css";
import { getUserId } from "../utils/auth";
import { useState } from "react";

const PropertyItem = ({ property }) => {
  // const submit = useSubmit();
  const userId = getUserId();

  // const startDeleteHandler = () => {
  //   const proceed = window.confirm("Are you sure?");

  //   if (proceed) {
  //     submit(null, { method: "delete" });
  //   }
  // };

  let showButtons = true;
  if (window.location.href.includes("book")) {
    showButtons = false;
  }


  const [showFrame, setShowFrame] = useState(false);
  const openExeFile = () => {
    setShowFrame(true);
  };

 
  return (
    <article className={classes.property}>
      {/* <img src={property.image} alt={property.title}></img> */}
      {userId && (userId === property.owner.id) && showButtons && <p>This is your property</p>}
      <h1>{property.title}</h1>
      {
        property.image && property.image.map(img => <img width={300} height={300} style={{margin :"10px"}}src={`http://localhost:8000/${img}`} />)
      }
      <p>{property.owner.nume}</p>
      <p>{property.category.title}</p>
    

    <div>
      <button style={{color: "black"}} onClick={openExeFile}>Open House Tour</button>
      {showFrame && (
        <div style={{ width: '800px', height: '600px', border: '1px solid black' }}>
          <iframe title="House Tour" src={`http://localhost/testvirtualtur/`} width="100%" height="100%" frameBorder="0" />
        </div>
      )}
    </div>
      
      {<menu className={classes.actions}>
        {/* {userId && (userId === property.owner.id) && showButtons && <Link to="edit">Edit</Link>}
        {userId && (userId === property.owner.id) && showButtons && <button onClick={startDeleteHandler}>Delete</button>} */}

        
        {showButtons && <Link to="book" >Book</Link>}
      </menu>}
      
    </article>
  );
};

export default PropertyItem;
