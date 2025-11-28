import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div style={{ backgroundColor: "yellow" }}>
        Header:
        <nav>
          <ul>
            <li>
              <Link to="/about">Go to About page</Link>
            </li>
            <li>
              <Link to="/">go to Home page</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div style={{ backgroundColor: "margenta" }}>SideBar</div>
      <div id="contents" style={{ backgroundColor: "PapayaWhip" }}>
        <Outlet />
      </div>
    </>
  );
}
