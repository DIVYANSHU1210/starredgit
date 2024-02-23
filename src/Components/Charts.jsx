import React, { useEffect, useState } from "react";
import { Card, CardContent, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Octokit } from "@octokit/core";


function Charts({ token, repoName, ownerName }) {
    console.log(token,repoName, ownerName );
  const [commitData, setCommitData] = useState([]);
  const [addDelData, setAddDelData] = useState([]);

  const [chart, setChart] = useState("commits");


  const octokit = new Octokit({
    auth: token,
  });

 
  // Function to fetch commit activity data
  const fetchCommitData = async () => {
    try {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/stats/commit_activity",
        {
          owner: ownerName,
          repo: repoName,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
      console.log("commit data", response.data);
      setCommitData(response.data);
    } catch (error) {
      console.error("Error fetching commit activity data:", error);
    }
  };

  const fetchAddDelData = async () => {
    try {
      const response = await octokit.request(
        'GET /repos/{owner}/{repo}/stats/code_frequency',
        {
          owner: ownerName,
          repo: repoName,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
    //   console.log(response.data);
      setAddDelData(response.data);
    } catch (error) {
      console.error("Error fetching addition-deletion data:", error);
    }
  };

//   console.log("is array", Array.isArray(commitData));
//   console.log("is array", Array.isArray(addDelData));

//   const seriesDataCommit = [1, 8, 3, 5, 5];

//   const seriesDataAdd = Array.isArray(addDelData)
//     ? addDelData
//         .slice(0, 3)
//         .map(([timestamp, additions, deletions]) => [
//           timestamp * 1000,
//           additions,
//         ])
//     : [];
//   const seriesDataDel = Array.isArray(addDelData)
//     ? addDelData
//         .slice(0, 3)
//         .map(([timestamp, additions, deletions]) => [
//           timestamp * 1000,
//           deletions,
//         ])
//     : [];

  // let seriesData = [];
  // if (Array.isArray(commitData)) {
  //   commitData.forEach((weekData) => {
  //     weekData.weeks.forEach((week, index) => {
  //       // Calculate the timestamp for the start of the week
  //       const weekStartTimestamp = weekData.week * 1000 + (index * 7 * 24 * 60 * 60 * 1000); // Adding days to timestamp

  //       // Push an array containing [timestamp, total_commits] to the series data
  //       seriesData.push([weekStartTimestamp, week.total]);
  //     });
  //   });
  // } else {
  //   // Handle the case when commitData is not an array
  //   console.error("commitData is not an array");
  // }


  useEffect(() => {
    fetchCommitData();
    fetchAddDelData();
  }, [repoName, ownerName]);

  const options = {
    commits: {
      title: {
        text: "Total Commits",
      },
      series: [
        {
          data: Array.isArray(commitData)
            ? addDelData.slice(0,3).map(([timestamp, additions, deletions]) => [
                timestamp * 1000,
                deletions,
              ])
            : [],
        },
      ],
    },
    additions: {
      title: {
        text: "Total Additions",
      },
      series: [
        {
          data: Array.isArray(addDelData)
            ? addDelData
                .slice(0, 3)
                .map(([timestamp, additions, deletions]) => [
                  timestamp * 1000,
                  additions,
                ])
            : [],
        },
      ],
    },
    deletions: {
      title: {
        text: "Total Deletions",
      },
      series: [
        {
          data: Array.isArray(addDelData)
            ? addDelData
                .slice(0, 3)
                .map(([timestamp, additions, deletions]) => [
                  timestamp * 1000,
                  deletions*-1,
                ])
            : [],
        },
      ],
    },
  };

  

  return (
    <Card>
      <CardContent>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          {/* <InputLabel id="demo-simple-select-label"></InputLabel> */}
          <Select
            value={chart}
            onChange={(e)=>setChart(e.target.value)}
          >
            <MenuItem value={"commits"}>Commits</MenuItem>
            <MenuItem value={"additions"}>Additions</MenuItem>
            <MenuItem value={"deletions"}>Deletions</MenuItem>
          </Select>
        </FormControl>
        <HighchartsReact highcharts={Highcharts} options={options[chart]} />
      </CardContent>
    </Card>
  );
}

export default Charts;
