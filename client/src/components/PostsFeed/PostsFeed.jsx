import React, { useEffect, useState } from "react";
import { getPosts } from "../../services/posts";

function PostsFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data); // Assuming response.data contains the array of posts
      console.log("Fetched posts:", response.data); // Log the fetched posts here
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatText = (text) => {
    return text.split("\n").map((line, index) => (
      <p className="m-0" key={index}>
        {line}
      </p>
    ));
  };

  return (
    <div className="container">
      {loading ? (
        <div className="container d-flex justify-content-center">
          <div
            className="spinner-border whispr-blue-text"
            style={{ height: "5rem", width: "5rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : posts.length > 0 ? (
        <div className="row justify-content-center">
          {posts.map((post, index) => {
            return (
              <div key={index} className="col-lg-8 col-md-8 col-sm-12 mb-3">
                <div className="white-bg-color p-4 rounded-5" style={{height: "100%"}}>
                  <p className="m-0 text-muted fst-italic text-wrap text-break">
                    {formatText(post.content)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="m-0 text-center">No posts available.</p>
      )}
    </div>
  );
}

export default PostsFeed;
