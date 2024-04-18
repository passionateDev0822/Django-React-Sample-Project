import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import CustomersService from "./CustomersService";

export default function CustomerCreateUpdate() {
    const navigate = useNavigate();
  const customersService = new CustomersService();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const descriptionRef = useRef(null);

  const createCustomer = () => {
    customersService
      .createCustomer({
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        phone: phoneRef.current.value,
        email: emailRef.current.value,
        address: addressRef.current.value,
        description: descriptionRef.current.value,
      })
      .then(() => {
        alert("Customer inserted");
        navigate("/");
      })
      .catch((err) => {
        alert("There was an error. Please recheck your form!");
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCustomer();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name:</label>
        <input className="form-control" type="text" ref={firstNameRef} />

        <label>Last Name:</label>
        <input className="form-control" type="text" ref={lastNameRef} />

        <label>Phone:</label>
        <input className="form-control" type="text" ref={phoneRef} />

        <label>Email:</label>
        <input className="form-control" type="text" ref={emailRef} />

        <label>Address:</label>
        <input className="form-control" type="text" ref={addressRef} />

        <label>Description:</label>
        <textarea className="form-control" ref={descriptionRef}></textarea>
        <input className="btn btn-primary" type="submit" value="Submit" />
      </div>
    </form>
  );
}
