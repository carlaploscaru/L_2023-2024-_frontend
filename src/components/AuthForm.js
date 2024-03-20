import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";
  const passwordRecovery = searchParams.get("mode") === "reset";

console.log(data);

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1 style={{marginLeft: '5%'}}>{isLogin && "Log in"}
          {!isLogin && !passwordRecovery && "Create a new user"}
          {passwordRecovery && "Recover password"}
        </h1>
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
        
        <div className={classes.form1}>
        {!isLogin && !passwordRecovery && (
          <p>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" />{/*required(for warning: text complete*/}
          </p>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" name="email" />
        </p>
        {!passwordRecovery && <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </p>}


        {!isLogin && !passwordRecovery && (
          <p>
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              id="repeatPassword"
              type="password"
              name="repeatPassword"

            />
          </p>
        )}
        <div className={classes.actions}>
          <Link to={`?mode=reset`}>
            {"Recover password"}
          </Link>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Save"}
          </button>
        </div>

        </div>
      </Form>
    </>
  );
};

export default AuthForm;
