import React, { useState, useContext } from "react";
import ContactCard from "../component/ContactCard";
import AnimatedBackground from "../component/AnimatedBackground";
import ModalWarning from "../component/ModalWarning";
import { NavLink } from "react-router-dom";
import { Context } from "../store/appContext";


const Contact = () => {
  const { store, actions } = useContext(Context);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactIdToDelete, setContactIdToDelete] = useState(null);


  const handleDelete = (id) => {
    setContactIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    actions.deleteContact(contactIdToDelete);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <AnimatedBackground />
      <div className="container-fluid">
        <div className="container d-flex justify-content-end pt-4">
          <NavLink type="button" className="btn btn-success btn-lg" to="/addcontact">
            Add new Contact
          </NavLink>
        </div>
        {store.contacts.map((item) => (
          <div key={item.id}>
            <ContactCard
              contact={item}
              remove={() => handleDelete(item.id)}
            />
          </div>
        ))}
      </div>
      {showDeleteModal && (
        <ModalWarning
          show={showDeleteModal}
          title="Are you sure?"
          text="You won't be able to revert this!"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default Contact;