import starRed from "./assets/red.png";
import starGrey from "./assets/grey.png";
import starGold from "./assets/yellow.png";
import Rating from "react-rating";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import { getAuthToken } from "../utils/auth";
import { redirect, useSubmit } from "react-router-dom";

const CategoryList = ({ categories }) => {
    const [showForm, setShowForm] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    const submit = useSubmit();


    const onChangeCategoryHandler = (event) => {
        setNewCategory(event.target.value)
    }

    const submitCategoryHandler = async (id) => {
        const token = getAuthToken();

        const response = await fetch(`http://localhost:8000/category`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newCategory }),
        })

        categories.push(await response.json());//auto load(rerender), for geting id for delete and edit
        setShowForm(false);

    };


    const deleteCategoryHandler = async (id) => {
        const proceed = window.confirm("Are you sure?");

        if (proceed) {
            submit({ id: id }, { method: "delete" });
        }
    }

    const editCategoryHandler = async () => {
        submit({ id: selectedCategory, title: selectedCategoryName }, { method: "patch" })
        setSelectedCategory("")
    }


    return (
        <>
            <ul>
                <h1>Categories: </h1>
                {
                    categories.map((cat) => {

                        return (
                            <li style={{ padding: "8px 16px", borderBottom: "1px solid #ddd", listStyleType: "none" }}>
                                {cat._id !== selectedCategory && <div> {cat.title}</div>}
                                {cat._id === selectedCategory && <div><input id="category" type="text" name="category"
                                    value={selectedCategoryName} onChange={(event) => { setSelectedCategoryName(event.target.value) }} />{" "}
                                    <button style={{ color: "green" }} onClick={editCategoryHandler}>Submit</button>{" "}
                                </div>}
                                <button style={{ backgroundColor: "orange" }} onClick={() => { setSelectedCategoryName(cat.title); setSelectedCategory(cat._id); }}>Edit</button>
                                <button style={{ backgroundColor: "red" }} onClick={() => { deleteCategoryHandler(cat._id) }}>Delete</button>

                            </li>)
                    })

                }
                <button style={{ backgroundColor: "green" }}
                    onClick={() => {
                        setShowForm(!showForm)
                    }}>New</button>
                {showForm && (<>
                    <input name="title" id="title" onChange={onChangeCategoryHandler} ></input>
                    <button onClick={() => { submitCategoryHandler() }} style={{ color: "green" }}>Submit</button>
                </>)}
            </ul>

        </>
    )
}

export default CategoryList;