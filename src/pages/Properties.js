import { Suspense } from "react";
import { Await, defer, json, redirect, useLoaderData, useRouteLoaderData } from "react-router-dom"
import PropertyList from "../components/PropertyList";
import { getAuthToken } from "../utils/auth";

const PropertiesPage = () => {
  const { properties } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={properties}>
        {(loadedProperties) => <PropertyList properties={loadedProperties} />}
      </Await>
    </Suspense>
  );
}

const loadProperties = async () => {
    const token = getAuthToken();
    
    const response = await fetch("http://localhost:8000/place", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  
    if (!response.ok) {
      throw json({ message: "Could not fetch properties" }, { status: 500 });
    } else {
      const resData = await response.json();
  


      return resData.places;
    }
  };
  
  export function loader() {
    const  token  = getAuthToken();
    if(!token) {
      return redirect('/auth?mode=login');
    }
  
    return defer({//pt Suspense de sus
      properties: loadProperties(),
    });
  }
  

export default PropertiesPage;