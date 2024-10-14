import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import useAuth from "../../hooks/useAuth";
import AccountSettings from "../../components/AccountSettings/AccountSettings";
import UserPosts from "../../components/UserPosts/UserPosts";

function MyAccountPage() {
  const data = useAuth();
  return (
    <div>
      <NavigationBar />
      <AccountSettings data={data} />
      <UserPosts data={data} />
    </div>
  );
}

export default MyAccountPage;
