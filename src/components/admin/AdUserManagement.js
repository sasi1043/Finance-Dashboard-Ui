import React, { useEffect, useState } from 'react'
import Navbar from '../pages/Navbar'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButton } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '../context/ThemeContext';

function AdUserManagement() {

  const{theme} = useTheme()

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteruser, setFilteruser] = useState([]);

  // menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // edit
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    role: "",
    lastlogin: "",
    status: ""
  });

  // fetch users
  useEffect(() => {
    fetch("https://69d379a1336103955f8f0753.mockapi.io/finance/backend/users")
      .then(res => res.json())
      .then(res => {
        setUsers(res);
        setFilteruser(res);
      });
  }, []);

  // search
  useEffect(() => {
    let updated = [...users];

    if (search.trim() !== "") {
      updated = updated.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.status?.toLowerCase().includes(search.toLowerCase()) ||
        p.role?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteruser(updated);
  }, [search, users]);

  // counts for cards
  const total = users.length;
  const active = users.filter(p => p.status === "active").length;
  const inactive = users.filter(p => p.status === "inactive").length;
  const admins = users.filter(p => p.role === "admin").length;

  // filter
  function handlefilter(val) {
    if (val === "all user") setFilteruser(users);
    else if (val === "active") setFilteruser(users.filter(p => p.status === "active"));
    else if (val === "inactive") setFilteruser(users.filter(p => p.status === "inactive"));
    else if (val === "admins") setFilteruser(users.filter(p => p.role === "admin"));
    else if (val === "users") setFilteruser(users.filter(p => p.role === "user"));
  }

  // sort
  function handlesort(type) {
    const sorted = [...filteruser].sort((a, b) =>
      type === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setFilteruser(sorted);
  }

  // menu handlers
  const handleClick = (e, user) => {
    setAnchorEl(e.currentTarget);
    setSelectedUser(user);
  };

  const handleClose = () => setAnchorEl(null);

  // edit
  function startEdit(p) {
    setEditId(p.id);
    setEditForm({
      name: p.name,
      role: p.role,
      lastlogin: p.lastlogin,
      status: p.status
    });
  }

  function cancelEdit() {
    setEditId(null);
  }

  async function saveEdit(id) {
    const res = await fetch(`https://69d379a1336103955f8f0753.mockapi.io/finance/backend/users${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm)
    });

    const data = await res.json();

    const updated = users.map(p => p.id === id ? data : p);
    setUsers(updated);
    setFilteruser(updated);
    setEditId(null);
  }

  // delete
  async function remove(id) {
    await fetch(`https://69d379a1336103955f8f0753.mockapi.io/finance/backend/users${id}`, {
      method: "DELETE"
    });

    setUsers(prev => prev.filter(p => p.id !== id));
    setFilteruser(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div className='min-vh-100' style={{backgroundColor:theme==="light"?"#222":"#fff",color:theme==="light"?"#fff":"#222"}}>

      {/* Navbar */}
      <div className='position-fixed w-100' style={{ zIndex: 1030 }}>
        <Navbar />
      </div>

      <div className='container pt-5 '>

        <div className='pt-5'>
          <h2 className='mt-3'>Manage Users</h2>
        </div>

        {/* cards  */}
        <div className="row mt-4 mb-4 g-3" >
          <div className="col-12 col-sm-6 col-md-3">
            <div className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} box card h-100 p-3 text-center`}>
              <strong>Total Users</strong>
              <h4>{total}</h4>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} box card h-100 p-3 text-center`}>
              <strong>Active Users</strong>
              <h4>{active}</h4>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} box card h-100 p-3 text-center`}>
              <strong>Inactive Users</strong>
              <h4>{inactive}</h4>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} box card h-100 p-3 text-center`}>
              <strong>Admins</strong>
              <h4>{admins}</h4>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className={`${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"} shadow card p-3`}>

          {/* controls */}
          <div className='row mb-3'>
            <div className='col-md-6'>
              <input
          className={`form-control ${theme === "light" ? "bg-dark text-light input-light" : "bg-white text-dark input-dark"}`}
          placeholder="Search Transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
            </div>

            <div className='col-md-6 col-12 gy-2 d-flex justify-content-end gap-3'>
              <select onChange={(e) => handlefilter(e.target.value)} className={`form-select w-50 ${theme === "light" ? "bg-dark text-light" : "bg-white text-dark"}`}>
                <option value="all user">All Users</option>
                <option value="admins">Admins</option>
                <option value="users">Users</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <div>
                <span className='fw-bold'>Sort</span>
                <IconButton onClick={() => handlesort("asc")} className={`${theme ==="light"? 'text-white':'test-white'}`}>
                  <ArrowUpwardIcon  />
                </IconButton >
                <IconButton className={`${theme ==="light"? 'text-white':'test-white'}`} onClick={() => handlesort("desc")}>
                  <ArrowDownwardIcon />
                </IconButton>
              </div>
            </div>
          </div>

          {/* table */}
          <div className="table-responsive">
            <table className={` ${theme === "light" ? "table-dark" : "table"} table table-hover table-md mt-2`}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Last Active</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteruser.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteruser.map((item) => (
                    <tr key={item.id}>
                      {editId === item.id ? (
                        <>
                          <td>{item.id}</td>
                          <td>
                            <input
                              className='form-control'
                              value={editForm.name}
                              onChange={(e) =>
                                setEditForm({ ...editForm, name: e.target.value })
                              }
                            />
                          </td>
                          <td>
                            <input
                              className='form-control'
                              value={editForm.role}
                              onChange={(e) =>
                                setEditForm({ ...editForm, role: e.target.value })
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              className='form-control'
                              value={editForm.lastlogin?.slice(0, 10)}
                              onChange={(e) =>
                                setEditForm({ ...editForm, lastlogin: e.target.value })
                              }
                            />
                          </td>
                          <td>
                            <select
                              className="form-select"
                              value={editForm.status}
                              onChange={(e) =>
                                setEditForm({ ...editForm, status: e.target.value })
                              }
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </td>
                          <td>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => saveEdit(item.id)}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={cancelEdit}
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.role}</td>
                          <td>{item.lastlogin}</td>
                          <td>{item.status}</td>
                          <td>
                            <MoreVertIcon
                              style={{ cursor: "pointer" }}
                              onClick={(e) => handleClick(e, item)}
                            />

                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl) && selectedUser?.id === item.id}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={() => { startEdit(item); handleClose(); }}>
                                Edit
                              </MenuItem>
                              <MenuItem onClick={() => { remove(selectedUser.id); handleClose(); }}>
                                Delete
                              </MenuItem>
                            </Menu>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdUserManagement