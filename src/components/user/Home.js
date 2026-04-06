import React, { useEffect, useState } from 'react'
import Navbar from '../pages/Navbar'
import ExpenseChart from '../charts/ExpenseChart';
import SavingsGraph from '../charts/SavingsGraph';
import CategoryExpChart from '../charts/CategoryExpChart';
import { useTheme } from '../context/ThemeContext';

function Home() {
    
    //declaring theme context
    const {theme} = useTheme()

    //react state for transactions and data's
    const [data, setData] = useState({});
    const [transacion ,SetTransactions] = useState([])
    
    // useEffect for rendering data's from api
    useEffect(() => {
        fetch("https://69d379a1336103955f8f0753.mockapi.io/finance/backend/users")  /*fetch users data */
        .then(res => res.json())
        .then(res => setData(res));
        console.log(data)

        fetch("https://69d379a1336103955f8f0753.mockapi.io/finance/backend/transactions")  /*fetch transactions data */
        .then(res=>res.json())
        .then(res=>SetTransactions(res));
    }, [data]);

  return (
    <div  style={{backgroundColor:theme==="light"?"#222":"#fff",color:theme==="light"?"#fff":"#222"}}>
        {/* navbar */}
        <div className='position-fixed w-100' style={{ zIndex: 1030 }}>
            <Navbar/>
        </div>
        {/* navbar ends */}
        {/* main page */}
        <div className='container-fluid pt-5'>
            {/* financial details */}
            <div className='pt-5 ms-3'>

                {/* welcome text */}
                <div>
                    <h3 className='mt-1'>Welcome Back!</h3>
                </div>
                
                {/* row */}
                <div className='row mt-4 border-top pt-3 g-4'>
                {/* left side column for displaying details */}
                <div className='col-md-8'>
                    
                    {/* Cards Row */}
                    <div className='row g-4'>
                        {/* card 1 */}
                    <div className='col-md-3 box col-6 col-sm-4'>
                        <div className='text-center border rounded shadow p-4'>
                        <h4 className='fs-5 fs-md-5 fs-lg-4'>Balance</h4>
                        <h5>50,000</h5>
                        </div>
                    </div>

                    {/* card 2 */}
                    <div className='col-md-3 box col-6 col-sm-4'>
                        <div className='text-center border rounded shadow p-4'>
                        <h4 className='fs-5 fs-md-5 fs-lg-4'>Total Expenses</h4>
                        <h5>42,000</h5>
                        </div>
                    </div>

                    {/* card 3 */}
                    <div className='col-md-3 box col-6 col-sm-4'>
                        <div className='text-center border rounded shadow p-4'>
                        <h4 className='fs-5 fs-md-5 fs-lg-4'>Total Income</h4>
                        <h5>1,00,000</h5>
                        </div>
                    </div>

                    {/* card 4 */}
                    <div className='col-md-3 box col-6 col-sm-4'>
                        <div className='text-center border rounded shadow p-4'>
                        <h4 className='fs-5 fs-md-5 fs-lg-4'>Savings</h4>
                        <h5>{50000 - 42000}</h5>
                        </div>
                    </div>
                    </div>

                    {/* chart  for displaying savings and expense*/}
                    <div className='mt-4 p-4 border rounded shadow'>
                    <h4 className='fs-5 fs-md-5 fs-lg-4'>Monthly Savings And Expenses</h4>
                    <SavingsGraph />
                    </div>

                </div>

                {/* for Revenue and Expense bar chart */}
                <div className='col-md-4 col-12 col-sm d-flex flex-column'>
                    <div className='row'>
                    <div className='shadow p-4 '>
                    <h4 className='text-start mb-5'>Monthly Revenue & Expenses</h4>
                    {/* chart for displaying expense category wise */}
                    <ExpenseChart />
                    </div>
                     <div className={`card mt-2 text-center ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
                    
                    {/* feedback of cashflow */}
                    <strong className='fs-5 p-3'>
                        👍😎 Nice control! You spent less than before 📊
                    </strong>
                    </div>
                    </div>
                    {/* end of expense chart and feedback */}
                   
                </div>


                </div>
                {/* end of row */}

                {/* for expense category and recent transactions */}
                <div className='row  mt-2 g-4 mb-3 align-items-stretch'>
                    <div className='col-md-6  col-12 col-sm-'>
                        <div className={`card w-100 h-100 p-4 ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
                            <h5>Expense Chart</h5>
                            <CategoryExpChart/>
                        </div>
                    </div>
                    {/* end of chart */}

                    {/* table starts */}
                    <div className='col-md-6  col-12 '>
                        <div className={`card w-100 p-4 ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
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
                                </div>

                            </div>
                    </div>
                    {/* end of table */}
                </div>

                
            </div>
            {/* end of details */}
        </div>
        {/* container ends */}
    </div>
  )
}

export default Home
