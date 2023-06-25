import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContractPage = () => {
  const [contracts, setContracts] = useState([]);
  const [user, setUser] = useState(null);
  const [newContract, setNewContract] = useState({
    contract_id: '',
    contract_name: '',
    signing_date: '',
    expiration_date: '',
    total_cost: '',
    amount: '',
    items: '',
    legal_officer_name: '',
    warranty_start_date: '',
    warranty_end_date: '',
    company_name: '',
    address: '',
    company_phone: '',
    liaison_officer_name: '',
    status: '',
    user_id: '',
    employee_id: '',
  });
  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    address: '',
    company_phone: '',
    liaison_officer_name: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    axios
      .get(`http://localhost/api_breef6/User/user/${userId}`)
      .then(function (response) {
        console.log(response.data);
        setUser(response.data);
      })
      .catch(function (error) {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const addContract = () => {
    const contract = {
      ...newContract,
      signing_date: newContract.signing_date,
      expiration_date: newContract.expiration_date,
      total_cost: newContract.total_cost,
      amount: newContract.amount,
      items: newContract.items,
      legal_officer_name: newContract.legal_officer_name,
      warranty_start_date: newContract.warranty_start_date,
      warranty_end_date: newContract.warranty_end_date,
      company_name: newContract.company_name,
      address: newContract.address,
      company_phone: newContract.company_phone,
      liaison_officer_name: newContract.liaison_officer_name,
      status: newContract.status,
      user_id: newContract.user_id,
      employee_id: newContract.employee_id,
    };

    // Make an HTTP POST request to the API endpoint
    axios
      .post('http://localhost/api_breef6/Contract/contract', contract)
      .then((response) => {
        // Handle the response from the API
        console.log(response.data); // You can customize this based on your API response

        // Update the contracts state with the new contract
        setContracts([...contracts, contract]);

        // Reset the form fields
        setNewContract({
          contract_id: '',
          contract_name: '',
          signing_date: '',
          expiration_date: '',
          total_cost: '',
          amount: '',
          items: '',
          legal_officer_name: '',
          warranty_start_date: '',
          warranty_end_date: '',
          company_name: '',
          address: '',
          company_phone: '',
          liaison_officer_name: '',
          status: '',
          user_id: '',
          employee_id: '',
        });
        setCompanyDetails({
          companyName: '',
          address: '',
          company_phone: '',
          liaison_officer_name: '',
        });
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error adding contract:', error);
      });
  };

  const toggleCompanyDetails = () => {
    setShowCompanyDetails(!showCompanyDetails);
  };

  const toggleShowModal = (contract) => {
    setSelectedContract(contract);
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      {showModal && selectedContract && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="d-flex justify-content-end">
              <button className="btn btn-danger" onClick={toggleShowModal}>
                Close
              </button>
            </div>
            <h3 className="modal-title">{selectedContract.contract_id}</h3>
            <p className="modal-details">Signing Date: {selectedContract.signing_date}</p>
            <p className="modal-details">Expiration Date: {selectedContract.expiration_date}</p>
            <p className="modal-details">Total Cost: {selectedContract.total_cost}</p>
            <p className="modal-details">Legal Officer Name: {selectedContract.legal_officer_name}</p>
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
            <p className="modal-details">Location: {companyDetails.address}</p>
            <p className="modal-details">Liaison Officer: {companyDetails.liaison_officer_name}</p>
            <p className="modal-details">Contact Information: {companyDetails.company_phone}</p>
          </div>
        </div>
      )}
      <h1 className="text-center mb-4">Contract Management System</h1>
      <div className="row mb-4">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Contract ID"
            value={newContract.contract_id}
            onChange={(e) => setNewContract({ ...newContract, contract_id: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Contract Title"
            value={newContract.contract_name}
            onChange={(e) => setNewContract({ ...newContract, contract_name: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Signing Date"
            value={newContract.signing_date}
            onChange={(e) => setNewContract({ ...newContract, signing_date: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Expiration Date"
            value={newContract.expiration_date}
            onChange={(e) => setNewContract({ ...newContract, expiration_date: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Total Cost"
            value={newContract.total_cost}
            onChange={(e) => setNewContract({ ...newContract, total_cost: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Amount"
            value={newContract.amount}
            onChange={(e) => setNewContract({ ...newContract, amount: e.target.value })}
          />
     
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Items"
            value={newContract.items}
            onChange={(e) => setNewContract({ ...newContract, items: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Legal officer name"
            value={newContract.legal_officer_name}
            onChange={(e) => setNewContract({ ...newContract, legal_officer_name: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Warranty start date"
            value={newContract.warranty_start_date}
            onChange={(e) => setNewContract({ ...newContract, warranty_start_date: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Warranty end date"
            value={newContract.warranty_end_date}
            onChange={(e) => setNewContract({ ...newContract, warranty_end_date: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Company Name"
            value={newContract.company_name}
            onChange={(e) => setNewContract({ ...newContract, company_name: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Address"
            value={newContract.address}
            onChange={(e) => setNewContract({ ...newContract, address: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Company Phone"
            value={newContract.company_phone}
            onChange={(e) => setNewContract({ ...newContract, company_phone: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Liaison Officer Name"
            value={newContract.liaison_officer_name}
            onChange={(e) => setNewContract({ ...newContract, liaison_officer_name: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Status"
            value={newContract.status}
            onChange={(e) => setNewContract({ ...newContract, status: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="User ID"
            value={user ? user.id : ''}
            onChange={(e) => setNewContract({ ...newContract, user_id: e.target.value })}
          />
        </div>
      </div>
      <div className="button-container mb-4">
  <button className="btn btn-primary" onClick={toggleShowModal}>
    Add Contract
  </button>
  <button className="btn btn-primary" onClick={toggleCompanyDetails}>
    Company Details
  </button>
</div>

    </div>
  );
}

export default ContractPage;
