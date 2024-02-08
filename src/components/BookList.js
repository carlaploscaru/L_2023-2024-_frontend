import Rating from "react-rating";
import starRed from "./assets/star-red.png";
import starGrey from "./assets/star-grey.png";
import starGold from "./assets/star-yellow.png";
import { useState } from "react";
import { getAuthToken } from "../utils/auth";


const BookList = ({ reservations }) => {
    const [isComment, setIsComment] = useState(false);


    const onRateHandler = async(id, rate) => {
        const token = getAuthToken();

         const response = await fetch(`http://localhost:8000/sale/${id}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({rating: rate}),
        })
    }
        return (
            <>
                <ul>
                    <h1>My rezervations:</h1>
                    {
                        reservations.map(rez => {
                            return (
                                <>
                                    <li style={{ padding: "8px 16px", borderBottom: "1px solid #ddd", listStyleType: "none" }}>
                                        <p>Country: {rez.tara}, City: {rez.oras}, Surface:{rez.suprafata}, </p>
                                        <p>start: {rez.data_start}, end: {rez.data_end}</p>
                                        <p>owner: {rez.owner}</p>
                                        <p>Total price: {rez.price} {rez.currency} </p>
                                    </li>
                                    <Rating
                                        placeholderRating={rez.rating}
                                        emptySymbol={
                                            <img src={starGrey} className="icon" />
                                        }
                                        placeholderSymbol={
                                            <img src={starRed} className="icon" />
                                        }
                                        fullSymbol={
                                            <img src={starGold} className="icon" />
                                        }
                                        onChange={(rate) => { onRateHandler(rez._id, rate) }}
                                    />

                                    {isComment && (
                                        <textarea></textarea>
                                    )}
                                    
                                    <button
                                        type="button"
                                        id="images"
                                        style={{ color: "green" }}
                                    >
                                        Give comment
                                    </button>
                                </>
                            )
                        })

                    }
                </ul>

            </>
        )
    }

    export default BookList;