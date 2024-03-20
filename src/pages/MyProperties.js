import { Suspense } from "react";
import { Await, defer, json, redirect, useLoaderData, useRouteLoaderData } from "react-router-dom"
import { getAuthToken } from "../utils/auth";
import MyPropertyList from "../components/MyPropertyList";

const MyPropertiesPage = () => {
  const { properties } = useLoaderData("my-properties");

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={properties}>
        {(loadedProperties) => <MyPropertyList properties={loadedProperties} />}
      </Await>
    </Suspense>
     
  );
}

export default MyPropertiesPage;



const loadMyProperties = async (ownerId) => {
  const token = getAuthToken();
  //console.log ("11111111111111idddddddddddddddddddd",ownerId)
  const response = await fetch("http://localhost:8000/place/owner/" + ownerId, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch details for the selected property",
      },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    //console.log ("11111111111111idddddddddddddddddddd",resData)
    return resData.place;
  }
};


export const action = async ({ request, params }) => {
  const propertyId = params.propertyId;

  console.log("idd",propertyId )
  const data = await request.formData();
  const p1 = data.get("id")
  console.log("idddddd",p1 )
  const token = getAuthToken();

  const response = await fetch("http://localhost:8000/place/" + p1, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return redirect("/my-properties");
};



export const loader = async ({ request, params }) => {
 // const ownerId = params.ownerId;
  const ownerId = localStorage.getItem("userId");
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return defer({
    properties: loadMyProperties(ownerId),
   
  });
};


  

