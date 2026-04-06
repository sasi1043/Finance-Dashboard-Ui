import React, { useEffect } from 'react'
import Navbar from '../pages/Navbar'
import Silver from '../charts/Silver'
import Goldchart from '../charts/Goldchart'
import { useTheme } from '../context/ThemeContext';

function AdAnalytics() {

  const {theme} = useTheme();
  useEffect(() => {
    const elements = document.querySelectorAll(".block");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");   // animate IN
          } else {
            entry.target.classList.remove("show"); // animate OUT (reset)
          }
        });
      },
      { threshold: 0.2 }
    );
  
    elements.forEach((el) => observer.observe(el));
  
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{backgroundColor:theme==="light"?"#222":"#fff",color:theme==="light"?"#fff":"#222"}}>
      <div className='position-fixed w-100' style={{ zIndex: 1030}}>
        <Navbar></Navbar>
      </div>
        
      <div className='container-fluid pt-5'>
        <h3 className='mt-5'>Track Your Wealth</h3>
      <div className='row g-4 mt-1 me-1'>
        {/* for investments */}
        <div className='col-12 col-md-8'>
          <div className={`card ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} p-3`}>
          <div className='row  p-3'>
             {/* for investment column */}
             <div className='col-md-6  mt-2'>
              <div className='d-flex justify-content-between'>
                <h4  className='fs-5 fs-md-5 fs-lg-4'>Total Investments</h4>
                <p>Total Profit :  <strong className='text-success'>+23393</strong></p>
              </div>
                
                <strong className='mt-3'>Top performing Stocks</strong>
                <div className='mt-1'>
                  {/* list of stocks  */}
                   <ul className="list-group shadow-sm rounded">
                  
                  <li className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} list-group-item`}>
                    <div className="d-flex justify-content-between">
                      <h6 className="fw-bold">Reliance Industries</h6>
                      <span className="text-success fw-bold">+232%</span>
                    </div>
                    <small>Total investments • ₹20,00,000 invested</small>
                    <div className="progress mt-2" style={{height: "6px"}}>
                      <div className="progress-bar bg-success" style={{width: "90%"}}></div>
                    </div>
                  </li>

                  
                  <li className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} list-group-item`}>
                    <div className="d-flex justify-content-between">
                      <h6 className="fw-bold">HDFC Bank</h6>
                      <span className="text-success fw-bold">+145%</span>
                    </div>
                    <small >Total investments • ₹5,00,00,000 invested</small>
                    <div className="progress mt-2" style={{height: "6px"}}>
                      <div className="progress-bar bg-success" style={{width: "60%"}}></div>
                    </div>
                  </li>

                  
                  <li className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} list-group-item`}>
                    <div className="d-flex justify-content-between">
                      <h6 className="fw-bold">ICICI  Bank Ltd</h6>
                      <span className="text-success fw-bold">+200</span>
                    </div>
                    <small >Total investments • ₹80,00,00,000 invested</small>
                    <div className="progress mt-2" style={{height: "6px"}}>
                      <div className="progress-bar bg-success" style={{width: "70%"}}></div>
                    </div>
                  </li>

                  
                  <li className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} list-group-item`}>
                    <div className="d-flex justify-content-between">
                      <h6 className="fw-bold">Tata Steel Ltd</h6>
                      <span className="text-success fw-bold">+150%</span>
                    </div>
                    <small >Total investments • ₹10,00,00,000 invested</small>
                    <div className="progress mt-2" style={{height: "6px"}}>
                      <div className="progress-bar bg-success" style={{width: "50%"}}></div>
                    </div>
                  </li>

                  
                  <li className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} list-group-item`}>
                    <div className="d-flex justify-content-between">
                      <h6 className="fw-bold">Tata Motors</h6>
                      <span className="text-success fw-bold">+120%</span>
                    </div>
                    <small >Total investments • ₹70,00,00,000 invested</small>
                    <div className="progress mt-2" style={{height: "6px"}}>
                      <div className="progress-bar bg-success" style={{width: "75%"}}></div>
                    </div>
                  </li>

                </ul>
                </div>
             </div>

             {/* for assets column */}
             <div className='col-md-6'>
                 <h5 className='m-2'>Assets</h5>
                 <div className='d-flex justify-content-between'>
                   <h6 className='fs-5 mt-3 ms-3'>Gold</h6>
                   <div>
                      <span className="text-success fs-4 fw-bold">+330%</span>
                      <p className='text-success '>Yearly returns</p>
                    </div>                      
                 </div>
                  <div>
                    <Goldchart />
                  </div>
                  <div className='d-flex justify-content-between'>
                   <h6 className='fs-5 ms-3'>Silver</h6>
                      <div>
                      <span className="text-success fs-4 fw-bold">+150%</span>
                      <p className='text-success '>Yearly returns</p>
                    </div>  
                 </div>
                  <div>
                    <Silver />
                  </div>
             </div>

             </div>


          </div>
        </div>
        {/* for goals */}
        <div className="col-md-4">
         <div className={`card shadow p-3  ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>

          {/* Title */}
          <h5 className=" mb-3"> Goals For This Month</h5>

          <ul className="list-group list-group-flush">
            {/* Insight 1 */}
            <li className={` ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}list-group-item d-flex justify-content-between align-items-center mt-4`}>
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" className="form-check-input" style={{ transform: "scale(1.3)" }} checked />
                <div>
                  <h6 className="mb-0">User Growth Target 👥</h6>
                  <small >50,000 / 50,000 users reached</small>
                </div>
              </div>
              <span className="badge bg-success">Completed</span>
            </li>

            {/* Insight 2 */}
            <li className={` ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}list-group-item d-flex justify-content-between align-items-center mt-4`}>
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" className="form-check-input" style={{ transform: "scale(1.3)" }} />
                <div>
                  <h6 className="mb-0">Monthly Transactions 📊</h6>
                  <small >12,000 / 20,000</small>

                  <div className="progress mt-1" style={{ height: "5px" }}>
                    <div className="progress-bar bg-warning" style={{ width: "60%" }}></div>
                  </div>
                </div>
              </div>
            </li>

            {/* Insight 3 */}
            <li className={` ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}list-group-item d-flex justify-content-between align-items-center mt-4`}>
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" className="form-check-input" style={{ transform: "scale(1.3)" }} />
                <div>
                  <h6 className="mb-0">Revenue Target 💰</h6>
                  <small >₹8,00,000 / ₹10,00,000</small>

                  <div className="progress mt-1" style={{ height: "5px" }}>
                    <div className="progress-bar bg-success" style={{ width: "80%" }}></div>
                  </div>
                </div>
              </div>
            </li>

            {/* Insight 4 */}
            <li className={` ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}list-group-item d-flex justify-content-between align-items-center mt-4`}>
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" className="form-check-input" style={{ transform: "scale(1.3)" }} />
                <div>
                  <h6 className="mb-0">Active Users Ratio 📈</h6>
                  <small >65% / 80%</small>

                  <div className="progress mt-1" style={{ height: "5px" }}>
                    <div className="progress-bar bg-info" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </div>
            </li>

            {/* Insight 5 */}
            <li className={` ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}list-group-item d-flex justify-content-between align-items-center mt-4`}>
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" className="form-check-input" style={{ transform: "scale(1.3)" }} />
                <div>
                  <h6 className="mb-0">System Expense Control 📉</h6>
                  <small >₹3,00,000 / ₹5,00,000</small>

                  <div className="progress mt-1" style={{ height: "5px" }}>
                    <div className="progress-bar bg-danger" style={{ width: "60%" }}></div>
                  </div>
                </div>
              </div>
            </li>

          </ul>

        </div>
      </div>
      </div>


      {/* summary */}
            <div className={`${theme ==="light" ?"bg-dark":"bg-white"} p-2 shadow  rounded border mt-3`}>
              <h3 className='text-center my-4'>Insights</h3>
               {/* LEFT */}
                <div className='row mb-4'>
                  <div className='col-12 col-md-6 border-end border-dark'>
                    <div className='p-2 shadow block rounded border'>
                      <h4>Users growth</h4>
                      <p>Total users increased by 20% compared to last month, showing a positive earning trend.</p>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className='row mb-4 justify-content-md-end'>
                  <div className='col-12 col-md-6 border-start border-dark'>
                    <div className='p-2 shadow block rounded border'>
                      <h4>Expense Control</h4>
                      <p>Operational expenses reduced by ₹50,000, improving overall efficiency.</p>
                    </div>
                  </div>
                </div>

                {/* LEFT */}
                <div className='row mb-4'>
                  <div className='col-12 col-md-6 border-end border-dark'>
                    <div className='p-2 shadow block rounded border'>
                      <h4>Transaction Volume</h4>
                      <p>Transaction count reached 18,500, indicating high user engagement across the platform.</p>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className='row mb-4 justify-content-md-end'>
                  <div className='col-12 col-md-6 border-start border-dark'>
                    <div className='p-2 shadow block rounded border'>
                      <h4>Revenue Growth</h4>
                      <p>Total revenue increased by ₹1,20,000 compared to last month, reflecting improved financial performance.</p>
                    </div>
                  </div>
                </div>

                {/* LEFT */}
                <div className='row mb-4'>
                  <div className='col-12 col-md-6 border-end border-dark'>
                    <div className='p-2 shadow block rounded border'>
                      <h4>Active Users</h4>
                      <p>65% of registered users are actively using the platform, showing strong retention.</p>
                    </div>
                  </div>
                </div>


         
              <div className='row mb-4 justify-content-md-end'>
          <div className='col-12 col-md-6 border-start border-dark'>
            <div className='p-2 shadow block rounded border'>
              <h4>System Performance</h4>
              <p>Platform uptime remained at 99.9%, ensuring a smooth and reliable user experience.</p>
            </div>
          </div>
        </div>

      </div>



      </div>
    </div>
  )
}

export default AdAnalytics
