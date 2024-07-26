import React from "react";
import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <NavLink to="/">
        <Asset
          src={NoResults}
          message={`Sorry, the page you're looking for doesn't exist`}
        />
      </NavLink>
    </div>
  );
};

export default NotFound;