import React, { useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import styled from "styled-components";
const InputPannel = ({
  max,
  currentCount,
  onChangeCount,
  selectedPannel,
  showSettingPannel,
}) => {
  const [count, setCount] = useState(parseInt(currentCount));
  const onChangeHandler = (event) => {
    const inputValue = event.target.value;
    if (!inputValue) {
      setCount(0);
      return;
    }
    if (inputValue > max) {
      setCount(parseInt(max));
      return;
    }
    setCount(parseInt(inputValue));
  };
  const saveCount = () => {
    onChangeCount(parseInt(count));
    showSettingPannel();
  };
  return (
    <>
      <Pannel>
        <Header>
          <Button onClick={showSettingPannel}>
            <MdOutlineArrowBackIos />
          </Button>
          <Title>{selectedPannel}</Title>
          <Button onClick={saveCount}>완료</Button>
        </Header>
        <Contents>
          <Input
            type="text"
            onChange={onChangeHandler}
            value={count}
            autoFocus
          />
        </Contents>
      </Pannel>
    </>
  );
};

export default InputPannel;

const Pannel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
`;

const Button = styled.button`
  padding: 1rem;
  font-size: ${(props) => props.theme.sizes.base};
  background-color: transparent;
  color: white;
`;

const Title = styled.p`
  color: white;
`;

const Contents = styled.section`
  height: 100%;
  background-color: black;
  padding: 2rem 1rem;
`;

const Input = styled.input`
  outline: none;
  border: none;

  width: 100%;
  font-size: ${(props) => props.theme.sizes.xl2};
  padding: 1rem;
  text-align: center;

  background-color: ${(props) => props.theme.colors.black_700};
  border-radius: 1rem;
  color: white;
`;
