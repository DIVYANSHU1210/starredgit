
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

function App() {

  const [repoList,setRepoList]  = useState([]); 

  useEffect(()=>{
    axios.get("https://api.github.com/search/repositories?q=created:%3E2017-10-22&sort=stars&order=desc")
    .then((res)=>{
      setRepoList(res.data.items)
    })
    .catch((err) => console.log(err))
  })

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" > 
        <Toolbar>
          <StarHalfIcon/>
          <Typography variant="h5">Starred Repos</Typography>
        </Toolbar>
      </AppBar>
      <div>
        <Container maxWidth="md" >
          <Typography variant="h3" color="textPrimary" align="center">Most Starred Repos</Typography>

          {repoList.map(repo=>{
            return(
              <GitCard repoName={repo.name} img={repo.owner.avatar_url} desc={repo.description} stars={repo.stargazers_count} issues={repo.open_issues_count} pushedAt={repo.pushed_at} ownerName={repo.owner.login}></GitCard>
            )
          })}

          <Pagination/>
        </Container>
      </div>

    </>
  );

}

export default App;
