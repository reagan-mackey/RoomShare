import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Container, Grid, Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";

import axios from "axios";

const Search = () => {
    const [results, setResults] = useState([]);
    const [searchParams] = useSearchParams();

    const city = searchParams.get("city");
    const state = searchParams.get("state");
    const gender = searchParams.get("gender");
    const major = searchParams.get("major");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(
                    `/users/search?city=${city || ""}&state=${state || ""}&gender=${gender || ""}&major=${major || ""}&startDate=${startDate || ""}&endDate=${endDate || ""}`
                );
                setResults(response.data.users);
            } catch (error) {
                console.log("Error: ", error);
            }
        };
        fetchResults();
    }, [city, state, gender, major, startDate, endDate]);

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2} sx={{ mt: "3rem" }}>
                {results.map((user, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={3} >
                        <Link
                            to={`/profile/${user.id}`}
                            key={user.id}
                            style={{ textDecoration: "none" }}
                        >
                            <Card elevation={2} style={{ textAlign: "center", height: "200px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <CardContent>
                                    <Typography variant="h5">{user.firstName} {user.lastName}</Typography>
                                    {user.major && <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>Major: {user.major}</Typography>}
                                    {user.city && user.state && <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                        Location: {user.city}, {user.state}
                                    </Typography>}
                                    {<Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                        {user.startDate && !user.endDate && "Starting:"} {!user.startDate && user.endDate && "Ending:"} {user.startDate && (new Date(user.startDate).toLocaleDateString())} {user.startDate && user.endDate && "-"} {user.endDate && (new Date(user.endDate).toLocaleDateString())}
                                    </Typography>}
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Search;
