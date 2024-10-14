import React, { useEffect, useState } from "react";
import { getPosts } from "../../services/posts";
import { VenetianMask } from "lucide-react";
import dayjs from "dayjs";

function PostsFeed({ refresh }) {
  const [posts, setPosts] = useState([]); // Ensure posts is initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const postsPerPage = 5; // Posts per page

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response); // Assuming response contains the posts directly
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts on initial render and whenever refresh changes
  }, [refresh]);

  const formatText = (text) => {
    return text.split("\n").map((line, index) => (
      <p className="my-2" key={index}>
        {line}
      </p>
    ));
  };

  // Calculate the index of the last post on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  // Calculate the index of the first post on the current page
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Slice the posts array to get the current posts
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Calculate total pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

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
          {currentPosts.map((post, index) => (
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
          ))}
          {/* Pagination Controls */}
          <div className="col-lg-8 col-md-8 col-sm-12 mb-3 d-flex justify-content-between align-items-center text-muted">
            <button
              className="btn btn-outline-primary rounded-4"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p className="m-0">Page {currentPage} of {totalPages}</p>
            <button
              className="btn btn-outline-primary rounded-4"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="m-0 text-center">No posts available.</p>
      )}
    </div>
  );
}

export default PostsFeed;
