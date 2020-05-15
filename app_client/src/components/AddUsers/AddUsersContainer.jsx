import React, { Component } from "react";
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
  setMinLengthPassAC,
  checkAddUserNewAC,
  updateNewLevelChangeAC,
  updateNewTelephoneChangeAC,
  updateNewCommentChangeAC,
} from "../../redux/reducers/addUser-reducer";
import { createUserNew, getAddUserSettings } from "../../api/addUsersAPI";

class AddUsersContainer extends Component {
  componentDidMount() {
    getAddUserSettings(
      this.props.updateNewQuotaChange,
      this.props.setMinLengthPass
    );
    this.props.checkAddUserNew();
  }

  render() {
    return (
      <div>
        <AddUsers {...this.props} createUserNew={createUserNew} />
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    addUserPage: state.addUserPage,
  };
};
export default AddUsersContainer = connect(mapStateToProps, {
  addUserNew: addUserNewAC,
  updateNewLoginChange: updateNewLoginChangeAC,
  updateNewPassChange: updateNewPassChangeAC,
  updateNewRepeatPassChange: updateNewRepeatPassChangeAC,
  updateNewEmailChange: updateNewEmailChangeAC,
  updateNewLevelChange: updateNewLevelChangeAC,
  updateNewTelephoneChange: updateNewTelephoneChangeAC,
  updateNewCommentChange: updateNewCommentChangeAC,
  updateNewFIOChange: updateNewFIOChangeAC,
  updateNewQuotaChange: updateNewQuotaChangeAC,
  setMinLengthPass: setMinLengthPassAC,
  checkAddUserNew: checkAddUserNewAC,
})(AddUsersContainer);
