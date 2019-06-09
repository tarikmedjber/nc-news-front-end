import React from "react";

export default function DropDownSortBy(props) {
  return (
    <select onChange={props.sortByFunc} value={props.sortBy}>
      <option value="created_at">Created At </option>
      <option value="comment_count">Comment Count</option>
      <option value="votes">Vote Count</option>
    </select>
  );
}
