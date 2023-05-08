import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "./createprofile.css"

import axios from "axios";

const CreateProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state;

  const [firstName, setFirstName] = useState(user !== null ? user.firstName : "");
  const [lastName, setLastName] = useState(user !== null ? user.lastName : "");
  const [gender, setGender] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [contact, setContact] = useState(user !== null ? user.email : "")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios.get("/auth/user", { withCredentials: true });
      } catch (error) {
        navigate("/");
      }
    }
    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDetails = {
      firstName,
      lastName,
      gender: gender !== "" ? gender : "male",
      university,
      major,
      city,
      state,
      startDate,
      endDate,
      hobbies,
      contact,
    };

    try {
      await axios.patch(`/users/${user.id}`, userDetails);
      navigate("/landing")
    } catch (error) {
      console.error("Error: ", error)
    }
  };

  return (
    <div className="create-profile-container">
      <div className="profile-page">
        <div className="navbar-logo-newuser">
          <h2>r/s</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="profile-panel" style={{ marginBottom: "3rem" }}>
            <h2 style={{ marginTop: "2rem" }}>Create Profile</h2>
            <div className="profile-personal-info">
              <p><label htmlFor="fname">First Name</label></p>
              <p> <input type="text" id="fname" name="fname" minLength="2" maxLength="50" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input></p>
              <p><label htmlFor="lname">Last Name</label></p>
              <p><input type="text" id="lname" name="lname" minLength="2" maxLength="50" value={lastName} onChange={(e) => setLastName(e.target.value)}></input></p>
              <p><label htmlFor="gender">Gender</label></p>
              <p>
                <select id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-Binary</option>
                  <option value="transgender">Transgender</option>
                  <option value="other">Other</option>
                </select>
              </p>
            </div>

            <h3 className="clgandintern-info" style={{ marginTop: "2rem" }}>-College and Internship Information-</h3>

            <div className="profile-questions-p2">
              <p> <label htmlFor="unicollege">University Name</label>
                <input type="text" id="unicollname" name="unicollname" minLength="2" maxLength="100" value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="i.e. San Jose State University" required></input> </p>
              <p><label htmlFor="major">Major</label>
                <input type="text" id="major" name="major" minLength="2" maxLength="50" value={major} onChange={(e) => setMajor(e.target.value)} placeholder="i.e. Design" required></input></p>
              <p><label htmlFor="internloc">Internship City</label>
                <input type="text" id="intern-loc-city" name="intern-loc-city" minLength="2" maxLength="50" value={city} onChange={(e) => setCity(e.target.value)} placeholder="i.e. San Jose" required></input> </p>
              <p><label htmlFor="internloc">Internship State</label>
                <input type="text" id="intern-loc-state" name="intern-loc-state" minLength="2" maxLength="2" value={state} onChange={(e) => setState(e.target.value)} placeholder="i.e. CA" required></input> </p>
              <p className="dates-input"><label htmlFor="startdate">Start Date</label>
                <input type="date" id="start-date" name="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="MM/DD/YY" required></input></p>
              <p className="dates-input"><label htmlFor="enddate">End Date</label>
                <input type="date" id="end-date" name="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="MM/DD/YY" required></input></p>
              <p><label htmlFor="hobbies">Hobbies</label>
                <input type="text" id="hobbies" name="hobbies" value={hobbies} onChange={(e) => setHobbies(e.target.value)} placeholder="List any hobbies here!" required></input></p>
              <p><label htmlFor="contact">Contact Details</label>
                <input type="text" id="contact" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} required></input></p>
              <div className="submit-btn-div">
                <button className="submit-btn" type="submit" style={{ marginBottom: "2rem" }}>submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProfile;