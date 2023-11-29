import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import PropertyItem from "../components/PropertyItem";
import { getAuthToken } from "../utils/auth";
import { Suspense } from "react";
import PropertyList from "../components/PropertyList";

const PropertyDetailPage = () => {
  const { property, properties } =
    useRouteLoaderData("property-detail");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={property}>
          {(loadedProperty) => (
            <PropertyItem
              property={loadedProperty}
            />
          )}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={properties}>
          {(loadedProperties) => <PropertyList properties={loadedProperties} />}
        </Await>
      </Suspense>
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


export const loader = async ({ request, params }) => {
  const propertyId = params.propertyId;

  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return defer({
    property: await loadProperty(propertyId),
    properties: loadProperties(),
   
  });
};
