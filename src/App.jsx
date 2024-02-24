import {
  Typography,
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Pagination,
} from "@mui/material";

import StarHalfIcon from "@mui/icons-material/StarHalf";
import React, { useEffect, useState } from "react";
import GitCard from "./Components/GitCard";
import { StyledDiv, StyledToolBar } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { getReposFetch } from "./repoState";

function App() {
  // It will get the page details from the local storage
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage) : 1;
  });

  // access Repo's state from saga store to get the total count of pages
  const totalPages = useSelector((state) =>
    Math.ceil(state.repos.repos.total_count / 10)
  );
  const repoList = useSelector((state) => state.repos.repos.items);
  const dispatch = useDispatch();

  // whenever page changes from pagination, dispatch page's detail to the saga store
  useEffect(() => {
    dispatch(getReposFetch(page));
    localStorage.setItem("currentPage", page);
  }, [dispatch, page]);

  // it will handle the page change in the pagination
  const handlePageChange = (event, value) => {
    setPage(value); // Update current page number
    window.scrollTo({ top: 0, behavior: "smooth" }); // it will scroll the page to top whwnever page changes
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky">
        <StyledToolBar>
          <Toolbar>
            <StarHalfIcon />
            <Typography variant="h5">Starred Repos</Typography>
          </Toolbar>
        </StyledToolBar>
      </AppBar>
      <StyledDiv>
        <Container maxWidth="md">
          <Typography variant="h3" color="textPrimary" align="center">
            Most Starred Repos
          </Typography>

          {repoList ? (
            repoList.map((repo) => (
              <GitCard
                key={repo.id}
                repoName={repo.name}
                img={repo.owner.avatar_url}
                desc={repo.description}
                stars={repo.stargazers_count}
                issues={repo.open_issues_count}
                pushedAt={repo.pushed_at}
                ownerName={repo.owner.login}
              ></GitCard>
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
            siblingCount={1}
            boundaryCount={1}
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </Container>
      </StyledDiv>
    </>
  );
}

export default App;
