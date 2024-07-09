import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import "../../styles/views/editContact.css";




const EditContact = () => {
    const { store, actions } = useContext(Context);
    const [contact, setContact] = useState(null);

    const param = useParams();
    const navigate = useNavigate();


    const searchContact = (id) =>{
        const contact = store.contacts.find(contact => contact.id == id);
        setContact(contact);
    }

    const handleChange = ({target}) =>{
        setContact({
            ...contact,
            [target.name]: target.value
        });
    }

    const handleSubmit = async () => {
        try {
            if (contact?.name.trim() && contact?.email.trim() && contact?.phone.trim() && contact?.address.trim()) {
                let response = await actions.updateContact(contact.id, contact);
                if (response) {
                    setContact(null);
                    navigate('/');
                }
            } else {
                alert("Please fill all the fields");
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() =>{
        searchContact(param.id);
    },[store.contacts, param.id])

  return (
    <form className="pt-5" onSubmit={(event) => event.preventDefault()}>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
        <div className="title d-flex justify-content-center">
          <h1>Edit Contact</h1>
        </div>
        <div className="mb-3 col-8">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            name="name"
            value={contact?.name}
            onChange={handleChange}
            maxLength={25}
          />
        </div>
        <div className="mb-3 col-8">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={contact?.email}
            onChange={handleChange}
            maxLength={50}
          />
        </div>
        <div className="mb-3 col-8">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter Phone"
            name="phone"
            value={contact?.phone}
            onChange={handleChange}
            maxLength={20}
          />
        </div>
        <div className="mb-3 col-8">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter address"
            name="address"
            value={contact?.address}
            onChange={handleChange}
            maxLength={50}
          />
        </div>
        <div className="mb-3 d-flex flex-column align-items-center col-4">
          <button type="submit" className="btn btn-primary col-4" onClick={handleSubmit}>
            Save
          </button>
          <NavLink type="button" className="btn btn-secondary mt-2 col-4" to="/">
            Cancel
          </NavLink>
        </div>
      </div>
    </form>
  );
};

export default EditContact;
