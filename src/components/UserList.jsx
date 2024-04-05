import React, { useState } from "react";
import "./UserList.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Button from "@mui/material/Button";
import image from "../download.jpg";

const UserList = ({ users, setUsers }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [saveEnabled, setSaveEnabled] = useState(false);

  const handleSearch = event => {
    setSearchQuery(event.target.value.toLowerCase());
    setExpandedUserId(null); // Collapse all accordions when searching
  };

  const filteredUsers = users.filter(
    user =>
      user.first.toLowerCase().includes(searchQuery) ||
      user.last.toLowerCase().includes(searchQuery)
  );

  const toggleAccordion = userId => {
    if (!editMode) {
      // Allow toggling accordion only if not in edit mode
      if (expandedUserId === userId) {
        setExpandedUserId(null); // Collapse if already expanded
      } else {
        setExpandedUserId(userId); // Expand if collapsed
      }
    }
  };

  const handleEdit = user => {
    if (calculateAge(user.dob) > 18) {
      setEditMode(true);
      setEditedUser({ ...user });
      setExpandedUserId(user.id);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prevUser => ({ ...prevUser, [field]: value }));
    setSaveEnabled(true); // Enable save button when any field is changed
  };

  const handleSave = () => {
    // Validate edited user data
    if (!editedUser || !editedUser.description.trim()) {
      alert("All fields must be filled.");
      return;
    }

    // Update user data
    const updatedUsers = users.map(user =>
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(updatedUsers);

    // Reset states
    setEditedUser(null);
    setEditMode(false);
    setSaveEnabled(false);
    setExpandedUserId(null);
  };

  const handleCancel = () => {
    setEditedUser(null);
    setEditMode(false);
    setSaveEnabled(false);
    setExpandedUserId(null);
  };

  const calculateAge = dob => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleDelete = userId => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
    }
  };

  return (
    <div className="accordion">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by name"
      />
      {filteredUsers.map(user => (
        <Accordion
          className="box"
          key={user.id}
          expanded={expandedUserId === user.id}
          onChange={() => toggleAccordion(user.id)}
        >
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography className="name">
              <img src={image} alt="" />
              {user.first} {user.last}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="details">
              <div className="top">
                <div className="a">
                  <span className="b">Age</span>
                  <span className="c">{calculateAge(user.dob)} years</span>
                </div>
                <div className="a">
                  <span className="b">Gender</span>
                  {editMode && editedUser && editedUser.id === user.id ? (
                    <select
                      value={editedUser.gender}
                      onChange={e =>
                        handleInputChange("gender", e.target.value)
                      }
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="female">Transgender</option>
                      <option value="female">Rather not say</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <span className="c">{user.gender}</span>
                  )}
                </div>
                <div className="a">
                  <span className="b">Country</span>
                  <span className="c">{user.country}</span>
                </div>
              </div>

              <div className="middle">
                <span className="b">Description</span>
                {editMode && editedUser && editedUser.id === user.id ? (
                  <textarea
                    value={editedUser.description}
                    onChange={e =>
                      handleInputChange("description", e.target.value)
                    }
                  />
                ) : (
                  <span className="c">{user.description}</span>
                )}
              </div>
              <div className="btn">
                {editMode && editedUser && editedUser.id === user.id ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!saveEnabled}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button variant="contained" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(user)}
                      disabled={calculateAge(user.dob) <= 18}
                    >
                      Edit
                    </Button>
                    <button
                      className="del"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default UserList;
