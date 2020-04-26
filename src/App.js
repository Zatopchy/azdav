import React from "react";
import UserManagementContainer from "./components/UserManagement/UserManagementContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import FooterContainer from "./components/Footer/FooterContainer";
import { Route } from "react-router-dom";
import SystemSettingsContainer from "./components/SystemSettings/SystemSettingsContainer";
import AddUsersContainer from "./components/AddUsers/AddUsersContainer";
import ImportContainer from "./components/Import/ImportContainer";
import s from "./App.module.css";

const App = () => {
  return (
    <div className="container-fluid p-0">
      <div className="col-md-11 m-auto bg-light p-0">
        <HeaderContainer />
        <main className={`container-fluid bg-light ${s.mainSize}`}>
          <Route exact path="/" render={() => <UserManagementContainer />} />
          <Route path="/settings" render={() => <SystemSettingsContainer />} />
          <Route path="/addusers" render={() => <AddUsersContainer />} />
          <Route path="/import" render={() => <ImportContainer />} />
        </main>
        <FooterContainer />
      </div>
    </div>
  );
};

export default App;
