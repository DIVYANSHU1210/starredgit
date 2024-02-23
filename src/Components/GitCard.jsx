import React, { useState } from "react";

import { Typography, Card, CardContent, CardMedia } from "@mui/material";

import useStyles from "../style";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Charts from "./Charts";

function GitCard({repoName, img, desc, stars, issues, pushedAt, ownerName}) {
  // console.log(repoName,ownerName)
  const classes = useStyles();
  const [drop, setDrop] = useState(false);
  const token = "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";

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          image={img}
          title="profileImage"
          className={classes.cardImage}
        />
        <CardContent>
          <div className={classes.flex}>
            <div>
              <Typography variant="h4" color="textPrimary">
                {repoName}
              </Typography>
              <Typography variant="p" color="textSecondary" paragraph>
                {desc}
              </Typography>
              <div className={classes.flex}>
                <Typography variant="p" className={classes.smallcard}>
                  {stars} stars
                </Typography>
                <Typography variant="p" className={classes.smallcard}>
                  {issues} issues
                </Typography>
                <Typography
                  variant="p"
                  color="textprimary"
                  className={classes.ownerInfo}
                >
                  Last pushed {pushedAt} by {ownerName}
                </Typography>
              </div>
            </div>
            {drop === false ? (
              <ArrowRightIcon
                onClick={() => setDrop(!drop)}
                className={classes.drop}
              />
            ) : (
              <ArrowDropDownIcon
                onClick={() => setDrop(!drop)}
                className={classes.drop}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {drop === true ? (<Charts token={token} repoName={repoName}  ownerName={ownerName}/>) : <></>}
    </div>
  );
}

export default GitCard;
