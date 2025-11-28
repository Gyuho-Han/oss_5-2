import React, { useEffect, useRef, useState } from "react";

export default function StudentModal({
  isOpen,
  mode,
  initialValues,
  onCancel,
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    sex: "",
  });

  // Refs for validation
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setForm({
        name: initialValues?.name || "",
        age: initialValues?.age || "",
        email: initialValues?.email || "",
        phone: initialValues?.phone || "",
        sex: initialValues?.sex || "",
      });
    }
  }, [isOpen, initialValues]);

  useEffect(() => {
    if (isOpen) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  const isValidEmail = (v) => {
    const value = String(v || "").trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  };

  const isNumeric = (v) => {
    const s = String(v || "").trim();
    if (s === "") return false;
    return /^\d+$/.test(s);
  };

  const isValidName = (v) => {
    const s = String(v || "").trim();
    if (!s) return false;
    // Allow Korean/English alphabets and spaces/dots/hyphens
    return /^[A-Za-z가-힣\s.\-]+$/.test(s);
  };

  const validateAndSubmit = () => {
    const nameVal = String(nameRef.current?.value ?? "").trim();
    const ageVal = String(ageRef.current?.value ?? "").trim();
    const emailVal = String(emailRef.current?.value ?? "").trim();
    const phone = (form.phone || "").trim();
    const sex = (form.sex || "").trim().toLowerCase();

    // Presence first
    if (!nameVal || !ageVal || !emailVal || !phone || !sex) {
      alert("Please fill in all fields.");
      if (!nameVal) nameRef.current?.focus();
      else if (!ageVal) ageRef.current?.focus();
      else if (!emailVal) emailRef.current?.focus();
      return;
    }

    // useRef-based field validations
    if (!isValidName(nameVal)) {
      alert("Name can include only letters, spaces, dots, or hyphens.");
      nameRef.current?.focus();
      return;
    }

    if (!isNumeric(ageVal)) {
      alert("Age must be a number.");
      ageRef.current?.focus();
      return;
    }

    if (!isValidEmail(emailVal)) {
      alert("Invalid email format.");
      emailRef.current?.focus();
      return;
    }

    if (sex !== "male" && sex !== "female") {
      alert("Sex must be 'male' or 'female'.");
      return;
    }

    onSubmit({
      ...form,
      name: nameVal,
      age: ageVal,
      email: emailVal,
      phone,
      sex,
    });
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <h2>{mode === "update" ? "Edit Student" : "Add New Student"}</h2>
        <div className="form-grid">
          <div className="input-row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Jane Doe"
              ref={nameRef}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="input-row">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              inputMode="numeric"
              placeholder="20"
              ref={ageRef}
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
          </div>
          <div className="input-row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="jane@school.edu"
              ref={emailRef}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="input-row">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              placeholder="010-0000-0000"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="input-row" style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="sex">Sex</label>
            <select
              id="sex"
              value={(form.sex || "").toLowerCase()}
              onChange={(e) => setForm({ ...form, sex: e.target.value })}
            >
              <option value="">Select</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
        </div>
        <button
          className="btnAddReact"
          type="button"
          onClick={validateAndSubmit}
        >
          {mode === "update" ? "Update" : "Add"}
        </button>
        <button className="btnCancelReact" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
