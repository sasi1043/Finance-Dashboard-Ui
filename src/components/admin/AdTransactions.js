import React, { useEffect, useState } from 'react'
import Navbar from '../pages/Navbar'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTheme } from '../context/ThemeContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function AdTransactions() {

      const {theme}=useTheme()
      
      // react states
      const [transactions, setTransactions] = useState([]);
      const [search, setSearch] = useState("");
      const [filterTransaction, setFilterTransaction] = useState([]);

      // Pagination states
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 5;

      // variables for pagination
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filterTransaction.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(filterTransaction.length / itemsPerPage);

      // setting current page
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      }
      // fetching details
      useEffect(() => {
        fetch("https://69d379a1336103955f8f0753.mockapi.io/finance/backend/transactions")
          .then(res => res.json())
          .then(res => {setTransactions(res);setFilterTransaction(res);});
      }, []);

      // search filter
      useEffect(() => {
        let updated = [...transactions];

        if (search.trim() !== "") {
          updated = updated.filter((p) =>
            p.bank?.toLowerCase().includes(search.toLowerCase()) ||
            p.type?.toLowerCase().includes(search.toLowerCase()) ||
            p.category?.toLowerCase().includes(search.toLowerCase())
          );
        }
        setFilterTransaction(updated);
        setCurrentPage(1);
      }, [search, transactions]);

     // filter
      const Salary = transactions.filter((p)=>p.category === "Salary")
      const expense = transactions.filter((p)=>p.type === "expense")
      const Shopping= transactions.filter((p)=>p.category === "Shopping")

      // filter for all transactions
      function handlefilter(val) {

        if(val ==="all"){
          setFilterTransaction(transactions)
        }
         else if(val ==="Salary"){
          setFilterTransaction(Salary)
        }
         else if(val ==="Shopping"){
          setFilterTransaction(Shopping)
        }
        else if(val ==="expense"){
          setFilterTransaction(expense)
        }

          setCurrentPage(1);
      }

      // sorting data's
      function handlesort(type) {
        const sorted = [...filterTransaction].sort((a, b) =>
          type === "asc"
            ? a.bank.localeCompare(b.bank)
            : b.bank.localeCompare(a.bank)
        );
        setFilterTransaction(sorted);
      }

  return (
    <div  style={{backgroundColor:theme==="light"?"#222":"#fff",color:theme==="light"?"#fff":"#222"}} className="overflow-auto">

      {/* navbar */}
      <div className='position-fixed w-100'
        style={{ zIndex: 1030 ,backgroundColor:theme==="light"?"#222":"#fff",color:theme==="light"?"#fff":"#222"}}>
        <Navbar/>
      </div>

      <div className='container-fluid container-md pt-5'>

        <div className='pt-5'>
          <h2 className='mt-3 text-center text-md-start'>Transactions Details</h2>
        </div>

        {/* cards */}
        <div className='row mt-4 mb-4 g-3'>
          <div className='col-lg-3 col-md-6 col-12'>
            <div className={`card p-4 box text-center ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
              <strong>Total Transaction this month</strong>
              <h4>₹483988 </h4>
            </div>
          </div>

          <div className='col-lg-3 col-md-6 col-12'>
            <div className={`card p-4 box text-center ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
              <strong>Total Income</strong>
              <h4>₹5400000</h4>
            </div>
          </div>

          <div className='col-lg-3 box col-md-6 col-12'>
            <div className={`card p-4 text-center ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
              <strong>Total Expenses</strong>
              <h4>₹450050</h4>
            </div>
          </div>
        
          <div className='col-lg-3 box col-md-6 col-12'>
            <div className={`card p-4 text-center ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
              <strong>Pending Transaction</strong>
              <h4>20</h4>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className={`card p-4 ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>

          {/* filter section */}
          <div className='row mb-3 g-3'>
            <div className='col-12 col-md-6'>
              <input
                className={`form-control ${theme === "light" ? "bg-dark text-light input-light" : "bg-white text-dark input-dark"}`}
                placeholder="Search Transactions"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className='col-12 col-md-6 d-flex flex-column flex-md-row justify-content-md-end gap-3'>
              <select
                onChange={(e) => handlefilter(e.target.value)}
                className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} form-select`}
              >
                <option value="all">All Transactions</option>
                <option value="Salary">Salary</option>
                <option value="Shopping">Shopping</option>
                <option value="expense">Expense</option>
              </select>

              <div className='d-flex align-items-center justify-content-center justify-content-md-start'>
                <span className='fw-bold me-2'>Sort</span>
                <button className='btn btn-sm' onClick={() => handlesort("asc")}>
                  <ArrowUpwardIcon className={`${theme ==="light"? 'text-white':'text-dark'}`}/>
                </button>
                <button className='btn btn-sm' onClick={() => handlesort("desc")}>
                  <ArrowDownwardIcon className={`${theme ==="light"? 'text-white':'text-dark'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* responsive table  for display users*/}
          <div className='table-responsive'>
            <table className={`${theme === "light" ? "table-dark" : "table"} table table-hover table-md mt-2`}>
              <thead>
                <tr>
                  <th>Transaction Id</th>
                  <th>Bank</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.bank}</td>
                    <td>{item.type}</td>
                    <td>{item.category}</td> 
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                    <td>{item.status}</td>
                    <td><MoreVertIcon titleAccess='edit'/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          <nav className={`mt-2 ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
            <ul className="pagination justify-content-center flex-wrap">

              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </button>
              </li>

            </ul>
          </nav>

        </div>
      </div>
    </div>
  )
}

export default AdTransactions