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
    //   console.log("commit data", response.data);
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



  useEffect(() => {
    fetchCommitData();
    fetchAddDelData();
  }, [repoName, ownerName]);

  const options = {
    commits: {
      title: {
        text: "Total Commits",
      },
      xAxis: {
        type: 'datetime',
        labels: {
          formatter: function () {
            return Highcharts.dateFormat("%b %d, %Y", this.value); // Format x-axis labels
          },
        },
      },
      series: [
        {
            name: "Commits",
            data: Array.isArray(commitData)
              ? commitData.map((weekData) => [
                  weekData.week * 1000, // Convert week to timestamp
                  weekData.total,
                ])
              : [],
        },
      ],
    },
    additions: {
      title: {
        text: "Total Additions",
      },
      xAxis: {
        type: 'datetime',
        labels: {
          formatter: function () {
            return Highcharts.dateFormat("%b %d, %Y", this.value); // Format x-axis labels
          },
        },
      },
      series: [
        {
          data: Array.isArray(addDelData)
            ? addDelData
                .slice(0, 3)
                .map(([timestamp, additions, deletions]) => [
                  Highcharts.dateFormat("%b %d, %Y", timestamp * 1000),
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
      xAxis: {
        type: 'datetime',
        labels: {
          formatter: function () {
            return Highcharts.dateFormat("%b %d, %Y", this.value); // Format x-axis labels
          },
        },
      },
      series: [
        {
          data: Array.isArray(addDelData)
            ? addDelData
                .slice(0, 3)
                .map(([timestamp, additions, deletions]) => [
                  Highcharts.dateFormat("%b %d, %Y", timestamp * 1000),
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
