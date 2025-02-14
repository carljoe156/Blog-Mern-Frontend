import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigator = useNavigate();
  return (
    <div className="home-banner">
      <h1 className="banner-t">Welcome to Blogist </h1>
      <h4 className="banner-st">
        A community shared space where writers and enthusiasts can communicate.
      </h4>
      <Button
        variant="contained"
        onClick={() => navigator("/create")}
        style={{
          borderRadius: "50px",
          backgroundColor: "white",
          padding: "10px 20px",
          color: "black",
        }}
      >
        Create Blog
      </Button>
    </div>
  );
};

export default Banner;
