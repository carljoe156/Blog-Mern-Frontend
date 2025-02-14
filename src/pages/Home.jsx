import Header from "../components/Header";
import { useNavigate } from "react-router";
import SideContainer from "../components/SideContainer";
import PostsContainer from "../components/PostsContainer";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const Home = () => {
  const [category, setCategory] = useState("");

  function setCategoryOnClick(category) {
    setCategory(category);
  }

  const navigator = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigator("/");
    }
  }, []);

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />

      <Banner />

      <div className="home-main-area">
        <SideContainer onCategoryClick={setCategoryOnClick} />
        <PostsContainer category={category} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
