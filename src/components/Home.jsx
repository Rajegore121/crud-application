import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { HashLoader } from 'react-spinners';

const Home = () => {
  const [data, setData] = useState([]);
  const [isDataFetching, setIsDataFetching] = useState(true);
  const nav = useNavigate();

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`)
      .then((res) => {
        alert("Deleted successfully");
        setIsDataFetching(true);
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
      });
  };

  const edit = (id) => {
    nav(`/edit-user/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setData(response.data);
        setIsDataFetching(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isDataFetching) {
      fetchData();
    }
  }, [isDataFetching]);

  return (
    <Card
      sx={{
        height: "100vh",
        width: { xs: "900px", md: "1000px", lg: "1200px" },
        background: "white",
        margin: "auto",
      }}
    >
      <Button
        variant="contained"
        sx={{ margin: "10px" }}
        onClick={() => {
          nav("/add-user");
        }}
      >
        Add New User
      </Button>
      {!isDataFetching ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="right">{user.name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.phone}</TableCell>
                  <TableCell align="right" sx={{ display: "flex", justifyContent: "space-around" }}>
                    <MdDelete onClick={() => deleteUser(user.id)} />
                    <FaEdit onClick={() => edit(user.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          sx={{
            height: "inherit",
            width: "1000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <HashLoader />
        </Box>
      )}
    </Card>
  );
};

export default Home;
