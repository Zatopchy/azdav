import React from "react";

const UserItem = (props) => {
  return (
    <>
      <th>{props.userLogin}</th>
      <th>{props.userEmail}</th>
      <th>{props.userFIO}</th>
      <th>{props.userQuota} МБ</th>
    </>
  );
};

export default UserItem;
