import React, { useState } from 'react';
import axios from 'axios';

const ContractPage = () => {
  const [contracts, setContracts] = useState([]);
  const [newContract, setNewContract] = useState({
    title: '',
    user_id: '',
    employee_id: '',
    compnay_id: '',
    description: '',
    Signing_Date: '',
    Expiration_Date: '',
    Total_Cost: '',
    Legal_Officer: ''
  });

  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    location: '',
    liaisonOfficer: '',
    contactInformation: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  const addContract = () => {
    const contract = {
      ...newContract,
      title: newContract.title,
      user_id: newContract.user_id,
      employee_id: newContract.employee_id,
      compnay_id: newContract.compnay_id,
      description: newContract.description,
      Signing_Date: newContract.Signing_Date,
      Expiration_Date: newContract.Expiration_Date,
      Total_Cost: newContract.Total_Cost,
      Legal_Officer: newContract.Legal_Officer
    };

    // Make an HTTP POST request to the API endpoint
    axios
      .post('http://localhost/api/contract', contract)
      .then((response) => {
        // Handle the response from the API
        console.log(response.data); // You can customize this based on your API response

        // Update the contracts state with the new contract
        setContracts([...contracts, contract]);

        // Reset the form fields
        setNewContract({
          title: '',
          user_id: '',
          employee_id: '',
          compnay_id: '',
          description: '',
          Signing_Date: '',
          Expiration_Date: '',
          Total_Cost: '',
          Legal_Officer: '',
        });
        setCompanyDetails({
          companyName: '',
          location: '',
          liaisonOfficer: '',
          contactInformation: '',
        });
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error adding contract:', error);
      });
  };

  const deleteContract = (index) => {
    const updatedContracts = [...contracts];
    updatedContracts.splice(index, 1);
    setContracts(updatedContracts);
  };

  const toggleCompanyDetails = () => {
    setShowCompanyDetails(!showCompanyDetails);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContract(null);
  };

  return (
    <div className="container mt-5">
      {showModal && selectedContract && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="d-flex justify-content-end">
              <button className="btn btn-danger" onClick={closeModal}>
                Close
              </button>
            </div>
            <h3 className="modal-title">{selectedContract.title}</h3>
            <p className="modal-details">Signing Date: {selectedContract.Signing_Date}</p>
            <p className="modal-details">Expiration Date: {selectedContract.Expiration_Date}</p>
            <p className="modal-details">Total Cost: {selectedContract.Total_Cost}</p>
            <p className="modal-details">Legal Officer Name: {selectedContract.Legal_Officer}</p>
          </div>
        </div>
      )}
      {showCompanyDetails && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="d-flex justify-content-end">
              <button className="btn btn-danger" onClick={toggleCompanyDetails}>
                Close
              </button>
            </div>
            <h3 className="modal-title">Company Details</h3>
            <p className="modal-details">Company Name: {companyDetails.companyName}</p>
            <p className="modal-details">Location: {companyDetails.location}</p>
            <p className="modal-details">Liaison Officer: {companyDetails.liaisonOfficer}</p>
            <p className="modal-details">Contact Information: {companyDetails.contactInformation}</p>
          </div>
        </div>
      )}
      <h1 className="text-center mb-4">Contract Management System</h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Contract Title"
            value={newContract.title}
            onChange={(e) => setNewContract({ ...newContract, title: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="User ID"
            value={newContract.user_id}
            onChange={(e) => setNewContract({ ...newContract, user_id: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Employee ID"
            value={newContract.employee_id}
            onChange={(e) => setNewContract({ ...newContract, employee_id: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Company ID"
            value={newContract.compnay_id}
            onChange={(e) => setNewContract({ ...newContract, compnay_id: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Description"
            value={newContract.description}
            onChange={(e) => setNewContract({ ...newContract, description: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Signing Date"
            value={newContract.Signing_Date}
            onChange={(e) => setNewContract({ ...newContract, Signing_Date: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Expiration Date"
            value={newContract.Expiration_Date}
            onChange={(e) => setNewContract({ ...newContract, Expiration_Date: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Total Cost"
            value={newContract.Total_Cost}
            onChange={(e) => setNewContract({ ...newContract, Total_Cost: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Legal Officer Name"
            value={newContract.Legal_Officer}
            onChange={(e) => setNewContract({ ...newContract, Legal_Officer: e.target.value })}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-primary" onClick={addContract}>
          Add Contract
        </button>
        <button className="btn btn-primary" onClick={toggleCompanyDetails}>
          Company Details
        </button>
      </div>
      {contracts.length > 0 ? (
        <ul className="list-group">
          {contracts.map((contract, index) => (
            <li
              key={index}
              className="list-group-item"
              onClick={() => {
                setSelectedContract(contract);
                setShowModal(true);
              }}
            >
              <h3>{contract.title}</h3>
              <p>Signing Date: {contract.Signing_Date}</p>
              <p>Expiration Date: {contract.Expiration_Date}</p>
              <p>Total Cost: {contract.Total_Cost}</p>
              <p>Legal Officer Name: {contract.Legal_Officer}</p>
              <button className="btn btn-danger" onClick={() => deleteContract(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No contracts found.</p>
      )}
    </div>
  );
}

export default ContractPage;
