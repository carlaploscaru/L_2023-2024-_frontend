import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import PropertyItem from "../components/PropertyItem";
import { getAuthToken } from "../utils/auth";
import { Suspense, useEffect } from "react";
import PropertyList from "../components/PropertyList";
import Footer from "../components/Footer";

const PropertyDetailPage = () => {
  const { property, properties } =
    useRouteLoaderData("property-detail");

    useEffect(() => {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}, [property]);
      
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>} >
        <Await resolve={property} >
          {(loadedProperty) => <PropertyItem property={loadedProperty} />}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={properties}>
          {(loadedProperties) => <PropertyList properties={loadedProperties} />}
        </Await>
      </Suspense>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer/>
    </>
  );
};

export default PropertyDetailPage;

const loadProperty = async (id) => {
  const token = getAuthToken();
  const response = await fetch("http://localhost:8000/place/" + id, {
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
    return resData.place;
  }
};



const loadProperties = async (filterArray) => {
  const token = getAuthToken();


  // const response = await fetch("http://localhost:8000/place", {
  //   method: "GET",
  //   headers: {
  //     Authorization: "Bearer " + token,
  //   },
  // });
  
let response;
  if (Object.keys(filterArray).length === 0) {
    response = await fetch(`http://localhost:8000/place?itemsperpage=${filterArray["itemsperpage"]}&page=${filterArray["page"]}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } else {
    response = await fetch(
      `http://localhost:8000/place?itemsperpage=${filterArray["itemsperpage"]}&page=${filterArray["page"]}&tara=${filterArray["tara"]}&oras=${filterArray["oras"]}&data_start=${filterArray["data_start"]}&data_end=${filterArray["data_end"]}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }
  if (!response.ok) {
    throw json({ message: "Could not fetch properties" }, { status: 500 });
  } else {
    const resData = await response.json();
console.log("resssssssssdataaaaaaaaaaaaaaaaa",resData)
   // return resData.places;
   return resData;
   
  }

};



export const loader = async ({ request, params }) => {
  const propertyId = params.propertyId;
  const token = getAuthToken();
  let cleanFilterArray = {};
  if (request.url.includes("?")) {
    const paramsFilterArray = request.url
      .split("//")[1]
      .split("/")[2]
      .split("?")[1]
      .split("&");
    paramsFilterArray.forEach((element) => {
      const elementArray = element.split("=");
      console.log(elementArray);
      cleanFilterArray[elementArray[0]] = elementArray[1];
    });
  }
  if (!token) {
    return redirect("/auth?mode=login");
  }

  return defer({
    property: await loadProperty(propertyId),
    properties: loadProperties(cleanFilterArray),
   
  });
};

// export const action = async ({ request, params }) => {
//   const propertyId = params.propertyId;
 
//   const token = getAuthToken();

//   const response = await fetch("http://localhost:8000/place/" + propertyId, {
//     method: "DELETE",
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   });

//   return redirect("/properties");
// };
