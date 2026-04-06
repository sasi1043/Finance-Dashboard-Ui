import { IconButton } from '@mui/material';
import  {  useState } from 'react'
// for theme icon
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Navbar() {

      // initializing theme constant
      const {theme,toggletheme} = useTheme()
      
      //storing current role
      const [role , setRole] = useState(localStorage.getItem("role"));
      
      // declaring navigate constant
      const navigate = useNavigate();

      // role based pages details for user and admin
      const NavPage = {
        user :{
            features :[
              {label:"Home",path:"/"},
              {label:"Transactions" , path:"/user/transacion"},
              {label: "Wealth Tracker" , path:"/user/analytics"},
            ]
        },
        admin :{
          features:[
              {label:"Home",path:"/admin/home"},
              {label:"Transactions" , path:"/admin/transacion"},
              {label: "Analytics" , path:"/admin/analytics"},
              {label: "User Management" , path:"/admin/usermanagement"}
          ]
        }
      }
      
      // function for changing role
      function handlerole() {
        const newRole = role === "user" ? "admin" : "user";
        localStorage.setItem("role", newRole);
        setRole(localStorage.getItem("role"));
        navigate(NavPage[newRole]?.features?.[0]?.path);    
      }

  return (
           <>
           {/* navbar div */}
            <nav className="navbar m-3 navbar-dark rounded-pill px-3" style={{backgroundColor:theme==="light"?"#fff":"#222",color:theme==="light"?"#222":"#fff"}}>
          {/* title  */}
          <span className="navbar-brand fw-bold" style={{backgroundColor:theme==="light"?"#fff":"#222",color:theme==="light"?"#222":"#fff"}} >Finance UI</span>

          {/* navbar pages*/}
          <div className="d-none d-lg-flex justify-content-center  gap-3 mx-auto" >
            {NavPage[role]?.features.map((item) => (
              // page as button
              <button
                key={item.label}
                className="btn  btn-outline-light rounded-pill mx-1 shadow-white" 
                style={{backgroundColor:theme==="light"?"#222":"#fff",color:theme==="light"?"#fff":"#222"}}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-2 ms-auto">

            {/* Theme */}
            <IconButton title='theme' onClick={toggletheme}>
              <DarkModeIcon  color="primary" />
            </IconButton>

            {/* Role Toggle */}
            <IconButton onClick={handlerole}>
              {role === "admin" ? (
                <ToggleOnOutlinedIcon color="info" />
              ) : (
                <ToggleOffOutlinedIcon color="info" />
              )}
            </IconButton>

            {/* Role */}
            <strong className="fw-bold fs-5 text-capitalize d-none d-sm-inline">
              {role}
            </strong>

            {/*toggle Button  for right menu*/}
            <button className={`btn d-lg-none ${ theme === "light" ? "btn-light text-dark" : "btn-dark text-white"  }`}
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu">  ☰ </button>
          </div>
        </nav>

        {/* Right Side Sliding Menu */}
        <div
          className="offcanvas offcanvas-end bg-dark text-white"
          id="mobileMenu"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
             
          {/* displaying pages and for navigation */}
          <div className="offcanvas-body">
            {NavPage[role]?.features.map((item) => (
              <button
                key={item.label}
                className="btn btn-outline-light w-100 mb-2 rounded-pill"
                onClick={() => navigate(item.path)}
                data-bs-dismiss="offcanvas"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        </>
  )
}

export default Navbar
