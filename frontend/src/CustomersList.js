import React, { useEffect } from 'react'
import { useState } from 'react'

import CustomersService from './CustomersService'
const customersService  = new CustomersService();

export default function CustomersList() {
    const [customers, setCustomer] = useState([]);
    const [nextPageURL, setNextPageURL] = useState("");

    useEffect(() => {
        customersService.getCustomers().then((result) => {
            console.log(">>>>>>>>>>", result);
            setCustomer(result.data);
            setNextPageURL(result.nextlink);
        }).catch(error=>{
            console.error(error);
        });
    }, [])

    const deleteCustomer = (pk) => {
        
        customersService.deleteCustomer(pk).then(() => {
            const newCustomer = customers.filter((obj)=>{
                return obj.pk !== pk
            });
            setCustomer(newCustomer);
        }).catch(error=>{
            console.error(error);
        });
    }

  return (
    <div className="customers--list">
          <table className="table">
          <thead key="thead">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Description</th>   
            <th>Actions</th>   
          </tr>
          </thead>

            <tbody>
            {customers.map( c =>

              <tr key={c.pk}>
                <td>{c.pk} </td>
                <td>{c.first_name}</td>
                <td>{c.last_name}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>{c.address}</td>
                <td>{c.description}</td>
                <td>
                <button onClick={()=>deleteCustomer(c.pk)}> Delete</button>
                <a  href={"/customer/" + c.pk}> Update</a> 
                </td>
              </tr>)}
              </tbody>
          </table>  
          <button className="btn btn-primary">Next</button>

      </div>
  )
}
