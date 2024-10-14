import React, { useEffect, useState } from "react";
import { getPosts } from "../../services/posts";
import { VenetianMask } from "lucide-react";
import dayjs from "dayjs";

function PostsFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data); // Assuming response.data contains the array of posts
      // console.log("Fetched posts:", response.data); // Log the fetched posts here
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
      <p className="my-2" key={index}>
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
          <div className="col-lg-8 col-md-8 col-sm-12 mb-3 text-muted">
            <p className="m-0 fw-bold">Recent Posts</p>
          </div>
          {posts.map((post, index) => {
            return (
              <div key={index} className="col-lg-8 col-md-8 col-sm-12 mb-3">
                <div
                  className="white-bg-color p-4 rounded-5"
                  style={{ height: "100%" }}
                >
                  <div className="d-flex align-items-center">
                    <div className="border rounded-5 p-1">
                      <VenetianMask />
                    </div>
                    <div className="flex-fill">
                      <p className="m-0 p-2">{post?.username} </p>
                    </div>
                    <div className="d-flex">
                      <p
                        className="mb-1 text-monospace text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {dayjs(post?.created_at).format("MMMM D, YYYY h:mm A")}
                      </p>
                    </div>
                  </div>
                  <div className="mx-1 text-muted fst-italic text-wrap text-break">
                    {formatText(post.content)}
                  </div>
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
