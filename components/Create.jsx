import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Create() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: '',
        age: '',
        gender: ''
    });

    function handleSubmit(e){
        e.preventDefault();

        axios.post('/add_user', values)
        .then(res =>{
            navigate('/');
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
        });        
    }
  return (
    <div className='container-fluid vh-100 vw-100 bg-primary'>
        <div className="row">
            <h3>Add Student</h3>
            <div className="d-flex justify-content-end">
                <Link to='/' className='btn btn-success'>Home</Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' required placeholder='Enter name' onChange={(e) => setValues({...values, name: e.target.value})} autoFocus/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' required placeholder='Enter email' onChange={(e) => setValues({...values, email: e.target.value})}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor='age'>Age</label>
                    <input type='text' name='age' required placeholder='Enter age' onChange={(e) => setValues({...values, age: e.target.value})}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor='gender'>Gender</label>
                    <input type='text' name='gender' required placeholder='Enter gender' onChange={(e) => setValues({...values, gender: e.target.value})}/>
                </div>
                <button type='submit' className='btn btn-success'>Save</button>
            </form>
        </div>
    </div>
  )
}

export default Create