import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(true)

    useEffect(() =>{
        if(deleted){
           setDeleted(false);
        }
        axios.get('/students')
        .then(res =>{
            setData(res.data.result);
            console.log(res.data.result)
        })
        .catch(err =>{
            console.log(err)
        });
    },[deleted]);

    function handleDelete(id){
        axios.delete(`/delete/${id}`)
        .then(res =>{
            setDeleted(true)
            console.log(res.data.result)
        })
        .catch(err =>{
            console.log(err)
        });
    }
  return (
    <div className='container-fluid'>
         <h3>Add Student</h3>
            <div className="d-flex justify-content-end">
                <Link to='/create' className='btn btn-success'>Add New Student</Link>
            </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((student,index) =>{
                        return (<tr key={index}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                            <td>
                                <Link to={`/read/${student.id}`} className='btn btn-success mx-2'>Read</Link>
                                <Link to={`/edit/${student.id}`}  className='btn btn-success mx-2'>Edit</Link>
                                <button className='btn btn-danger mx-2' onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>)
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Home