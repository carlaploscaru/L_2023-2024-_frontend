import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import Icon from "./assets/icon.png";
import classes from "./MainNavigation.module.css";
import { getIsAdmin } from "../utils/auth";

const MainNavigation = ({ ownerId }) => {
  const { token } = useRouteLoaderData("root");
  const isAdmin = getIsAdmin();

  return (
    <header className={classes.header}>
      <img  src={Icon} className={classes.icon} />
      <nav>
        <ul className={classes.list}>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Home
          </NavLink>
          {token && (
            <li>
              <NavLink
                to="/me"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Profile
              </NavLink>
            </li>
          )}
          {isAdmin === "true" && token && (
            <li>
              <NavLink
                to="/management"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Managemant
              </NavLink>
            </li>
          )}
          {!token && (
            <NavLink
              to="/auth?mode=login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Login
            </NavLink>
          )}
          {token && (
            <li>
              <NavLink
                to="/properties"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Properties
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink
                 to="/my-properties"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                 My properties
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;