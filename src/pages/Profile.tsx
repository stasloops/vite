import React, { useContext, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { $request } from "../api/request";
import { UserContext } from "../App";
import { WidthContainer } from "../ui/styledComponents";

interface IUser {
  email: string;
  id: number;
  credits: number;
}
const Profile = () => {
  const userData = useContext(UserContext);
  const navigate = useNavigate();
  if (!userData?.isAuth) {
    setTimeout(() => {
      navigate("/");
    });
  }
  const [user, setUser] = useState<IUser | null>(null);

  const getUser = async () => {
    const res = await $request.get("/users/me");
    setUser(res.data);
  };

  useLayoutEffect(() => {
    getUser();
  }, []);

  return (
    <WidthContainer>
      <h3 style={{ color: "#4a4b65", marginTop: "30px" }}>
        Email: {user?.email}
      </h3>
      <h3 style={{ color: "#4a4b65", marginTop: "30px" }}>
        Credits: {user?.credits}
      </h3>
    </WidthContainer>
  );
};

export default Profile;
