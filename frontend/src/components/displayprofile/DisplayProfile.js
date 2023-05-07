import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "./displayprofile.css"

import axios from "axios";

const DisplayProfile = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                await axios.get("/auth/user", { withCredentials: true });
            } catch (error) {
                navigate("/");
            }
        }
        fetchCurrentUser();
    }, [navigate]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/users/${id}`);
                console.log(response.data)
                setUser(response.data.user);
                setIsLoading(false);
            } catch (error) {
                console.error("Error: ", error);
                setIsLoading(false);
            }
        }
        fetchUser();
    }, [id]);

    const handleLogout = () => {
        try {
            axios.get("/auth/logout");
            navigate("/")
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const handleClick = () => {
        navigate(-1);
    }

    const formatDate = (date) => {
        const [year, month, day] = date.split("T")[0].split("-");

        return `${month}/${day}/${year}`;
    };

    if (isLoading) {
        return <>
            <div className="navbar">
                <div className="navbar-logo">
                    <h2>r/s</h2>
                </div>
                <div className="navbar-logout-button">
                    <button onClick={handleLogout}>log out</button>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}><CircularProgress /></div>
        </>
    }

    return (
        <div className="App">
            <div className="display-profile-page">
                <div className="navbar">
                    <div className="navbar-logo">
                        <h2>r/s</h2>
                    </div>
                    <div className="navbar-logout-button">
                        <button onClick={handleLogout}>log out</button>
                    </div>
                </div>
                <div className="profile-card-panel">
                    <div className="user-name">
                        <h2>{user.firstName}</h2>
                        <h2>{user.lastName}</h2>
                    </div>
                    <div className="user-info">
                        <p><em>Gender: </em>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</p>
                        <p><em>University/College: </em>{user.university}</p>
                        <p><em>Major: </em>{user.major}</p>
                        <p><em>Intern Location: </em>{user.city}, {user.state}</p>
                        <p><em>Start Date: </em>{formatDate(user.startDate)}</p>
                        <p><em>End Date: </em>{formatDate(user.endDate)}</p>
                        <p><em>Hobbies: </em>{user.hobbies}</p>
                        <p style={{ marginBottom: "1rem" }}><em>Contact: </em>{user.email}</p>
                    </div>
                </div>

                <div className="back-btn-div">
                    <button onClick={handleClick} className="back-btn">back</button>
                </div>
            </div>
        </div>
    );
}

export default DisplayProfile