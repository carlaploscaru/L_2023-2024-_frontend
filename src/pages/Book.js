import { json, redirect } from "react-router-dom";
import BookForm from "../components/BookForm";
import { getAuthToken } from "../utils/auth";


const BookPage = () => {
    return (
        <BookForm />
    );
};


export const action = async ({ request, params }) => {
    const propertyId = params.propertyId;
    const data = await request.formData();

    const data_start = data.get("data_start");
    const data_end = data.get("data_end");
    // console.log(data_start, data_end, propertyId);

    
  let saleData = {
    placeId: propertyId,
    data_start: data.get("data_start"),
    data_end: data.get("data_end"),
    nume: data.get("nume"),
    adresa:data.get("adresa"),
    telefon:data.get("telefon"),
    pay_type:data.get("pay_type"),

  };

  const token = getAuthToken();

  const response = await fetch("http://localhost:8000/sale", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(saleData),
  });


  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  return redirect("/");




}

export default BookPage;