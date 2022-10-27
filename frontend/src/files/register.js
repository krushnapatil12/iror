import React , { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import trainImg from "./register_img.png";

function Register() {
    const [user, setUser] = useState({
      fname: "",
      lname: "",
      email: "",
      contactNo: 0,
      Password: ""
    });

    function handleChange(event){
      const newValue = event.target.value;
      const inputname = event.target.name; 
      setUser(prevValue => {
        if(inputname === "fname"){
            return {
              fname: newValue,
              lname: prevValue.lname,
              email: prevValue.email,
              contactNo: prevValue.contactNo,
              Password: prevValue.Password,
            };
        }
        if(inputname === "lname"){
            return {
              fname: prevValue.fname,
              lname: newValue,
              email: prevValue.email,
              contactNo: prevValue.contactNo,
              Password: prevValue.Password
            };
        }
        if(inputname === "email"){
          return {
            fname: prevValue.fname,
            lname: prevValue.lname,
            email: newValue,
            contactNo: prevValue.contactNo,
            Password: prevValue.Password
          };
        }
        if(inputname === "contactNo"){
          return {
            fname: prevValue.fname,
            lname: prevValue.lname,
            email: prevValue.email,
            contactNo: newValue,
            Password: prevValue.Password
          };
        }
        if(inputname === "password"){
          return {
            fname: prevValue.fname,
            lname: prevValue.lname,
            email: prevValue.email,
            contactNo: prevValue.contactNo,
            Password: newValue
          };
        }
      })
    }

    const onSubmitForm = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        });
        let res=await response.json();
        console.log(res);
        if(res.created){
          alert("Success");
          window.location.href = "/login";
        }else{
          alert("Invalid Credential");
        }
      }
      catch (err){
        console.log(err);
      }
    }

    return (
        <div className="login_page">
            <div className="login_main">
        <div className="train_image">
          <img src={trainImg}/>
        </div>
        <div className="login_input">
          <div>
            <h3>Register</h3>
            <br />
            <TextField
              sx={{width: 319}}
              required
              name="fname"
              id="outlined-required"
              label="First Name"
              value={ user.fname }
              onChange={handleChange}
            /> 
            <br />
            <br />
            <TextField
              sx={{width: 319}}
              required
              id="outlined-required"
              name="lname"
              label="Last Name"
              value={ user.lname }
              onChange={handleChange}
            />
            <br /> <br />
            <TextField
              sx={{width: 319}}
              required
              id="outlined-required"
              name="email"
              label="Email"
              value={ user.email }
              onChange={handleChange}
            />
            <br /> <br />
            <TextField
              sx={{width: 319}}
              required
              id="outlined-required"
              name="contactNo"
              label="Contact No"
              value={ user.contactNo }
              onChange={handleChange}
            />
            <br /> <br />
            <TextField
              sx={{width: 319}}
              id="outlined-password-input"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={ user.Password }
              onChange={handleChange}
            />
            <br /><br />
            <Button onClick={ onSubmitForm } variant="contained">Create Account</Button>
          </div>
        </div>
      </div>
        </div>
    );
}


export default Register;