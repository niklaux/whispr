import React from "react";
import useAuth from "../../hooks/useAuth";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import CreatePost from "../../components/CreatePost/CreatePost";

function FeedPage() {
  useAuth();
  return (
    <div>
      <NavigationBar />
      <CreatePost />
    </div>
  );
}

export default FeedPage;
