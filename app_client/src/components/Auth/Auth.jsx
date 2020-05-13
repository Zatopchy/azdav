import React from "react";
import s from "./Auth.module.css";

const Auth = (props) => {
  return (
    <div className={`col-md-6 mt-2 mr-auto ml-auto ${s.auth}`}>
      <div>Тип авторизация</div>
    </div>
  );
};

export default Auth;
