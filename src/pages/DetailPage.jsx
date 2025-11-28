import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../constants";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch detail");
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (e) {
        console.error(e);
        setError("Failed to load details.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  return (
    <div
      className="body-wrap"
      style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}
    >
      <button onClick={() => navigate(-1)}>← Back</button>
      <h2 style={{ marginTop: 12 }}>Student Detail #{id}</h2>
      {loading && <div style={{ marginTop: 16 }}>Loading...</div>}
      {error && <div style={{ marginTop: 16, color: "#c00" }}>{error}</div>}
      {!loading && !error && data && (
        <div style={{ marginTop: 16 }}>
          <div
            className="card"
            style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}
          >
            <div style={{ fontSize: 18, fontWeight: 600 }}>
              {data.name || "Unnamed"}
            </div>
            <div className="sub" style={{ marginTop: 6 }}>
              Age: {data.age || "-"}
            </div>
            <div className="sub" style={{ marginTop: 6 }}>
              Email: {data.email || "-"}
            </div>
            <div className="sub" style={{ marginTop: 6 }}>
              Phone: {data.phone || "-"}
            </div>
            <div className="sub" style={{ marginTop: 6 }}>
              Sex: {(data.sex || "-").toLowerCase()}
            </div>
            <div className="sub" style={{ marginTop: 6 }}>
              ID: {data.id}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
