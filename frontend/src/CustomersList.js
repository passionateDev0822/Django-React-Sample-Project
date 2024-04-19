import React, { useEffect } from 'react'
import { useState } from 'react'

import CustomersService from './CustomersService'
const customersService  = new CustomersService();

export default function CustomersList() {
    const [customers, setCustomer] = useState([]);
    const [nextPageURL, setNextPageURL] = useState("");
    const [previousPageURL, setPreviousPageURL] = useState("");

    useEffect(() => {
        customersService.getCustomers().then((result) => {
            console.log(">>>>>>>>>>", result);
            setCustomer(result.data);
            setNextPageURL(result.nextlink);
            setPreviousPageURL(result.prevlink);
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
        
        const nextPage = () => {
          customersService.getCustomersByURL(nextPageURL)
          .then((result)=>{
            console.log(result);
            setCustomer(result.data);
            setNextPageURL(result.nextlink);
            setPreviousPageURL(result.prevlink);
          })
          .catch((err)=>console.log(err));
        }
        
        const previousPage = () => {
          customersService.getCustomersByURL(previousPageURL)
          .then((result)=>{
            console.log(result);
            setCustomer(result.data);
            setNextPageURL(result.previousPage);
            setPreviousPageURL(result.prevlink);
          })
        .catch((err)=>console.log(err));
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
          <button className="btn btn-primary" onClick={()=>previousPage()}>Previous</button>
          <button className="btn btn-primary" onClick={()=>nextPage()}>Next</button>

      </div>
  )
}
