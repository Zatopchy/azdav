import React from "react";
import { connect } from "react-redux";
import AddUsers from "./AddUsers";
import {
  updateNewLoginChangeAC,
  updateNewPassChangeAC,
  updateNewRepeatPassChangeAC,
  updateNewEmailChangeAC,
  updateNewFIOChangeAC,
  updateNewQuotaChangeAC,
  addUserNewAC,
} from "../../redux/reducers/addUser-reducer";

const mapStateToProps = (state) => {
  return {
    addUserPage: state.addUserPage,
  };
};

const AddUsersContainer = connect(mapStateToProps, {
  addUserNew: addUserNewAC,
  updateNewLoginChange: updateNewLoginChangeAC,
  updateNewPassChange: updateNewPassChangeAC,
  updateNewRepeatPassChange: updateNewRepeatPassChangeAC,
  updateNewEmailChange: updateNewEmailChangeAC,
  updateNewFIOChange: updateNewFIOChangeAC,
  updateNewQuotaChange: updateNewQuotaChangeAC,
})(AddUsers);
export default AddUsersContainer;
