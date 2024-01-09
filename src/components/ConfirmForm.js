import { Form, useActionData, useNavigate, useNavigation } from "react-router-dom";
import classes from "./AuthForm.module.css";
import { useEffect, useState } from "react";

const ConfirmForm = () => {
  const data = useActionData()
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  const [time, setTime] = useState(30);

  useEffect(() => {

    const int = setTimeout(() => {
      setTime((prevTime) => prevTime - 1);
      if (time === 0) {
        clearTimeout(int);
        navigate("/auth?mode=login");
       
      }
    }, 1000);
    return () => clearTimeout(int);
  }, [time]);

  return (
    <>
      
      <Form method="post" className={classes.form}>
        {data && data.message && <p>{data.message}</p>}
        {/* {data && data.data && data.data[0].msg && <p>{data.data[0].msg}</p>} */}
        {data && data.data && (
          <>
            {data.data.map((err) => {
              console.log("---", err);
              return (
                <p key={err.msg}>{err.msg}</p>
              )
            })}
          </>
        )}
        <p>Your confirmation token was sent via email. You can click the link to activate your account or copy the token and paste it in the form below.</p>
        {`You have ${time} secunde left.`}
        <p>
          <label htmlFor="confirmToken">Confirmation token</label>
          <input id="confirmToken" type="text" name="confirmToken" />
          {/* scot required */}
        </p>
        <button style={{ background: "green" }} disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Save"}
        </button>
      </Form>
    </>
  );
};

export default ConfirmForm;
