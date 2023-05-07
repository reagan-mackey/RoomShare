import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Container, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";

import axios from "axios";

const Search = () => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const city = searchParams.get("city");
    const state = searchParams.get("state");
    const gender = searchParams.get("gender");
    const major = searchParams.get("major");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

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

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(
                    `/users/search?city=${city || ""}&state=${state || ""}&gender=${gender || ""}&major=${major || ""}&startDate=${startDate || ""}&endDate=${endDate || ""}`
                );
                setResults(response.data.users);
                setIsLoading(false);
            } catch (error) {
                console.error("Error: ", error);
                setIsLoading(false);
            }
        };
        fetchResults();
    }, [city, state, gender, major, startDate, endDate]);

    const handleClick = () => {
        navigate("/landing");
    }

    const handleLogout = () => {
        try {
            axios.get("/auth/logout");
            navigate("/")
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const formatDate = (date) => {
        const [year, month, day] = date.split("T")[0].split("-");

        return `${month}/${day}/${year}`;
    };

    if (isLoading) {
        return <>
            <div className="navbar">
                <div className="navbar-logo">
                    <Link to="/landing" style={{ textDecoration: "none" }}>
                        <h2>r/s</h2>
                    </Link>
                </div>
                <div className="navbar-logout-button">
                    <button onClick={handleLogout}>log out</button>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}><CircularProgress /></div>
        </>
    }

    return (
        <>
            <div className="navbar">
                <div className="navbar-logo">
                    <Link to="/landing" style={{ textDecoration: "none" }}>
                        <h2>r/s</h2>
                    </Link>
                </div>
                <div className="navbar-logout-button">
                    <button onClick={handleLogout}>log out</button>
                </div>
            </div>
            <Container maxWidth="xl">
                {results.length === 0 && <p style={{ textAlign: "center", marginTop: "5rem" }}>Sorry, no users matched your search.</p>}
                <Grid container spacing={2} sx={{ mt: "3rem" }}>
                    {results.map((user, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4} lg={3} >
                            <Link
                                to={`/profile/${user.id}`}
                                key={user.id}
                                style={{ textDecoration: "none" }}
                            >
                                <Card elevation={2} style={{ textAlign: "center", height: "250px", display: "flex", flexDirection: "column", justifyContent: "center", border: "3px solid", borderImageSlice: "1", borderImageSource: "linear-gradient(to bottom right, #7F4FE7, #C651E3)" }}>
                                    <CardContent>
                                        <Typography variant="h5" sx={{ fontFamily: "Public Sans, sans-serif" }}>{user.firstName} {user.lastName}</Typography>
                                        {user.gender && <Typography variant="subtitle1" sx={{ fontFamily: "Public Sans, sans-serif", fontWeight: "bold" }}>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</Typography>}
                                        {user.major && <Typography variant="subtitle1" sx={{ fontFamily: "Public Sans, sans-serif", fontWeight: "bold" }}>Major: {user.major}</Typography>}
                                        {user.city && user.state && <Typography variant="subtitle1" sx={{ fontFamily: "Public Sans, sans-serif", fontWeight: "bold" }}>
                                            Location: {user.city}, {user.state}
                                        </Typography>}
                                        {<Typography variant="subtitle1" sx={{ fontFamily: "Public Sans, sans-serif", fontWeight: "bold" }}>
                                            {user.startDate && formatDate(user.startDate)} - {user.endDate && formatDate(user.endDate)}
                                        </Typography>}
                                        {user.email && <Typography variant="subtitle1" sx={{ fontFamily: "Public Sans, sans-serif", fontWeight: "bold", color: "#7F4FE7" }}>{user.email}</Typography>}
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
                <button className="back-btn" onClick={handleClick} style={{ marginTop: "1rem", marginBottom: "1rem" }}>back</button>
            </Container>
        </>
    );
};

export default Search;
