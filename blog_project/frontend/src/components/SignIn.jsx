import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SignIn() {
    const acc = localStorage.getItem("accLoggedInto");
    
    // defines the logInInfo variable, with a username and password thing
    const [logInInfo, modifyLogInInfo] = useState({
        username: "",
        password: "",
    });
    const [errMsg, editErrMsg] = useState('');

    // when the form is changed it actively updates the logInInfo variable
    const updateInfo = (e) => {
        modifyLogInInfo((prevNext) => ({
            ...prevNext,
            [e.target.name]: e.target.value,
        }));
    };

    // when the data is submitted, it is console.log-ed
    const onSubmit = (data) => {
        data.preventDefault();
        axios
            .post("http://localhost:5000/users/signin", logInInfo)
            .then((res) => {
                let info = res.data.data[0];
                console.log(info)
                if (info != 'Incorrect Password') {
                    localStorage.setItem("accLoggedInto",JSON.stringify(info));
                    location.replace('/create-post');
                } else {
                    editErrMsg('Incorrect Password')
                }
            });
    }

    if (acc != 'undefined') {
        localStorage.setItem("accLoggedInto", undefined);
        location.reload();
    }

    return (
        <>
            <div className="formBox">


              
                <form onSubmit={onSubmit}>
                    <input className="form" type="text" id="username" name="username" onChange={updateInfo} placeholder="Username:" required />
                    <input className="form" type="password" id="password" name="password" onChange={updateInfo} placeholder="Password:" required />
                    <button className="submit" type="submit">Submit</button>
                    <div id="errMsg">{errMsg}</div>
                </form>

                <p className="signUp">Dont have an account?&nbsp;<Link to={"/signup"}>Sign Up</Link>
                </p>
            </div>
        </>
    )
}

export default SignIn;