import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import CreatePost from "../../components/CreatePost/CreatePost";
import PostsFeed from "../../components/PostsFeed/PostsFeed";

function FeedPage() {
  useAuth();
  
  const [refresh, setRefresh] = useState(false);

  // Function to handle refresh
  const handleRefresh = () => {
    setRefresh(prev => !prev); // Toggle refresh state
  };

  return (
    <div>
      <NavigationBar />
      <CreatePost onPostCreated={handleRefresh} /> {/* Pass function as prop */}
      <PostsFeed refresh={refresh} /> {/* Pass refresh state as prop */}
    </div>
  );
}

export default FeedPage;
