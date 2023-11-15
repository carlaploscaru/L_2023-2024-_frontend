import { Form, useActionData, useNavigation } from "react-router-dom";
import classes from "./AuthForm.module.css";

const ConfirmForm = () => {
  const data = useActionData()
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  
  
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
        <p>
          <label htmlFor="confirmToken">Confirmation token</label>
          <input id="confirmToken" type="text" name="confirmToken" />
          {/* scort required */}
        </p>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Save"}
        </button>
      </Form>
    </>
  );
};

export default ConfirmForm;
