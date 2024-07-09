import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/views/addContact.css";
import ConfirmSave from "../component/ConfirmSave";

const initialContact = {
  name: "",
  email: "",
  phone: "",
  address: ""
};

const AddContact = () => {
  const { store, actions } = useContext(Context);
  const [contact, setContact] = useState(initialContact);
  const [showConfirmSave, setShowConfirmSave] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setContact({
      ...contact,
      [target.name]: target.value
    });
  };

  const handleSubmit = async () => {
    try {
      if (contact.name.trim() !== "" || contact.email.trim() !== "" || contact.phone.trim() !== "" || contact.address.trim() !== "") {
        let response = await actions.addContact(contact);

        if (response) {
          setContact(initialContact);
          setShowConfirmSave(true);
          setTimeout(() => {
            setShowConfirmSave(false);
            navigate("/")
          }, 2000);
        } else {
          alert("Error al agregar el contacto");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="pt-5" onSubmit={(event) => event.preventDefault()}>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
        <div className="tittle d-flex justify-content-center">
          <h1>Add a new Contact</h1>
        </div>
        <div className="mb-3 col-8">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Full Name" 
            name="name"
            value={contact.name}
            onChange={handleChange}
            maxLength={25}
          />
        </div>
        <div className="mb-3 col-8">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            placeholder="Enter email" 
            name="email"
            value={contact.email}
            onChange={handleChange}
            maxLength={50}
          />
        </div>
        <div className="mb-3 col-8">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input 
            type="tel" 
            className="form-control no-arrows" 
            placeholder="Enter Phone" 
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            maxLength={20}
          />
        </div>
        <div className="mb-3 col-8">
          <label htmlFor="address" className="form-label">Address</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter address"
            name="address"
            value={contact.address}
            onChange={handleChange}
            maxLength={50}
          />
        </div>
        <div className="mb-3 d-flex flex-column align-items-center col-4">
          <button type="submit" className="btn btn-primary col-4" onClick={handleSubmit}>Save</button>
          <NavLink type="button" className=" mt-2 col-4" to="/">Or get Back to contacts</NavLink>
        </div>
      </div>
      {showConfirmSave && <ConfirmSave />}
    </form>
  );
};

export default AddContact;