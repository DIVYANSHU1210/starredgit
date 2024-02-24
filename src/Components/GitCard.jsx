import React, { useState } from "react";

import { Typography, Card, CardContent, CardMedia } from "@mui/material";

import { StyledFlex, StyledCard, StyledSmallCard, StyledCardMedia } from "../style";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Charts from "./Charts";


function GitCard({repoName, img, desc, stars, issues, pushedAt, ownerName}) {

  const [drop, setDrop] = useState(false);
  const token = "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";

  const formatDate = (myDate)=>{
    const date = new Date(myDate);
    const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  return (
    <div>
      <StyledCard>
        <CardMedia
          image={img}
          title="profileImage"
          sx = {{minWidth: "150px",
          minHeight: "150px",
          margin: "1rem",
          borderRadius: "50%"}}
        />
        <CardContent>
          <StyledFlex>
            <div>
              <Typography variant="h4" color="textPrimary">
                {repoName}
              </Typography>
              <Typography variant="p" color="textSecondary" paragraph>
                {desc}
              </Typography>
              <StyledFlex>
                <StyledSmallCard variant="p">
                  {stars} stars
                </StyledSmallCard>
                <StyledSmallCard variant="p">
                  {issues} issues
                </StyledSmallCard>
                <Typography
                  variant="p"
                  color="textprimary"
                >
                  Last pushed {formatDate(pushedAt)} by {ownerName}
                </Typography>
              </StyledFlex>
            </div>
            {drop === false ? (
              <ArrowRightIcon
                onClick={() => setDrop(!drop)}
              />
            ) : (
              <ArrowDropDownIcon
                onClick={() => setDrop(!drop)}
              />
            )}
          </StyledFlex>
        </CardContent>
      </StyledCard>

      {drop === true ? (<Charts token={token} repoName={repoName}  ownerName={ownerName}/>) : <></>}
    </div>
  );
}

export default GitCard;
