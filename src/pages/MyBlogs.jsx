import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import PostsContainer from "../components/PostsContainer";
import MyPostCard from "../components/MyPostCard";
import Header from "../components/Header";
import { useNavigate } from "react-router";

const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const username = localStorage.getItem("username");
  const navigator = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!username) {
      navigator("/");
    }

    async function getMyBlogs() {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const data = {
        usernamedb: username,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/posts/myBlogs",
          data,
          config
        );
        setPosts(response.data.allBlogs);
      } catch (e) {
        console.log(e);
      }
    }

    getMyBlogs();
  }, []);

  return (
    <div>
      <Header />
      <div className="my-blog-container">
        {posts.length == 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifySelf: "center",
              alignSelf: "center",
              justifyContent: "center",
              height: "75vh",
              width: "100vw",
            }}
          >
            {" "}
            <h1 style={{ textAlign: "center", textTransform: "capitalize" }}>
              {" "}
              You have not uploaded any blog yet{" "}
            </h1>{" "}
          </div>
        ) : (
          posts.map((post) => {
            return <MyPostCard key={Math.random()} post={post} />;
          })
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
