import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Comment from "../components/Comment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Alert, IconButton, Snackbar } from "@mui/material";

const Full_Blog = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [fullBlog, setFullBlog] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");

  const [open, setOpen] = useState(false);
  const [snackBarType, setSnackBarType] = useState("success");
  const [snackBarMessage, setSnackBarMessage] = useState("");

  function handleChangeComment(e) {
    setComment(e.target.value);
  }

  async function postComment() {
    if (!localStorage.getItem("username")) return;

    if (!comment.trim()) {
      setSnackBarType("error");
      setSnackBarMessage("Comment cannot be empty!");
      setOpen(true);
      return;
    }

    try {
      const data = {
        comment: comment.trim(),
        blog: id,
        postedBy: localStorage.getItem("username"),
        postedTime: new Date(),
      };

      await axios.post("http://localhost:5000/comments/addComment", data);

      setSnackBarType("success");
      setSnackBarMessage("Comment posted successfully!");
      setComment("");
      setOpen(true);

      // Re-fetch comments after posting a new one
      fetchComments();
    } catch (e) {
      setSnackBarType("error");
      setSnackBarMessage("Error while posting comment, try again.");
      setOpen(true);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getFullBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/posts/blog/${id}`
        );

        if (response.data && response.data.blogData) {
          const data = response.data.blogData;
          data.createdDate = data.createdDate.slice(0, 10);
          setFullBlog(data);
        } else {
          console.error("Blog data not found");
        }
      } catch (e) {
        console.error("Error fetching blog:", e);
        navigate("/error");
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/comments/fetchComments",
          { blogId: id }
        );
        setAllComments(response.data.data);
      } catch (e) {
        console.error("Error fetching comments:", e);
      }
    };

    getFullBlog();
    fetchComments();
  }, [id]);

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={snackBarType}
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>

      <Header />

      <div className="blog-container">
        {fullBlog ? (
          <>
            <img src={fullBlog.picture} alt="Blog Cover" />
            <div
              className="blog-header"
              style={{
                border: "none",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <h1>{fullBlog.title}</h1>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <p>
                  <b>Published On:</b> {fullBlog.createdDate}
                </p>
                <p>
                  <b>Author:</b> {fullBlog.username}
                </p>
                <p>
                  <b>Category:</b> {fullBlog.categories}
                </p>
              </div>
            </div>

            <hr />

            <div
              className="blog-area"
              style={{ border: "none", marginTop: "-10px" }}
            >
              <p>{fullBlog.description}</p>
            </div>

            <div className="comments-container">
              <hr />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="text"
                  placeholder="Post your comment..."
                  value={comment}
                  onChange={handleChangeComment}
                  name="comment"
                  className="blog-title-input"
                />
                <IconButton onClick={postComment}>
                  <AddCircleIcon />
                </IconButton>
              </div>
              <hr />

              <h1>Comments</h1>
              {allComments.length > 0 ? (
                allComments.map((comment) => (
                  <Comment key={comment._id} props={comment} />
                ))
              ) : (
                <p>No comments yet. Be the first to comment!</p>
              )}
            </div>
          </>
        ) : (
          <p>Loading blog details...</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Full_Blog;
