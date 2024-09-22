import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const LogoutFunc = () => {
    localStorage.removeItem("tokenUser");
    navigate(0);
  };
  return (
    <nav>
      <div className="navDiv">
        <h3>Admin-Panel</h3>

        <NavLink
          to="/adminPanel"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Edit Restaurants
        </NavLink>

        <NavLink
          to="/delRest"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Delete Restaurants
        </NavLink>
        <NavLink
          to="/addRest"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Add Restaurants
        </NavLink>
      </div>
      <button onClick={() => LogoutFunc()}>Log Out</button>
    </nav>
  );
}

export default NavBar;
