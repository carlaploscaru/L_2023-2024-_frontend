const ClientList = ({ clients }) => {
    return (
        <>
            <h1>My clients: </h1>
            <ul>
                {
                    clients.map(rez => {
                    
                        return (
                            <li>
                                <p>tara: {rez.tara}, oras: {rez.oras}, suprafata:{rez.suprafata}, </p>
                                <p>start: {rez.data_start}, end: {rez.data_end}</p>
                                <p>clints: {rez.client}</p>
                                <p>Total price: {rez.price} {rez.currency}</p>
                            </li>)
                    })

                }
            </ul>

        </>
    )
}

export default ClientList;