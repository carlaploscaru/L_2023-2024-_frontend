import { useState } from "react";
import { getAuthToken, getUserId } from "../utils/auth";
import { useSubmit } from "react-router-dom";

const UsersList = ({ users }) => {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const submit = useSubmit();

    const handleBlockUser = (userId) => {
        console.log(userId)
            submit({ userId: userId }, { method: "patch" })
           
    }



    return (
        <ul>
            <h1>Users: </h1>
            {
                users.map((user) => {
                    return (
                        <li key={user._id} style={{ padding: "8px 16px", borderBottom: "1px solid #ddd", listStyleType: "none" }}>
                            <div>
                                <h1>{user.name}</h1>
                                <p>{user.email}</p>

                                <button style={{ backgroundColor: "black" }} onClick={() => handleBlockUser(user._id)}>
                                    {user.enabled === "0" ? "Unblock" : "Block"}
                                </button>


                                {user.enabled === "0" && <p>Blocked</p>}
                            </div>

                        </li>)

                })
            }
        </ul>

    )

}


export default UsersList;