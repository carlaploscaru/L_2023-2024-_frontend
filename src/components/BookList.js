const BookList = ({ reservations }) => {
    return (
        <>
            <h1>My rezervations:</h1>
            <ul>
                {
                    reservations.map(rez => {
                        return (
                            <>
                                <li>
                                    <p>tara: {rez.tara}, oras: {rez.oras}, suprafata:{rez.suprafata}, </p>
                                    <p>start: {rez.data_start}, end: {rez.data_end}</p>
                                    <p>owner: {rez.owner}</p>
                                    <p>Total price: {rez.price} {rez.currency} </p>
                                </li>
                                <button
                                    type="button"
                                    id="images"
                                    style={{ color: "red" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    id="images"
                                    style={{ color: "green" }}
                                >
                                    Checkout
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