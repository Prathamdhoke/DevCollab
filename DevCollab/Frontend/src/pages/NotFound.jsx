import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
    return (
        <div className="notfound-page">

            <div className="notfound-container">

                <h1>404</h1>

                <h2>Page Not Found</h2>

                <p>
                    The page you're looking for doesn't exist or may have been moved.
                </p>

                <Link to="/" className="home-btn">
                    Back to Home
                </Link>

            </div>

        </div>
    );
};

export default NotFound;