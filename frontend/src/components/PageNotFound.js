import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <>
            <div className="navbar">
                <div className="navbar-logo">
                    <h2>r/s</h2>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
                <p>Sorry, that page wasn't found.</p>
                <Link to="/landing" style={{ textDecoration: "none" }}>
                    <button className="back-btn" style={{ marginTop: "1rem", marginBottom: "1rem" }}>home</button>
                </Link>
            </div>
        </>
    )
}

export default PageNotFound