import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:5000/getposts", {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const likesPost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          }
          return item;
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikesPost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          }
          return item;
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>{item.postedBy.name}</h5>
            <div className="card-image">
              <img className="item" src={item.photo} alt="profile" />
            </div>
            <div className="card-content">
              <i
                className="material-icons"
                style={{ color: "red", cursor: "pointer" }}
              >
                favorite
              </i>
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    unlikesPost(item._id);
                  }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    likesPost(item._id);
                  }}
                >
                  thumb_up
                </i>
              )}

              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="add a comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
