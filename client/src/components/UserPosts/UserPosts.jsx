import React, { useEffect, useState, useCallback } from "react";
import { getPosts, deletePost } from "../../services/posts"; // Import deletePost function
import { VenetianMask } from "lucide-react";
import dayjs from "dayjs";

function UserPosts({ data }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract userId from data
  const userId = data?.msg?.user_id;

  const formatText = (text) => {
    return text.split("\n").map((line, index) => (
      <p className="my-2" key={index}>
        {line}
      </p>
    ));
  };

  // Function to fetch posts, wrapped in useCallback to prevent unnecessary re-creation
  const fetchPosts = useCallback(async () => {
    try {
      const fetchedPosts = await getPosts(userId); // Fetch posts based on userId
      setPosts(fetchedPosts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]); // useCallback ensures this function is stable between renders

  useEffect(() => {
    if (userId) {
      fetchPosts(); // Fetch posts on component mount and when userId changes
    }
  }, [userId, fetchPosts]); // Add fetchPosts to the dependency array

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId); // Call deletePost API
      fetchPosts(); // Refetch posts after deleting
    } catch (err) {
      setError(err.message); // Display error if the delete fails
    }
  };

  return (
    <div className="container user-posts">
      {/* Display loading message */}
      {loading && (
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-8 col-sm-12 mb-3 text-muted">
            Loading posts...
          </div>
        </div>
      )}

      {/* Display error message */}
      {error && <div className="text-danger">{error}</div>}

      {/* Render posts */}
      {!loading && !error && (
        <div className="">
          {posts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-8 col-sm-12 mb-3">
                <p className="m-0 fw-bold text-muted">Manage Posts</p>
              </div>
              {posts.map((post, index) => (
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
                        <p className="m-0 p-2">{post?.username}</p>
                      </div>
                      <div className="d-flex">
                        <p
                          className="mb-1 text-monospace text-muted"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {dayjs(post?.created_at).format(
                            "MMMM D, YYYY h:mm A"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="mx-1 text-muted fst-italic text-wrap text-break">
                      {formatText(post.content)}
                    </div>
                    <div className="d-flex">
                      <button
                        onClick={() => handleDelete(post?.post_id)}
                        className="btn btn-danger btn-sm py-2 px-3 rounded-4 ms-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserPosts;
