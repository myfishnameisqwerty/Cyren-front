import styled, { css } from "styled-components";
export const CustomButton = styled.button`
  font-size: ${props => props.textSize || "15px"};
  border-radius: 3px;
  margin: 0.5em 1em;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  ${(props) =>
    props.transparent &&
    css`
      background: transparent;
      color: rgb(105, 111, 161);
      &:hover {
        background-color: rgb(235, 235, 235);
        color: red;
      }
    `}
  ${(props) =>
    props.fat &&
    css`
      color: white;
      -moz-box-shadow: 3px 3px 5px 6px #ccc;
      -webkit-box-shadow: 3px 3px 5px 6px #ccc;
      box-shadow: 3px 3px 5px 6px #ccc;
    `}
  ${(props) =>
    props.green &&
    css`
      background-color: green;
    `}
${(props) =>
    props.red &&
    css`
      background-color: rgb(204, 34, 4);
    `}
`;

export const CustomInput = styled.input`
  width: ${props => props.width || "200px"};
  height: 28px;
  border: solid 1px;
  border-radius: 5px;
  padding-left: 5px;
`;

export const Buttons = styled.div`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%);
`;
export const Table = styled.table`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const H2 = styled.h2`
  text-align: center;
  margin-bottom: 50px;
`;

export const TH = styled.th`
text-align: left;
  width: 250px;
`;
export const HoverDiv = styled.div`
:hover{
  cursor: pointer;
}`;