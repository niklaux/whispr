import { Send, VenetianMask } from "lucide-react";
import React, { useState } from "react";
import { createPost } from "../../services/posts";

function CreatePost() {
  const user_id = localStorage.getItem("user_id");

  const [content, setContent] = useState({
    content: "",
    user_id: user_id,
  });

  const handleChange = (e) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await createPost(content);
      console.log(response);

      if (response.status === 201) {
        console.log("Create post success.");
        
        setContent((prevContent) => ({
          ...prevContent,
          content: "",
        }));
      } else {
        console.error("Failed to create post");
      }
    } catch (err) {
      console.error("Error during post creation:", err);
    }
  };

  return (
    <div className="container my-5 p-4 white-bg-color rounded-5">
      <div className="">
        {/* Use form onSubmit for correct handling */}
        <form onSubmit={handleSubmit}>
          <div className="d-flex align-items-center">
            <input
              type="text"
              placeholder="Share your thoughts"
              className="form-control rounded-5"
              name="content"
              value={content.content} // Ensure the value is linked
              onChange={handleChange}
            />
            <Send
              onClick={handleSubmit}
              className="ms-3 whispr-blue-text"
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="d-flex align-items-center justify-content-center mt-3">
            <VenetianMask className="mx-2 text-muted" />
            <p className="text-muted text-center m-0">
              The beauty of whispr is that your post will be shared anonymously
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
