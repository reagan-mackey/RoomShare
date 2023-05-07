import React, { useState, useEffect } from 'react'
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "./landingpage.css"
import { useNavigate, Link } from "react-router-dom";

import axios from "axios"

const LandingPage = () => {
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [gender, setGender] = useState("");
    const [major, setMajor] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const searchParams = new URLSearchParams();

    searchParams.set("city", city);
    searchParams.set("state", state);
    searchParams.set("gender", gender);
    searchParams.set("major", major);
    searchParams.set("startDate", startDate);
    searchParams.set("endDate", endDate);

    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            axios.get("/auth/logout");
            navigate("/")
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/auth/user", { withCredentials: true });

                if (!response.data.user.city || !response.data.user.state || !response.data.user.gender || !response.data.user.major || !response.data.user.startDate || !response.data.user.endDate) {
                    navigate("/create-profile", { state: response.data.user });
                }

            } catch (error) {
                navigate("/");
            }
        }
        fetchUser();
    }, [navigate]);


    return (
        <div className="landing-page">
            <div className="navbar-landing">
                <div className="navbar-logo">
                    <h2>r/s</h2>
                </div>
                <div className="navbar-logout-button">
                    <button onClick={handleLogout}>log out</button>
                </div>
            </div>
            <div className="main-body-landing">
                <div className="main-message-landing">
                    <h1 className="main-msg-regular-landing">search for your</h1>
                    <h1 className="main-msg-gradient-landing">new</h1>
                    <h1 className="main-msg-regular-landing">roommate</h1>
                </div>
            </div>
            <div className="search-form">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="City" fullWidth value={city} onChange={(e) => setCity(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="State" fullWidth value={state} onChange={(e) => setState(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select labelId="gender-label" id="gender-select" label="Gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                                <MenuItem value={"non-binary"}>Non-Binary</MenuItem>
                                <MenuItem value={"transgender"}>Transgender</MenuItem>
                                <MenuItem value={"other"}>Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Major" fullWidth value={major} onChange={(e) => setMajor(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Start Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="End Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <div className="search-button-div">
                            <Link
                                to={{
                                    pathname: "/search",
                                    search: searchParams.toString(),
                                }}
                            >
                                <button className="search-button">search</button>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default LandingPage;