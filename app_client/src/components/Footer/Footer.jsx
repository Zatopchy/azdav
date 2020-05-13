import React from "react";
import s from "./Footer.module.css";

const Footer = (props) => {
  return (
    <div className={`bg-dark text-white ${s.footer}`}>
      <footer>Разработал Васин Сергей. Все права защищены ©</footer>
    </div>
  );
};
export default Footer;
