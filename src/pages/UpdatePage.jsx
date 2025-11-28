import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../constants";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    sex: "",
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const emailRef = useRef(null);

  const isValidEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
  const isNumeric = (v) => /^\d+$/.test(String(v || "").trim());
  const isValidName = (v) =>
    /^[A-Za-z가-힣\s.\-]+$/.test(String(v || "").trim());

  const validate = (next) => {
    const e = {};
    if (!isValidName(next.name))
      e.name = "Name can include only letters, spaces, dots, or hyphens.";
    if (!isNumeric(next.age)) e.age = "Age must be a number.";
    if (!isValidEmail(next.email)) e.email = "Invalid email format.";
    if (
      !next.sex ||
      !["male", "female"].includes(String(next.sex).toLowerCase())
    )
      e.sex = "Sex must be male or female.";
    if (!String(next.phone || "").trim()) e.phone = "Phone is required.";
    return e;
  };

  const fetchOne = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setForm({
        name: data?.name ?? "",
        age: data?.age ?? "",
        email: data?.email ?? "",
        phone: data?.phone ?? "",
        sex: (data?.sex ?? "").toLowerCase(),
      });
      setErrors({});
    } catch (e) {
      console.error(e);
      alert("Failed to load student information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOne();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const save = async (next) => {
    const v = validate(next);
    setErrors(v);
    if (Object.keys(v).length > 0) return; // invalid, do not PUT
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(next),
      });
      if (!res.ok) throw new Error("Update failed");
    } catch (e) {
      console.error(e);
      alert("Failed to save changes.");
    }
  };

  const onChangeField = (key) => async (e) => {
    const value = e.target.value;
    const next = { ...form, [key]: value };
    setForm(next);
    // Immediate sync to API
    await save(next);
  };

  const title = useMemo(() => `Update Student #${id}`, [id]);

  if (loading) {
    return (
      <div className="body-wrap" style={{ padding: 24 }}>
        <button onClick={() => navigate(-1)}>← Back</button>
        <div style={{ marginTop: 16 }}>Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="body-wrap"
      style={{ padding: 24, maxWidth: 640, margin: "0 auto" }}
    >
      <button onClick={() => navigate(-1)}>← Back</button>
      <h2 style={{ marginTop: 12 }}>{title}</h2>
      <div className="form-grid" style={{ marginTop: 12 }}>
        <div className="input-row">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            ref={nameRef}
            value={form.name}
            onChange={onChangeField("name")}
            placeholder="Jane Doe"
          />
          {errors.name && (
            <div className="sub" style={{ color: "#c00" }}>
              {errors.name}
            </div>
          )}
        </div>
        <div className="input-row">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="text"
            inputMode="numeric"
            ref={ageRef}
            value={form.age}
            onChange={onChangeField("age")}
            placeholder="20"
          />
          {errors.age && (
            <div className="sub" style={{ color: "#c00" }}>
              {errors.age}
            </div>
          )}
        </div>
        <div className="input-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            ref={emailRef}
            value={form.email}
            onChange={onChangeField("email")}
            placeholder="jane@school.edu"
          />
          {errors.email && (
            <div className="sub" style={{ color: "#c00" }}>
              {errors.email}
            </div>
          )}
        </div>
        <div className="input-row">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={onChangeField("phone")}
            placeholder="010-0000-0000"
          />
          {errors.phone && (
            <div className="sub" style={{ color: "#c00" }}>
              {errors.phone}
            </div>
          )}
        </div>
        <div className="input-row" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="sex">Sex</label>
          <select id="sex" value={form.sex} onChange={onChangeField("sex")}>
            <option value="">Select</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
          {errors.sex && (
            <div className="sub" style={{ color: "#c00" }}>
              {errors.sex}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
