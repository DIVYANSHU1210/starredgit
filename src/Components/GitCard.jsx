import React, { useState } from "react";

import { Typography, Card, CardContent, CardMedia } from "@mui/material";

import { StyledFlex, StyledCard, StyledSmallCard, StyledCardMedia } from "../style";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Charts from "./Charts";


function GitCard({repoName, img, desc, stars, issues, pushedAt, ownerName}) {

  const [drop, setDrop] = useState(false);

  // token works as access key to get repo's data like commit, addition, deletion history etc.
  const token = "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";


  // this function will convert the "pushedAt" date (format - 2019-04-24T07:45:14Z)  into humanly redable date (format-Apr 24, 2019, 01:15:14 PM).
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

      {/* if drop is true, it means show charts, else not  */}
      {drop === true ? (<Charts token={token} repoName={repoName}  ownerName={ownerName}/>) : <></>} 
    </div>
  );
}

export default GitCard;
