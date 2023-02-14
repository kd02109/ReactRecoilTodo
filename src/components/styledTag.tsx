import styled from "styled-components";

export const Input = styled.input`
  border: none;
  border-radius: 10px;
  padding: 10px 30px;
  &:focus {
    outline: none;
  }
  position: relative;
`;

export const Btn = styled.button`
  position: absolute;
  padding: 10px 10px;
  border: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  right: 0.1px;
`;

export const Form = styled.form`
  position: relative;
`;

export const BtnTodo = styled.button`
  padding: 5px 10px;
  font-size: 13px;
  color: rgba(245, 246, 250, 1);
  background-color: rgba(156, 136, 255, 0.9);
  border-radius: 10px;
  border: none;
  font-weight: 100;
  transition: 0.2s;
  &:active {
    transform: translateY(2px);
    background-color: rgba(140, 122, 230, 1);
  }
`;

export const BtnDelet = styled(BtnTodo)`
  background-color: rgba(253, 121, 168, 0.8);
  font-weight: 600;
  color: black;
  &:active {
    transform: translateY(2px);
    background-color: rgba(214, 48, 49, 1);
  }
`;
