import React, {useEffect, useState } from "react";
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Link } from "react-router-dom";

function SignUp() {
    const acc = localStorage.getItem("accLoggedInto");

    const [disabled, verify] = useState(true);
    const [signUpInfo, modifySignUpInfo] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [passwordMatch, checkIfMatch] = useState(false);

    let meetReq = [false, false, false];
    const charArr = [3,5,8];
    const updateInfo = (e) => {
        modifySignUpInfo((prevNext) => ({
            ...prevNext,
            [e.target.name]: e.target.value,
        }));
        for (let i = 0; i < 3; i++) {
            if (document.getElementsByTagName("input")[i].value.length >= charArr[i]) {
                meetReq[i] = true;
            } else {
                meetReq[i] = false;
            }
        }
        console.log(meetReq);
        if (meetReq[0] == true && meetReq[1] == true && meetReq[2] == true) {
            verify(false);
            document.getElementById("submit").className = "submit on";
        } else {
            verify(true);
            document.getElementById("submit").className = "submit";
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(signUpInfo);
        axios
            .post("http://localhost:5000/users/access-users", signUpInfo)
            .then(res => {
                console.log(res.data.data[0]);
                if (res.data.data[0] == undefined) {
                    createAccount();
                } else {
                    document.getElementById("errMsg").innerHTML = "Account with that username already exists.";
                }
            })
    }

    function createAccount() {
        if (passwordMatch) {
            axios
            .post("http://localhost:5000/users/signup", signUpInfo)
            .then((res) => {
                console.log(res.data);
                modifySignUpInfo({
                    username: "", 
                    email: "",
                    password: "",
                });
                location.replace('/signin');
            });
        } else {
            document.getElementById("errMsg").innerHTML = "Passwords don't match."
        }
    }

    const verifyPassword = () => {
        checkIfMatch(() => {
            if (document.getElementById("password").value == document.getElementById("confirmpassword").value) {
                return true;
            } else {
                return false;
            }
        })
    }

    if (acc != undefined) {
        localStorage.setItem("accLoggedInto", undefined);
    }

    return (
        <>
        <div className="formBox">
            <form onSubmit={onSubmit}>
                <input className="form" type="text" id="username" name="username" onChange={updateInfo} placeholder="Username:" required/>
                <input className="form" type="email" id="email" name="email" onChange={updateInfo} placeholder="Email:" required/>
                <input className="form" type="password" id="password" name="password" onChange={updateInfo} placeholder="Password:" required />
                <input className="form" type="password" id="confirmpassword" name="confirmpassword" onChange={verifyPassword} placeholder="Confirm Password:" required />
                <button className="submit" type="submit" id="submit" disabled={disabled}>Submit</button>
                <p id="errMsg"></p>
            </form>
            </div>
            <p className="signUp">Already have an Account?&nbsp;<Link to={"/signin"} >Sign In</Link><br /></p>
        </>
    )
}

export default SignUp;