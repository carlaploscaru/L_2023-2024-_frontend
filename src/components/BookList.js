import Rating from "react-rating";
import starRed from "./assets/red.png";
import starGrey from "./assets/grey.png";
import starGold from "./assets/yellow.png";
import { useState } from "react";
import { getAuthToken } from "../utils/auth";


const BookList = ({ reservations }) => {
    const [showCommentPopup, setShowCommentPopup] = useState(false);
    const [comment, setComment] = useState(false);
    const [showCommentPopupRezId, setShowCommentPopupRezId] = useState(false);



    const onRateHandler = async (id, rate) => {
        const token = getAuthToken();

        const response = await fetch(`http://localhost:8000/sale/${id}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rating: rate }),
        })
    }


    const changePopupState = (id) => {
        setShowCommentPopup(!showCommentPopup);
        setShowCommentPopupRezId(id)
    };

    const submitCommentHandler = async (id) => {
        const token = getAuthToken();

        const response = await fetch(`http://localhost:8000/sale/${id}/comment`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ comment: comment }),
        })

        const resData = await response.json();//useless(to take the respons, u can print it)


        reservations = reservations.map(rez => {//takes the values
            if (rez._id === id) {
                rez.comment = comment;
                return rez;
            } else {
                return rez;
            }
        })
        setShowCommentPopup(false);

    };



    const onChangeCommentHandler = async (event) => {
        setComment(event.target.value);
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


                                <button onClick={() => { changePopupState(rez._id) }}
                                    type="button"
                                    style={{ color: "green" }}>
                                    Give comment
                                </button>
                                {showCommentPopup && showCommentPopupRezId === rez._id && <div className="popup">
                                    <div className="popup-inner">
                                        <h2>Leave us a comment</h2>
                                        <textarea
                                            id={rez._id}
                                            onChange={onChangeCommentHandler}
                                            placeholder="Write your opinion here..."
                                            rows={6}
                                            cols={40}
                                        />
                                    </div>
                                    <button onClick={() => { submitCommentHandler(rez._id) }} style={{ color: "green" }}>Submit</button>
                                </div>}

                
                                {rez.comment && (
                                    <div style={{ marginTop: "10px", width: "320px", border: "1px solid #ccc", padding: "6px"}}>
                                        <p>Your comment:</p>
                                        <div style={{overflow: "auto"}}>{rez.comment}</div>
                                    </div>
                                )}

              

                            </>
                        )
                    })
                }
            </ul >
        </>
    )
}



export default BookList;