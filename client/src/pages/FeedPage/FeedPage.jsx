import React from "react";
import useAuth from "../../hooks/useAuth";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import CreatePost from "../../components/CreatePost/CreatePost";
import PostsFeed from "../../components/PostsFeed/PostsFeed";

function FeedPage() {
  useAuth();
  return (
    <div>
      <NavigationBar />
      <CreatePost />
      <PostsFeed />
    </div>
  );
}

export default FeedPage;
