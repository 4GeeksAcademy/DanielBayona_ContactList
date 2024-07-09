import React, {useContext} from "react";
import '../../styles/component/contactCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan, faPencil, faLocationDot, faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";



const ContactCard = ({contact,remove,edit}) => {


  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="myCard card mb-3">
        <div className="row g-0">
          <div className="col-md-2 d-flex align-items-center justify-content-center">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt={name} className="img-fluid rounded-circle p-1"/>
          </div>
          <div className="col-md-6 d-flex align-items-center ps-4">
            <div className="card-body">
              <h5 className="card-title">{contact.name}</h5>
              <p className="card-text"><FontAwesomeIcon icon={faLocationDot} className="pe-2" />{contact.address}</p>
              <p className="card-text">
                <small className="text-body-secondary"><FontAwesomeIcon icon={faPhone} className="pe-2"  />{contact.phone}</small>
              </p>
              <p className="card-text">
                <small className="text-body-secondary"><FontAwesomeIcon icon={faEnvelope} className="pe-2" />{contact.email}</small>
              </p>
            </div>
          </div>
          <div className=" col-md-4 d-flex justify-content-end align-items-start gap-3 mt-3 pe-2">
                <NavLink className="btn btn-primary" to={`/editcontact/${contact.id}`}><FontAwesomeIcon icon={faPencil} /></NavLink>
                <button className="btn btn-danger" onClick={remove}><FontAwesomeIcon icon={faTrashCan}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;