import React, { useEffect, useState } from 'react'
import Navbar from '../pages/Navbar'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTheme } from '../context/ThemeContext';

function Transactions() {

      // declaring theme 
      const {theme}=useTheme()
      
      // react states for transactions data and for filters
      const [transactions, setTransactions] = useState([]);
      const [search, setSearch] = useState("");
      const [filterTransaction, setFilterTransaction] = useState([]);


      // states for Pagination 
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 5;

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filterTransaction.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(filterTransaction.length / itemsPerPage);

      // setting current pages of the taable
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      }
      
      // fetching transaction details from mock api
      useEffect(() => {
        fetch("https://69d379a1336103955f8f0753.mockapi.io/finance/backend/transactions")
          .then(res => res.json())
          .then(res => {setTransactions(res);setFilterTransaction(res);});
      }, []);

      // search filter function
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
      

      // variables for storing filtered data's
      const Salary = transactions.filter((p)=>p.category === "Salary")
      const expense = transactions.filter((p)=>p.type === "expense")
      const Shopping= transactions.filter((p)=>p.category === "Shopping")

      // function for filter transactions
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

      // sorting ascending and descending order based on name
      function handlesort(type) {
        const sorted = [...filterTransaction].sort((a, b) =>
          type === "asc"
            ? a.category.localeCompare(b.category)
            : b.category.localeCompare(a.category)
        );
        setFilterTransaction(sorted);
      }

  return (
    <div className='vh-100 overflow-auto'
      style={{backgroundColor:theme==="light"?"#222":"#fff",color:theme==="light"?"#fff":"#222"}}>

      {/* navbar */}
      <div className='position-fixed w-100'
        style={{ zIndex: 1030 ,backgroundColor:theme==="light"?"#222":"#fff",color:theme==="light"?"#fff":"#222"}}>
        <Navbar />
      </div>

      {/* container starts */}
      <div className='container-fluid container-md pt-5'>

        {/* title */}
        <div className='pt-5'>
          <h2 className='mt-3 text-center text-md-start'>Transactions Details</h2>
        </div>

        {/* cards */}
        <div className='row mt-4 mb-4 g-3'>
          {/* card 1 */}
          <div className='col-lg-3 box  col-md-6 col-12'>
            <div className={`card p-4 text-center ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
              <strong>Total Transaction this month</strong>
              <h4>483988</h4>
            </div>
          </div>

          {/* card 2 */}
          <div className='col-lg-3 box col-md-6 col-12'>
            <div className={`card p-4 text-center ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
              <strong>Total Income</strong>
              <h4>₹5400000</h4>
            </div>
          </div>

          {/* card 3 */}
          <div className='col-lg-3 box col-md-6 col-12'>
            <div className={`card p-4 text-center ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
              <strong>Total Expenses</strong>
              <h4>450050</h4>
            </div>
          </div>

          {/* card 4 */}
          <div className='col-lg-3 box col-md-6 col-12'>
            <div className={`card p-4 text-center ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
              <strong>Pending Transaction</strong>
              <h4>20</h4>
            </div>
          </div>
        </div>

        {/* table */}
        <div className={`card p-4 ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>

          {/* controls */}
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

              {/* dropdown filter */}
              <select
                onChange={(e) => handlefilter(e.target.value)}
                className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} form-select`}
              >
                <option value="all">All Transactions</option>
                <option value="Salary">Salary</option>
                <option value="Shopping">Shopping</option>
                <option value="expense">Expense</option>
              </select>

              {/* sorting section */}
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

          {/* table responsive wrapper */}
          <div className='table-responsive'>

            {/* table for showing transaction details */}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* code for pagination */}
          <nav className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
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
          {/* end of pagination */}

        </div>
      </div>
    </div>
  )
}

export default Transactions