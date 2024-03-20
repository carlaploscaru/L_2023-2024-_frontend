import {
    Form, Link, useActionData, useNavigate, useRouteLoaderData,
} from "react-router-dom";

import classes from './AuthForm.module.css';
import PropertyItem from "./PropertyItem";
import { useState } from "react";


const BookForm = () => {
    const [addRecieptData, setAddReciptData] = useState(false);
    const [dataStartSelected, setDataStartSelected] = useState(false);
    const [dataEndSelected, setDataEndSelected] = useState(false);
    const [isCardSelected, setIsCardSelected] = useState(true);
    const [isCashSelected, setIsCashSelected] = useState(false);
    const navigation = useNavigate();
    const isSubmitting = navigation.state === "submitting";
    const data = useActionData();
    const propertyData = useRouteLoaderData("property-detail");


    const dataStartHandler = (event) => {

        if (event.target.value === "") {
            setDataStartSelected(false);
        } else {
            setDataStartSelected(event.target.value)
        }
    }

    const dataEndHandler = (event) => {
        if (event.target.value === "") {
            setDataEndSelected(false);
        } else {
            setDataEndSelected(event.target.value)
        }
    }

    const cardSelectHandler = (event) => {
        if (!isCardSelected && !isCashSelected) {
            setIsCardSelected(!isCardSelected)
        }
        if (isCashSelected && !isCardSelected) {
            setIsCardSelected(!isCardSelected)
            setIsCashSelected(!isCashSelected)
        }
    }

    const cashSelectHandler = (event) => {
        if (!isCardSelected && !isCashSelected) {
            setIsCashSelected(!isCashSelected)
        }
        if (!isCashSelected && isCardSelected) {
            setIsCardSelected(!isCardSelected)
            setIsCashSelected(!isCashSelected)
        }
    }

    const days = (new Date(dataEndSelected).getTime() - (new Date(dataStartSelected)).getTime()) / (1000 * 3600 * 24);
    const price = days * propertyData.property.price;

    return (
        <>
            <PropertyItem property={propertyData.property} />
            <Form method="post" className={classes.form}>
                <h1>Book this property</h1>
                <Link
                    onClick={() => {
                        setAddReciptData(!addRecieptData);
                    }}

                >Add facturing data</Link>
                {data && data.message && <p>{data.message}</p>}
                {data && data.data && (
                    <>
                        {data.data.map((err) => {
                            console.log("---", err);
                            return (
                                <p key={err.msg}>{err.msg}</p>
                            )
                        })}
                    </>
                )}
                <p>
                    <label htmlFor="data_start">Data_start</label>
                    <input style={{ backgroundColor: "black", color: "white" }} id="data_start" type="date" name="data_start" onChange={dataStartHandler} />
                </p>

                <p>
                    <label htmlFor="data_end">Data_end</label>
                    <input style={{ backgroundColor: "black", color: "white" }} id="data_end" type="date" name="data_end" onChange={dataEndHandler} />
                </p>

                {dataStartSelected && dataEndSelected &&
                    <p>
                        <label htmlFor="price">Price:</label>
                        <input id="price" type="text" name="price" value={price} />
                        <label>{propertyData.property.currency}</label>
                        
                    </p>}
                {addRecieptData && (<p> <label htmlFor="nume">Name:</label>
                    <input style={{ backgroundColor: "black", color: "white" }} id="nume" type="text" name="nume" /></p>)}

                {addRecieptData && (<p> <label htmlFor="adresa">Adress:</label>
                    <input style={{ backgroundColor: "black", color: "white" }} id="adresa" type="text" name="adresa" /></p>)}

                {addRecieptData && (<p> <label htmlFor="telefon">Phone number:</label>
                    <input style={{ backgroundColor: "black", color: "white" }} id="telefon" type="text" name="telefon" /></p>)}

                {addRecieptData && (<p> <label htmlFor="pay_type">Payment type:</label>
                    <div style={{ display: "flex" }}>
                        <input id="pay_type" type="checkbox" value="cash" name="pay_type" onChange={cashSelectHandler} checked={isCashSelected} />
                        <label >Cash</label>
                    </div>
                    <div style={{ display: "flex" }}>
                        <input id="pay_type" type="checkbox" value="card" name="pay_type" onChange={cardSelectHandler} checked={isCardSelected} />
                        <label >Card</label>
                    </div>
                </p>
                )}



                <div className={classes.actions}>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? "Submitting" : "Checkout"}
                    </button>
                </div>
            </Form >
        </>
    );
};




export default BookForm;
