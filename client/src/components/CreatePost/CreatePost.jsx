import { Send, VenetianMask } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createPost } from "../../services/posts";
import useAuth from "../../hooks/useAuth";

function CreatePost({ onPostCreated }) {
  // Add prop here
  const data = useAuth();
  const [content, setContent] = useState({
    content: "",
    user_id: data?.msg?.user_id,
  });

  useEffect(() => {
    if (data?.msg?.user_id) {
      setContent((prevContent) => ({
        ...prevContent,
        user_id: data.msg.user_id,
      }));
    }
  }, [data]);

  const maxChars = 150;
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: "",
    success: true,
  });

  const handleChange = (e) => {
    if (e.target.value.length <= maxChars) {
      setContent({
        ...content,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createPost(content);

      if (response.status === 201) {
        setSnackbar({
          show: true,
          message: "Post created successfully!",
          success: true,
        });
        onPostCreated(); // Call the function to refresh the feed
        setContent((prevContent) => ({
          ...prevContent,
          content: "",
        }));
      } else {
        console.error("Failed to create post");
        setSnackbar({
          show: true,
          message: "Failed to create post",
          success: false,
        });
      }
    } catch (err) {
      console.error("Error during post creation:", err);
      setSnackbar({
        show: true,
        message: "Error during post creation",
        success: false,
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSnackbar({ show: false, message: "", success: true });
      }, 3000);
    }
  };

  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-8 col-sm-12">
          <form
            className="white-bg-color my-5 p-4 rounded-5"
            onSubmit={handleSubmit}
          >
            <div className="d-flex align-items-center">
              <textarea
                placeholder="Share your thoughts. Maximum of 150 characters only."
                className="form-control rounded-4"
                name="content"
                value={content.content}
                onChange={handleChange}
                rows={3}
                style={{ resize: "none", width: "100%" }}
              />
              {loading ? (
                <div className="ms-3">
                  <div
                    className="spinner-border whispr-blue-text"
                    role="status"
                    style={{ height: "1.5rem", width: "1.5rem" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <Send
                  onClick={handleSubmit}
                  className="ms-3 whispr-blue-text"
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            <div className="d-flex align-items-center justify-content-center mt-3">
              <VenetianMask className="mx-2 text-muted" />
              <p className="text-muted text-center m-0">
                The beauty of whispr is that your post will be shared
                anonymously
              </p>
            </div>
          </form>
        </div>
      </div>

      {snackbar.show && (
        <div
          className={`alert ${
            snackbar.success ? "alert-success" : "alert-danger"
          } position-fixed bottom-0 end-0 m-3`}
          role="alert"
          style={{ zIndex: 1050 }}
        >
          {snackbar.message}
        </div>
      )}
    </div>
  );
}

export default CreatePost;
