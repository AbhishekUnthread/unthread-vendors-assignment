import { useState } from "react";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
// ! IMAGES IMPORTS
import folderOpen from "../../../assets/icons/folderOpen.svg";
// ! MATERIAL IMPORTS
import { Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const VideosOnly = () => {
  return (
    <div className="my-3">
      <div className="row align-items-center mb-2">
        <div className="col">VideosOnly col</div>
        <div className="col-auto d-flex align-items-center">
          VideosOnly col-auto
        </div>
      </div>
    </div>
  );
};

export default VideosOnly;
