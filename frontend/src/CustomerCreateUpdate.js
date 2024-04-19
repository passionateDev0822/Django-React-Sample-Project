import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomersService from "./CustomersService";

const CustomerCreateUpdate = () => {
    const navigate = useNavigate();
    const {pk} = useParams();
    const customersService = new CustomersService();
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);
    const descriptionRef = useRef(null);

    useEffect(() => {
        if (pk) {
            customersService.getCustomer(pk).then((c) => {
                firstNameRef.current.value = c.first_name; // accessing current property of useRef
                lastNameRef.current.value = c.last_name;
                phoneRef.current.value = c.phone;
                emailRef.current.value = c.email;
                addressRef.current.value = c.address;
                descriptionRef.current.value = c.description;
            })
        }
    }); // adding props to the dependency array

    const createCustomer = () => {
        customersService
            .createCustomer({
                'first_name': firstNameRef.current.value,
                'last_name': lastNameRef.current.value,
                'phone': phoneRef.current.value,
                'email': emailRef.current.value,
                'address': addressRef.current.value,
                'description': descriptionRef.current.value,
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

    const updateCustomer = (pk) => {
        customersService.updateCustomer({
            'pk' : pk,
            'first_name': firstNameRef.current.value,
            'last_name': lastNameRef.current.value,
            'phone': phoneRef.current.value,
            'email': emailRef.current.value,
            'address': addressRef.current.value,
            'description': descriptionRef.current.value,
        }).then(() => {
            alert("Customer updated");
            navigate("/")
        }).catch((err)=>{
            console.log(err);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(pk){
            updateCustomer(pk);
        }else{
            createCustomer();
        }
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

export default CustomerCreateUpdate;