import React, { useState } from 'react';
import axios from "axios";


const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  form: {
    marginBottom: '20px',
  },
  formInput: {
    marginBottom: '10px',
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 'bold',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  contractsList: {
    listStyleType: 'none',
    padding: 0,
  },
  contractCard: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f2f2f2',
    borderRadius: '4px',
  },
  contractTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  contractDetails: {
    fontSize: '14px',
    marginBottom: '5px',
  },
  deleteButton: {
    padding: '4px 8px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  // Modal styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '4px',
    maxWidth: '600px',
  },
  modalCloseButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '4px 8px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  modalDetails: {
    fontSize: '14px',
    marginBottom: '5px',
  },
};

function ContractPage() {
  const [contracts, setContracts] = useState([]);
  const [newContract, setNewContract] = useState({
    title: '',
    signingDate: '',
    expirationDate: '',
    cost: '',
    legalOfficer: '',
    user_id: '',
    employee_id: '',
    company_id: '',
    description: ''
  });
  
  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    location: '',
    liaisonOfficer: '',
    contactInformation: '',
  });
  

  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);

  const [selectedContract, setSelectedContract] = useState(null);

  const filterContracts = () => {};

 

  const addContract = () => {
    const contract = {
      ...newContract,
      user_id: newContract.user_id,
      employee_id: newContract.employee_id,
      company_id: newContract.company_id,
      description: newContract.description
    };
      
    // Make an HTTP POST request to the PHP API endpoint
    axios.post('http://localhost/api/contract', contract)
      .then((response) => {
        // Handle the response from the API
        console.log(response.data); // You can customize this based on your API response
  
        // Update the contracts state with the new contract
        setContracts([...contracts, contract]);
          setNewContract({ title: '', user_id: '', employee_id: '', company_id: '', description: '', signingDate: '', expirationDate: '', cost: '', legalOfficer: '' });
          setCompanyDetails({ companyName: '', address: '', city: '', state: '', zipCode: '' });
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

  const filteredContracts = contracts.filter((contract) => {
    const searchFilter = filter.toLowerCase();
    return (
      contract.title.toLowerCase().includes(searchFilter) ||
      contract.signingDate.toLowerCase().includes(searchFilter) ||
      contract.expirationDate.toLowerCase().includes(searchFilter) ||
      contract.cost.toLowerCase().includes(searchFilter) ||
      contract.legalOfficer.toLowerCase().includes(searchFilter)
    );
  });
  const toggleCompanyDetails = () => {
    setShowCompanyDetails(!showCompanyDetails);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSelectedContract(null);
  };

  return (
    
//     <div style={styles.container}>
//    {showModal && selectedContract && (
//   <div style={styles.modalOverlay}>
//     <div style={styles.modalContent}>
//       <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//         <div>
//         <h3 style={styles.modalTitle}>{selectedContract.title}</h3>
//         <p style={styles.modalDetails}>Signing Date: {selectedContract.signingDate}</p>
//         <p style={styles.modalDetails}>Expiration Date: {selectedContract.expirationDate}</p>
//         <p style={styles.modalDetails}>Total Cost: {selectedContract.cost}</p>
//         <p style={styles.modalDetails}>Legal Officer Name: {selectedContract.legalOfficer}</p>
//       </div>
//       <div >
//         <button onClick={closeModal} style={styles.modalCloseButton}>
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
//   </div>
// )}
<div style={styles.container}>
{showModal && selectedContract && (
  <div className="modal">
    {/* <div onClick={toggleshowModel} className="overlay"></div> */}
    <div className="modal-content">
      <h2>Hello Modal</h2>
      <div className="card">
        <div className="card-body">
          <i className="fa fa-pen fa-xs edit"></i>
          <div>
            <h3 style={styles.modalTitle}>{selectedContract.title}</h3>
            <p style={styles.modalDetails}>Signing Date: {selectedContract.signingDate}</p>
            <p style={styles.modalDetails}>Expiration Date: {selectedContract.expirationDate}</p>
            <p style={styles.modalDetails}>Total Cost: {selectedContract.cost}</p>
            <p style={styles.modalDetails}>Legal Officer Name: {selectedContract.legalOfficer}</p>
          </div>
          <div>
            <button onClick={closeModal} style={styles.modalCloseButton}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
{showCompanyDetails && (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={toggleCompanyDetails} style={styles.modalCloseButton}>
            Close
          </button>
        </div>
        <h3 style={styles.modalTitle}>Company Details</h3>
        <p style={styles.modalDetails}>Company Name: {companyDetails.companyName}</p>
        <p style={styles.modalDetails}>Location: {companyDetails.location}</p>
        <p style={styles.modalDetails}>Liaison Officer: {companyDetails.liaisonOfficer}</p>
        <p style={styles.modalDetails}>Contact Information: {companyDetails.contactInformation}</p>
      </div>
    </div>
  )}

      
      <h1 style={styles.header}>Contract Management System</h1>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Contract Title"
          value={newContract.title}
          onChange={(e) => setNewContract({ ...newContract, title: e.target.value })}
          style={styles.formInput}
        />
        <input
  type="text"
  placeholder="User ID"
  value={newContract.user_id}
  onChange={(e) => setNewContract({ ...newContract, user_id: e.target.value })}
  style={styles.formInput}
/>

<input
  type="text"
  placeholder="Employee ID"
  value={newContract.employee_id}
  onChange={(e) => setNewContract({ ...newContract, employee_id: e.target.value })}
  style={styles.formInput}
/>

<input
  type="text"
  placeholder="Company ID"
  value={newContract.company_id}
  onChange={(e) => setNewContract({ ...newContract, company_id: e.target.value })}
  style={styles.formInput}
/>

<input
  type="text"
  placeholder="Description"
  value={newContract.description}
  onChange={(e) => setNewContract({ ...newContract, description: e.target.value })}
  style={styles.formInput}
/>

        <input
          type="text"
          placeholder="Signing Date"
          value={newContract.signingDate}
          onChange={(e) => setNewContract({ ...newContract, signingDate: e.target.value })}
          style={styles.formInput}
        />
        <input
          type="text"
          placeholder="Expiration Date"
          value={newContract.expirationDate}
          onChange={(e) => setNewContract({ ...newContract, expirationDate: e.target.value })}
          style={styles.formInput}
        />
        <input
          type="text"
          placeholder="Total Cost"
          value={newContract.cost}
          onChange={(e) => setNewContract({ ...newContract, cost: e.target.value })}
          style={styles.formInput}
        />
        <input
          type="text"
          placeholder="Legal Officer Name"
          value={newContract.legalOfficer}
          onChange={(e) => setNewContract({ ...newContract, legalOfficer: e.target.value })}
          style={styles.formInput}
        />
        <button onClick={() => { setShowModal(true); setSelectedContract(newContract); }} style={styles.addButton}>
          Add Contract
        </button>
        <button onClick={toggleCompanyDetails} style={styles.addButton}>
  Company Details
</button>

        
        {/* <button onClick={addContract} style={styles.addButton}>
          Add Contract
        </button> */}
      </div>

      {contracts.length > 0 ? (
        <ul style={styles.contractsList}>
          {contracts.map((contract, index) => (
            <li
              key={index}
              style={styles.contractCard}
              onClick={() => {
                setSelectedContract(contract);
                setShowModal(true);
              }}
            >
              <h3 style={styles.contractTitle}>{contract.title}</h3>
              <p style={styles.contractDetails}>Signing Date: {contract.signingDate}</p>
              <p style={styles.contractDetails}>Expiration Date: {contract.expirationDate}</p>
              <p style={styles.contractDetails}>Total Cost: {contract.cost}</p>
              <p style={styles.contractDetails}>Legal Officer Name: {contract.legalOfficer}</p>
              <button onClick={() => deleteContract(index)} style={styles.deleteButton}>
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
