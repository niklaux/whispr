import React from "react";
import useAuth from "../../hooks/useAuth";

function FeedPage() {
  useAuth();
  return <div>FeedPage</div>;
}

export default FeedPage;
