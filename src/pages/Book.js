import { json, redirect, useActionData, useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import { getAuthToken } from "../utils/auth";
import Modal from "react-modal";
import { Zoom } from "react-reveal";
import { useState } from "react";


const BookPage = () => {
  let actionData = useActionData();
  const [modalOpen, setModalOpen] = useState(true);
  const navigate = useNavigate();

  console.log(actionData && !actionData.message)

  const closeModal=() => {
    setModalOpen(false);
     navigate("/");
  }
  return (
    <>
      { actionData && !actionData.message &&
      <Modal
        isOpen={actionData && !actionData.message && modalOpen}
        onRequestClose={closeModal}>
        <Zoom>
          <button style={{ backgroundColor: "red" }} onClick={closeModal}>
            x
          </button>

          <div className="order-details">
            <h3 className="success-message">Your order has been placed</h3>
            <h2>Order {actionData._id}</h2>
            <ul>
              <li>
                <div>Name:</div>
                <div>{actionData.nume}</div>
              </li>
              <li>
                <div>Perioud:</div>
                <div>{actionData.data_start} - {actionData.data_end}</div>
              </li>
              <li>
                <div>Price:</div>
                <div>{actionData.price}</div>
              </li>
             
            </ul>
          </div>
        </Zoom>
      </Modal>
      }
      <BookForm />
    </>
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
    adresa: data.get("adresa"),
    telefon: data.get("telefon"),
    pay_type: data.get("pay_type"),

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

  return response;




}

export default BookPage;