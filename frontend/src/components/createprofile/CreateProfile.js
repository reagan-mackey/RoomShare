import React from 'react'
import "./createprofile.css"

const CreateProfile = () => {
 function submitFields(){
    document.getElementById("form1").submit();
    document.getElementById("form2").submit();
  }
  return (
    <div className="profile-page">
      <div className= "navbar-logo">
        <h2>r/s</h2>
      </div>
      <div className="profile-panel">
        <h2>Create Profile</h2>
        <div className="profile-questions">
          <div className="profile-pic">

          </div>
          <div className="profile-personal-info">
            <form id="form1">
              <p><label for="fname">First Name</label></p>
              <p> <input type="text" id="fname" name="fname"></input></p>
              <p><label for="lname">Last Name</label></p>
              <p><input type="text" id="lname" name="lname"></input></p>
              <p><label for="gender">Gender</label></p>
              <p>
                <select id="gender" name="gender" required>  
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-Binary</option>
                  <option value="transgender">Transgender</option>
                  <option value="other">Other</option>
                </select>
              </p>
            </form>
          </div>
        </div>

        <h3 className="clgandintern-info">-College and Internship Information-</h3>

        <div className="profile-questions-p2">
          <form id="form2">
            <p> <label for="unicollege">University/College Name</label>
            <input type="text" id="unicollname" name="unicollname" placeholder="i.e. San Jose State University" required></input> </p>
            <p><label for="major">Major</label>
            <input type="text" id="major" name="major" placeholder="i.e. Design" required></input></p>
            <p><label for="internloc">Intern Location</label>
            <input type="text" id="intern-loc" name="intern-loc" placeholder="City, State Abv." required></input> </p>
            <p className="dates-input"><label for="startdate">Start Date</label>
            <input type="date" id="start-date" name="start-date" placeholder="MM/DD/YY" required></input></p>
            <p className="dates-input"><label for="enddate">End Date</label>
            <input type="date" id="end-date" name="end-date" placeholder="MM/DD/YY" required></input></p>
            <p><label for="hobbies">Hobbies</label>
            <input type="text" id="hobbies" name="hobbies" placeholder="List any hobbies here!" required></input></p>
          </form>

          <div className="submit-btn-div">
            <button onClick={submitFields} className="submit-btn" type="submit">submit</button>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default CreateProfile;