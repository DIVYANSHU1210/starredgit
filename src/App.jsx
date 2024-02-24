import {
  Typography,
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Pagination,
} from "@mui/material";

import StarHalfIcon from '@mui/icons-material/StarHalf';

import axios from "axios";
import React, { useEffect, useState } from "react";
import GitCard from "./Components/GitCard";
import { StyledDiv, StyledToolBar } from "./style";

import { useDispatch, useSelector } from "react-redux";
import { getReposFetch } from "./repoState";


function App() {
  // const [repoList, setRepoList] = useState([]);
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage) : 1;
  });
  // const [totalPages, setTotalPages] = useState(0);
  const totalPages = useSelector(state => Math.ceil(state.repos.repos.total_count / 10));
  console.log("total pages - >", totalPages)
  const repoList = useSelector(state => state.repos.repos.items);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getReposFetch(page));
    localStorage.setItem("currentPage", page);
  },[dispatch, page]);


  console.log("repofetch", repoList);

  // useEffect(() => {
  //   axios.get(`https://api.github.com/search/repositories?q=created:%3E2017-10-22&sort=stars&order=desc&page=${page}&per_page=10`)
  //     .then((res) => {
  //       setRepoList(res.data.items);
  //       setTotalPages(Math.ceil(res.data.total_count / 10)); // Calculate total pages based on total count from API
  //     })
  //     .catch((err) => console.log(err));
  // }, [page]); // Fetch data when page changes

  const handlePageChange = (event, value) => {
    setPage(value); // Update current page number
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" >
        <StyledToolBar>
          <Toolbar>
            <StarHalfIcon />
            <Typography variant="h5">Starred Repos</Typography>
          </Toolbar>
        </StyledToolBar>
      </AppBar>
      <StyledDiv>
        <Container maxWidth="md">
          <Typography variant="h3" color="textPrimary" align="center">Most Starred Repos</Typography>

          {repoList ? (
            repoList.map(repo => (
              <GitCard key={repo.id} repoName={repo.name} img={repo.owner.avatar_url} desc={repo.description} stars={repo.stargazers_count} issues={repo.open_issues_count} pushedAt={repo.pushed_at} ownerName={repo.owner.login}></GitCard>
            ))
          ) : (
            <Typography variant="body1">Loading...</Typography>
          )}

          <Pagination
            count={totalPages || 0}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded" 
            size="large"
            siblingCount={1} // Adjust as needed
            boundaryCount={1} // Adjust as needed
            style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
          />
        </Container>
      </StyledDiv>
    </>
  );
}

export default App;
