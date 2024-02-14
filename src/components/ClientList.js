import starRed from "./assets/red.png";
import starGrey from "./assets/grey.png";
import starGold from "./assets/yellow.png";
import Rating from "react-rating";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const ClientList = ({ clients }) => {
    return (
        <>
            <ul>
                <h1>My clients: </h1>
                {
                    clients.map(rez => {

                        return (
                            <li style={{ padding: "8px 16px", borderBottom: "1px solid #ddd", listStyleType: "none" }}>
                                <p>Country: {rez.tara}, City: {rez.oras}, Surface:{rez.suprafata}, </p>
                                <p>start: {rez.data_start}, end: {rez.data_end}</p>
                                <p>clints: {rez.client}</p>
                                <p>Total price: {rez.price} {rez.currency}</p>
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
                                    readonly={true}
                                />
                                
                                {/* {rez.comment && <p>Comment: {rez.comment} From:{rez.client}</p>} */}

                            </li>)
                    })

                }
            </ul>

        </>
    )
}

export default ClientList;