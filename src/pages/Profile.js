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
  
  const ProfilePage = () => {
    const data = useActionData();
    const { user } = useRouteLoaderData("me");
    return (
      <>
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={user}>
            {(loadedUser) => <ProfileForm user={loadedUser} />}
          </Await>
        </Suspense>
      </>
    );
  };
  
  export default ProfilePage;
  
  export const action = async ({ request, params }) => {
    const token = getAuthToken();
  
    const aaa = await request.formData();
  
    const data = Object.fromEntries(aaa);
    
  
    const formData = new FormData();
  
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("image", data.images);
  
    const response = await fetch("http://localhost:8000/user/me", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
  
    return response;
  };
  
  const loadMe = async () => {
    const token = getAuthToken();
  
    const response = await fetch("http://localhost:8000/user/me", {
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
  
      console.log(resData.me);
      return resData.me;
    }
  };
  
  export const loader = async ({ request, params }) => {
    const token = getAuthToken();
  
    if (!token) {
      return redirect("/auth?mode=login");
    }
  
    return defer({
      user: loadMe(),
    });
  };