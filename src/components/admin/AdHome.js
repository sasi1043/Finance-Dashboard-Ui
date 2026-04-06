import React, { useEffect, useState } from 'react'
import Navbar from '../pages/Navbar'
import CategoryExpChart from '../charts/CategoryExpChart';
import ExpenseChart from '../charts/ExpenseChart';
import SavingsGraph from '../charts/SavingsGraph';
import { useTheme } from '../context/ThemeContext';

function AdHome() {

    const {theme} =useTheme()
  const [data, setData] = useState({});
      const [transacion ,SetTransactions] = useState([])
  
      useEffect(() => {
          fetch("https://69d379a1336103955f8f0753.mockapi.io/finance/backend/users")
          .then(res => res.json())
          .then(res => setData(res));
          console.log(data)
  
          fetch("https://69d379a1336103955f8f0753.mockapi.io/finance/backend/transactions")
          .then(res=>res.json())
          .then(res=>SetTransactions(res));
      }, [data]);

  return (
     <div className='vh-100' style={{backgroundColor:theme==="light"?"#222":"#fff",color:theme==="light"?"#fff":"#222"}}>
        {/* navbar */}
        <div className='position-fixed w-100' style={{ zIndex: 1030 }}>
            <Navbar/>
        </div>
        {/* main page */}
        <div className='vh-100 container-fluid pt-5'>
            {/* financial details */}
            <div className='pt-5 ms-3'>
                <h3 className='mt-3'>Welcome Back </h3>
                <div className='row mt-4 border-top pt-3 g-4'>
                {/* left side */}
                <div className='col-md-8'>
                    
                    {/* Cards Row */}
                    <div className='row g-4'>
                    <div className='col-md-3 box col-6 col-sm-4'>
                        <div className='text-center border rounded shadow p-4'>
                        <h4 className='fs-5 fs-md-5 fs-lg-4'>Total Users</h4>
                        <h5>50000</h5>
                        </div>
                    </div>

                    <div className='col-md-3 box col-6 col-sm-4'>
                        <div className='text-center border rounded shadow p-4'>
                        <h4 className='fs-5 fs-md-5 fs-lg-4'>Total Transactions</h4>
                        <h5>54565</h5>
                        </div>
                    </div>

                    <div className='col-md-3 box col-6 col-sm-4'>
                        <div className='text-center border rounded shadow p-4'>
                        <h4 className='fs-5 fs-md-5 fs-lg-4'>Overall Income</h4>
                        <h5>₹2,50,000</h5>
                        </div>
                    </div>

                    <div className='col-md-3 box col-6 col-sm-4'>
                        <div className='text-center border rounded shadow p-4'>
                        <h4 className='fs-5 fs-md-5 fs-lg-4'>Expenses</h4>
                        <h5>₹1,40,000</h5>
                        </div>
                    </div>
                    </div>

                    {/* for savings chart */}
                    <div className='mt-4 p-4 border rounded shadow'>
                    <h4 className='fs-5 fs-md-5 fs-lg-4'> Overall Monthly Savings And Expenses</h4>
                    <SavingsGraph />
                    </div>

                </div>

                {/* for Revenue and Expense bar chart */}
                <div className='col-md-4 col-12 d-flex flex-column'>
                    <div className='row'>
                    <div className='shadow p-4 '>
                    <h4 className='text-start mb-5 fs-5 fs-md-5 fs-lg-4'> Overall Monthly Revenue & Expenses</h4>
                    <ExpenseChart />
                    </div>
                     <div className={`card mt-2 text-center ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
                        <strong className='fs-5 p-3'>👍😎 Nice control! You spent less than before 📊</strong>
                     </div>
                    </div>
                   
                </div>

                </div>
                {/* end of expense graphs */}

                {/* for expense category and recent transactions */}
                <div className='row  mt-2 g-4 mb-3'>
                    <div className='col-md-6  col-12'>
                        <div className={`card w-100 h-100 p-4 ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
                            <h5>Expense Chart</h5>
                            <CategoryExpChart/>
                        </div>
                    </div>
                    <div className='col-md-6  col-12 '>
                        <div className={`card w-100 p-4 ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
                            {/* table for displaying recent transaction */}
                            <h4 className='mb-3'>Recent Transactions</h4>
                            <div className="table-responsive">
                                <table className={`table ${theme === "light" ? "table-dark" : "table"}`}>
                                    <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Type</th>
                                        <th>Date</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {transacion.slice(0,5).map((p) => (
                                        <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>{p.category}</td>
                                        <td>{p.amount}</td>
                                        <td>{p.type}</td>
                                        <td>{p.date}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {/* end of table */}
                                </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default AdHome
