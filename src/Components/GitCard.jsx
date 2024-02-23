import React, { useState } from "react";

import { Typography, Card, CardContent, CardMedia } from "@mui/material";

import { StyledFlex, StyledCard, StyledSmallCard, StyledCardMedia } from "../style";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Charts from "./Charts";


function GitCard({repoName, img, desc, stars, issues, pushedAt, ownerName}) {

  const [drop, setDrop] = useState(false);
  const token = "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";

  return (
    <div>
      <StyledCard>
        <StyledCardMedia
          image={img}
          title="profileImage"
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
                  Last pushed {pushedAt} by {ownerName}
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
