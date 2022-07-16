import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [pics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:5000/getmyposts", {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.posts);
      });
  });
  return (
    <div
      style={{
        maxWidth: "550px",
        margin: "0px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="profile"
          />
        </div>
        <div>
          <h4>{state ? state.name : "loading..."}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>40 posts</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {pics.map((items) => {
          return (
            <img
              className="item"
              src={items.photo}
              alt={items._id}
              key={items._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
