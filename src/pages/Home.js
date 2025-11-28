import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Home View</h2>
      <p>test</p>
      <p>
        <Link to="/about">Go to About page</Link>
      </p>
    </div>
  );
}
