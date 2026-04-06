import React, { useEffect } from 'react'
import Navbar from '../pages/Navbar'
import Goldchart from '../charts/Goldchart'
import Silver from '../charts/Silver'
import { useTheme } from '../context/ThemeContext'

function Analytics() {


    const {theme}= useTheme()
      useEffect(() => {
      const elements = document.querySelectorAll(".block");
       
      // in and out animation for insights division
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");   
            } else {
              entry.target.classList.remove("show"); 
            }
          });
        },
        { threshold: 0.2 }
      );
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, []);


  return (
    <div  style={{backgroundColor:theme==="light"?"#222":"#fff",color:theme==="light"?"#fff":"#222"}}>
      {/* for navbar */}
      <div className='position-fixed w-100' style={{ zIndex: 1030}}>
          <Navbar></Navbar>
      </div>
      <div className='container-fluid pt-5'>
        {/* title */}
        <h3 className='mt-5'>Track Your Wealth</h3>  
      <div className='row g-4  me-1'>
        {/* for investments */}
        <div className=' col-12 col-md-8'>
          <div className={`card ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} p-3`}>
          <div className='row p-2'>
             {/* for investment column */}
             <div className='col-12 col-md-6'>

              {/* investment related details */}
              <div className='d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center'>
                <h4 >Investments</h4>
                <p>Total Profit :  <strong className='text-success'>+23393</strong></p>
              </div>
                
                <div className='mt-3'>
                  {/* list of stocks  */}
                   <ul className={`list-group shadow-sm rounded ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
                  
                  <li className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} list-group-item`}>
                    <div className="d-flex justify-content-between">
                      <h6 className="fw-bold">Nestle India</h6>
                      <span className="text-success fw-bold">+232%</span>
                    </div>
                    <small>Qty: 10 • ₹20,000 invested</small>
                    <div className="progress mt-2" style={{height: "6px"}}>
                      <div className="progress-bar bg-success" style={{width: "90%"}}></div>
                    </div>
                  </li>

                  {/* stock quatity and text */}
                  <li className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} list-group-item`}>
                    <div className="d-flex justify-content-between">
                      <h6 className="fw-bold">TCS</h6>
                      <span className="text-success fw-bold">+45%</span>
                    </div>
                    <small >Qty: 5 • ₹15,000 invested</small>
                    <div className="progress mt-2" style={{height: "6px"}}>
                      <div className="progress-bar bg-success" style={{width: "60%"}}></div>
                    </div>
                  </li>

                  
                  <li className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} list-group-item`}>
                    <div className="d-flex justify-content-between">
                      <h6 className="fw-bold">Infosys</h6>
                      <span className="text-danger fw-bold">-18%</span>
                    </div>
                    <small >Qty: 8 • ₹12,000 invested</small>
                    <div className="progress mt-2" style={{height: "6px"}}>
                      <div className="progress-bar bg-danger" style={{width: "30%"}}></div>
                    </div>
                  </li>

                  
                  <li className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} list-group-item`}>
                    <div className="d-flex justify-content-between">
                      <h6 className="fw-bold">Reliance</h6>
                      <span className="text-warning fw-bold">+8%</span>
                    </div>
                    <small >Qty: 12 • ₹25,000 invested</small>
                    <div className="progress mt-2" style={{height: "6px"}}>
                      <div className="progress-bar bg-warning" style={{width: "40%"}}></div>
                    </div>
                  </li>

                  
                  <li className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} list-group-item`}>
                    <div className="d-flex justify-content-between">
                      <h6 className="fw-bold">HDFC Bank</h6>
                      <span className="text-success fw-bold">+120%</span>
                    </div>
                    <small >Qty: 6 • ₹18,000 invested</small>
                    <div className="progress mt-2" style={{height: "6px"}}>
                      <div className="progress-bar bg-success" style={{width: "75%"}}></div>
                    </div>
                  </li>

                </ul>
                </div>
             </div>
             {/* end of stocks details */}

             {/* for assets column */}
             <div className='col-12 col-md-6'>
                 <h5 className='m-2'>Assets</h5>
                 {/* gold asset */}
                 <div className='d-flex justify-content-between'>
                   <h6 className='fs-5 mt-3 ms-3'>Gold</h6>
                      <span className="text-success fs-4 fw-bold">+330%</span>
                 </div>
                  <div>
                    <Goldchart />
                  </div>
                  {/* for silver */}
                  <div className='d-flex justify-content-between'>
                   <h6 className='fs-5 ms-3'>Silver</h6>
                      <span className="text-success fs-4 fw-bold">+120%</span>
                 </div>
                  <div>
                    <Silver />
                  </div>
             </div>

             </div>


          </div>
        </div>
        {/* for goals */}
        <div className='col-md-4 col-12'>
          <div className={`card shadow p-3  ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>

          {/* Title */}
          <h5 className=" mb-3"> Goals For This Month</h5>

          <ul className="list-group list-group-flush">

            {/* Goal 1 */}
            <li className={` ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}list-group-item d-flex justify-content-between align-items-center mt-4`}>
              <div className="d-flex align-items-center gap-2">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  style={{ transform: "scale(1.3)" }} 
                  checked 
                />
                <div>
                  <h6 className="mb-0">Buy Headphones 🎧</h6>
                  <small>₹2,000 saved of ₹2,000</small>
                </div>
              </div>
              <span className="badge bg-success">Done</span>
            </li>

            {/* Goal 2 */}
            <li className={` ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}list-group-item d-flex justify-content-between align-items-center mt-4`}>
              <div className="d-flex align-items-center gap-2">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  style={{ transform: "scale(1.3)" }} 
                />
                <div>
                  <h6 className="mb-0">New Mobile 📱</h6>
                  <small>₹10,000 / ₹25,000</small>

                  {/* Progress */}
                  <div className="progress mt-1" style={{ height: "5px" }}>
                    <div className="progress-bar bg-warning" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </div>
            </li>

            {/* Goal 3 */}
            <li className={` ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}list-group-item d-flex justify-content-between align-items-center mt-4`}>
              <div className="d-flex align-items-center gap-2">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  style={{ transform: "scale(1.3)" }} 
                />
                <div>
                  <h6 className="mb-0">Emergency Fund 💰</h6>
                  <small>₹15,000 / ₹50,000</small>

                  <div className="progress mt-1" style={{ height: "5px" }}>
                    <div className="progress-bar bg-success" style={{ width: "30%" }}></div>
                  </div>
                </div>
              </div>
            </li>
            {/* Goal 4 */}
            <li className={` ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}list-group-item d-flex justify-content-between align-items-center mt-4`}>
              <div className="d-flex align-items-center gap-2">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  style={{ transform: "scale(1.3)" }} 
                />
                <div>
                  <h6 className="mb-0">Bike Down Payment 🏍️</h6>
                  <small >₹20,000 / ₹80,000</small>

                  <div className="progress mt-1" style={{ height: "5px" }}>
                    <div className="progress-bar bg-danger" style={{ width: "25%" }}></div>
                  </div>
                </div>
              </div>
            </li>
            {/* Goal 5 */}
            <li className={` ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}list-group-item d-flex justify-content-between align-items-center mt-4`}>
              <div className="d-flex align-items-center gap-2">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  style={{ transform: "scale(1.3)" }} 
                />
                <div>
                  <h6 className="mb-0">Savings</h6>
                  <small >₹20,000 / ₹80,000</small>

                  <div className="progress mt-1" style={{ height: "5px" }}>
                    <div className="progress-bar bg-warning" style={{ width: "45%" }}></div>
                  </div>
                </div>
              </div>
            </li>

          </ul>

        </div>
      </div>
      </div>


      {/* summary */}
            
            <div className={`${theme ==="light" ?"bg-dark":"bg-white"} p-2 shadow  rounded border mt-3 `} >
              <h4 className='m-4 text-center fw-bold'>Insights</h4>
               {/* LEFT */}
                <div className='row mb-4 '>
                  <div className='col-12  col-md-6 border-end  border-dark'>
                    <div className={`p-2 shadow  rounded block border`}>
                      <h4>Savings Improvement</h4>
                      <p>You saved ₹5,000 more than last month.</p>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className='row mb-4  justify-content-md-end'>
                  <div className='col-12 col-md-6 border-start border-dark'>
                    <div className='p-2 shadow block rounded border'>
                      <h4>Expense Reduction</h4>
                      <p>You reduced your expenses by ₹3,500 this month.</p>
                    </div>
                  </div>
                </div>

                {/* LEFT */}
                <div className='row mb-4'>
                  <div className='col-12 col-md-6 border-end border-dark'>
                    <div className='p-2 shadow block rounded border'>
                      <h4>Budget Status</h4>
                      <p>You are within your monthly budget limit. Good job!</p>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className='row mb-4 justify-content-md-end'>
                  <div className='col-12 col-md-6 border-start border-dark'>
                    <div className='p-2 shadow block rounded border'>
                      <h4>Top Spending</h4>
                      <p>Food category had the highest expense of ₹6,200.</p>
                    </div>
                  </div>
                </div>

                {/* LEFT */}
                <div className='row mb-4'>
                  <div className='col-12 col-md-6 border-end border-dark'>
                    <div className='p-2 shadow block rounded border'>
                      <h4>Investment Growth</h4>
                      <p>Your investments grew by 12% this month.</p>
                    </div>
                  </div>
                </div>


         
              <div className='row mb-4 justify-content-md-end'>
          <div className='col-12 col-md-6 border-start border-dark'>
            <div className='p-2 shadow block rounded border'>
              <h4>Pending Payments</h4>
              <p>You have 3 pending transactions to complete.</p>
            </div>
          </div>
        </div>
        {/* end of insight section */}

      </div>

      </div>
      
      </div>
  )
}

export default Analytics
