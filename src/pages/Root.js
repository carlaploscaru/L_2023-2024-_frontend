import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../utils/auth";

const RootLayout = () => {
  const {token} = useLoaderData();

  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);//10000 pt 10 sec
  }, [token]);


  return (
    <>
      <MainNavigation />
      <main>
        <Outlet/>
      </main>
    </>
  );
};

export default RootLayout;