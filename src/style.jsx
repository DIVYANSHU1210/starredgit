import React from 'react';
import styled from '@emotion/styled';

// Update dependencies:
// - Remove `@mui/styles`
// - Install `@emotion/react`

export const StyledToolBar = styled('div')({
  backgroundColor: "#212121",
});

// export const StyledCardMedia = styled('img')({
//   minWidth: "150px",
//   minHeight: "150px",
//   margin: "1rem",
//   borderRadius: "50%",
// });
export const StyledDiv = styled('div')({
  marginBlock:"3rem",
});

export const StyledCard = styled('div')({
  display: "flex",
  gap: ".5rem",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#F8F8F8",
  marginBlock: "1rem",
});

export const StyledFlex = styled('div')({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
});

export const StyledSmallCard = styled('div')({
  border: "black solid .5px",
  borderRadius: "5px",
  padding: ".2rem",
  backgroundColor: "purple",
  color: "white",
});

export const StyledDrop = styled('span')({
  fontSize: "3rem",
  cursor: "pointer",
});