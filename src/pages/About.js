import { Link } from "react-router-dom";

export default function About() {
  return (
    <div style={{ padding: 20 }}>
      <h2>About View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
      <p>
        <Link to="/">go to Home page</Link>
      </p>
    </div>
  );
}
