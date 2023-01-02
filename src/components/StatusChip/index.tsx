import React from "react";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";

type Status = "completed" | "in progress" | "blocked" | undefined

function colorForStatus(status: Status) {
  switch (status) {
    case "completed":
      return 'green';
    case "in progress":
      return 'blue';
    case "blocked":
      return 'red';
    default:
      return 'grey';
  }
}

function StatusChip({ status } : {status: Status}) {
  return (
    <Chip
      label={status}
      avatar={status === "completed" ? <DoneIcon style={{ color: "white" }} /> : <div/>}
      style={{ backgroundColor: 'black', color: "white" }}
    />
  );
}

export default StatusChip;
