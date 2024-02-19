import {
  Await,
  defer,
  json,
  redirect,
  useActionData,
  useRouteLoaderData,
} from "react-router-dom";
import { getAuthToken } from "../utils/auth";
import { Suspense } from "react";
import ProfileForm from "../components/ProfileForm";
import BookList from "../components/BookList";
import ClientList from "../components/ClientList";
import CategoryList from "../components/CategoryList";

const ManagementPage = () => {
  const { categories } = useRouteLoaderData("management");

  return (
    <>
      <div style={{ display: "flex" }}>
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={categories}>
            {(loadedCat) => <CategoryList categories={loadedCat} />}
          </Await>
        </Suspense>
      </div>
    </>
  );
};

export default ManagementPage;

export const action = async ({ request, params }) => {
  const token = getAuthToken();
  const data = await request.formData();
  const catid = data.get("id")
  const catTitle = data.get("title")

  if (request.method === "PATCH") {
    const response = await fetch(`http://localhost:8000/category/${catid}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: catTitle })
    })
  } else {
    const response = await fetch(`http://localhost:8000/category/${catid}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
  }


  return true;
};


const loadCategories = async () => {
  const token = getAuthToken();

  const response = await fetch("http://localhost:8000/category", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch my profile data!",
      },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();

    return resData.categories;
  }

}








export const loader = async ({ request, params }) => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return defer({

    categories: loadCategories(),

  });
};