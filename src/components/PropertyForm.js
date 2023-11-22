import { Form, redirect, useNavigate, useNavigation } from "react-router-dom";
import classes from "./PropertyForm.module.css";
import { getAuthToken } from "../utils/auth";

const PropertyForm = ({ method, property }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const cancelHandler = () => {
    navigate("..");
  };

  return (
    <Form method={method} className={classes.form}>
      <p>
        <p>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            required
            defaultValue={property ? property.title : ""}
          />
        </p>
        <p>
          <label htmlFor="suprafata">Suprafata</label>
          <input
            id="suprafata"
            name="suprafata"
            type="text"
            required
            defaultValue={property ? property.suprafata : ""}
          />
        </p>
        <p>
          <label htmlFor="tara">Tara</label>
          <input
            id="tara"
            type="text"
            name="tara"
            required
            defaultValue={property ? property.tara : ""}
          />
        </p>
        <p>
          <label htmlFor="oras">Oras</label>
          <input
            id="oras"
            type="text"
            name="oras"
            required
            defaultValue={property ? property.oras : ""}
          />
        </p>

        <p>
          <label htmlFor="strada">Strada</label>
          <input
            id="strada"
            type="strada"
            name="strada"
            required
            defaultValue={property ? property.strada : ""}
          />
        </p>

        <p>
          <label htmlFor="judet">Judet</label>
          <input
            id="judet"
            type="text"
            name="judet"
            required
            defaultValue={property ? property.judet : ""}
          />
        </p>

        <p>
          <label htmlFor="category">Categorie</label>
          <input
            id="category"
            name="category"
            type="text"
            required
            defaultValue={property ? property.categoryId : ""}
          />
        </p>

        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </p>
    </Form>
  );
};

export default PropertyForm;

export const action = async ({request, params}) => {
    const method = request.method;
    const data = await request.formData();

    const propertyData = {
        title: data.get("title"),
        suprafata: data.get("suprafata"),
        tara: data.get("tara"),
        oras: data.get("oras"),
        strada: data.get("strada"),
        judet: data.get("judet"),
        categoryId: data.get("category"),
      };

      let url = "http://localhost:8000/place";

      if (method === "PATCH") {
        const propertyId = params.propertyId;
        url = "http://localhost:8000/place/" + propertyId;
      }
    
      const token = getAuthToken();
      
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(propertyData),
      });

      if(response.status === 422 || response.status === 401) {
        return response;
      }

      if (!response.ok) {
        throw json(
          { message: "Could not save property" },
          { status: response.status }
        );
      }

      return redirect("/properties");
    }