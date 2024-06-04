import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/get_student/${id}`)
      .then((res) => {
        setData(res.data.result);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`/edit_user/${id}`, data[0])
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="container-fluid vw-100 vh-100 bg-primary p-4">
      <h1>User {id}</h1>
      <div className="d-flex justify-content-end">
      <Link to="/" className="btn btn-success ">
        Back
      </Link>
      </div>
      

      {data.map((student, index) => {
        return (
          <form onSubmit={handleSubmit} key={index}>
            <div className="form-group my-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={student.name}
                required
                placeholder="Enter name"
                onChange={(e) => setData([{ ...data[0], name: e.target.value }])}
                autoFocus
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={student.email}
                required
                placeholder="Enter email"
                onChange={(e) => setData([{ ...data[0], email: e.target.value }])}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                name="age"
                value={student.age}
                required
                placeholder="Enter age"
                onChange={(e) => setData([{ ...data[0], age: e.target.value }])}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                name="gender"
                required
                placeholder="Enter gender"
                value={student.gender}
                onChange={(e) =>
                  setData([{ ...data[0], gender: e.target.value }])
                }
              />
            </div>
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </form>
        );
      })}
    </div>
  );
}

export default Edit;
