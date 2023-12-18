import { Form, useNavigation } from "react-router-dom";
import classes from "./ProfileForm.module.css";

const ProfileForm = ({ user }) => {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const imageChangeHandler = (event) => {
    console.log(event.target.id);
    const file = event.target.files;

    let previewId = "file-preview";

    if (file) {
      const fileReader = new FileReader();
      //console.log(file);
      const preview = document.getElementById(previewId);
      fileReader.onload = (event) => {
        preview.setAttribute("src", event.target.result);
      };

      console.log(fileReader);
      if(file[0]){
        fileReader.readAsDataURL(file[0]);
      } else {
        preview.setAttribute("src", null);
      }
    }
  };

  const clearImageFromInput = (event) => {
    console.log("clearimageFromInput");
    console.log(event.target.id);
    const fileInput = document.getElementById(event.target.id);

    let previewId = "file-preview";

    const preview = document.getElementById(previewId);

    preview.setAttribute("src", null);
    fileInput.value = null;
  };


  return (
    <>
      <Form
        method="patch"
        className={classes.form}
        encType="multipart/form-data"
      >
        <p>
          {user && user.image && (
            <>
              <img
                height={150}
                width={150}
                src={`http://localhost:8000/${user.image}`}
              />
             
            </>
          )}
        </p>
        <p>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" defaultValue={user.name} />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            defaultValue={user.email}
          />
        </p>
        <p>
          <label htmlFor="images">Imagini</label>
          <>
            <input
              id="images"
              type="file"
              name="images"
              onChange={imageChangeHandler}
            />
            <div>
              <img
                src="#"
                height={150}
                width={150}
                alt="Preview Uploaded Image"
                id="file-preview"
                style={{ marginRight: "20px" }}
              ></img>
              <button
                type="button"
                id="images"
                onClick={clearImageFromInput}
                style={{ color: "green" }}
              >
                Clear
              </button>
            </div>
          </>
        </p>
        <div className={classes.actions}>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default ProfileForm;