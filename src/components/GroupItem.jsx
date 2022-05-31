import React, { useState } from "react";
import styled from "styled-components";

const GroupItem = ({ group, handleSelecetdGroups }) => {
  const { group_name, count } = group;
  const [checked, setChecked] = useState(false);

  const onChange = (event) => {
    setChecked(event.target.checked);
    handleSelecetdGroups(group, event.target.checked);
  };

  return (
    <GroupContainer>
      <Label htmlFor={group_name}>
        <CheckBox
          type="checkbox"
          id={group_name}
          name={group_name}
          checked={checked}
          onChange={onChange}
        />
        {group_name} ({count})
      </Label>
    </GroupContainer>
  );
};

export default GroupItem;

const GroupContainer = styled.div`
  padding: 1rem 0;
  cursor: pointer;
`;

const Label = styled.label`
  color: white;
`;

const CheckBox = styled.input`
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
`;
