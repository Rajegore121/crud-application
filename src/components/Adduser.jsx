import { Box, Button, Card, TextField, Typography } from '@mui/material';
import { v4 as uuid4 } from "uuid";
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Adduser = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [phoneHelperText, setPhoneHelperText] = useState("");

  const [email, setEmail] = useState("");
  const [mailError, setEmailError] = useState(false);
  const [mailHelperText, setMailHelperText] = useState("");
  const nav = useNavigate();

  const handleSubmit = () => {
    let user = {
      id: uuid4,
      name,
      phone,
      email,
    };
    console.log(user)

    axios.post("http://localhost:3000/users", user).then((res) => {
      alert("Registration successfully");
      nav("/")
    }).catch((err) => {
      console.log(object)
    })
  };
  return (
    <Card
      sx={{
        height: "1000vh",
        width: { xs: "900px", md: "1000px", lg: "1200px" },
        margin: "auto",
        backgroundColor: "#EECEB9",
        borderRadius: "30px",
      }}
      
    >
      <Box sx={{
        width: { xs: "400px", md: "450px", lg: "500px" },
        height: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "250px",
        marginTop: "50px",
        flexDirection: "column",
        padding: "20px",
        backgroundColor: "#FEFBD8",
        borderRadius: "30px",
        boxShadow: "5px 5px grey  ",
      }}
      >
        <Typography variant='h4' color={"#402E7A"} padding={"20px"}>
          User Registration
        </Typography>

        <TextField
          id="filled-basic"
          label="Name"
          variant="filled"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          inputProps={{ maxLength: 12 }}
          error={nameError}
          helperText={nameHelperText}
        />
        <br />
        <TextField
          id="filled-basic"
          label="Phone No"
          variant="filled"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          inputProps={{ maxLength: 12 }}
          error={phoneError}
          helperText={phoneHelperText}
        />
        <br />
        <TextField
          id="filled-basic"
          label="Email"
          varient="filled"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          inputProps={{ maxLength: 12 }}
          error={mailError}
          helperText={mailHelperText}
        />
        <br />
        <Button
          varient="contained"
          sx={{ mt: "10px" }}
          onClick={() => {
            if (name === "" || name === null || name === "undefined") {
              setNameError(true);
              setNameHelperText("Please Enter Name");
            }
            else if (phone === "" || phone === null || phone === "undefined") {
              setPhoneError(true);
              setPhoneHelperText("Please Enter Phone Number");
            }
            else if (email === "" || email === null || email === "undefined") {
              setEmailError(true);
              setMailHelperText("Please Enter Mail");
            }
            else {
              handleSubmit();
            }
          }}
        >
          Submit
        </Button>
      </Box>
    </Card>
  );
};

export default Adduser;