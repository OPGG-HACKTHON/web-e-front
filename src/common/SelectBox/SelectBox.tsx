import React, { SetStateAction, Dispatch } from 'react';
import styled from 'styled-components';
import Polygon from 'assets/svg/Polygon2.svg';

type Props = {
  list: ListProps[];
  width: string;
  height: string;
  borderStyle: string;
  backgroundColor: string;
  color: string;
  paddingStyle: string;
  stateValue: any;
  setStateValue: Dispatch<SetStateAction<any>>;
};

type SelectBoxStyleProps = {
  width: string;
  height: string;
  borderStyle: string;
  backgroundColor: string;
  color: string;
  paddingStyle: string;
};

type ListProps = {
  value: string;
  name: string;
};

const SelectBox = ({
  list,
  width,
  height,
  borderStyle,
  backgroundColor,
  color,
  paddingStyle,
  stateValue,
  setStateValue,
}: Props) => {
  return (
    <SelectBoxStyle
      width={width}
      height={height}
      borderStyle={borderStyle}
      backgroundColor={backgroundColor}
      color={color}
      paddingStyle={paddingStyle}
      onChange={(e) => setStateValue(e.target.value)}
      value={stateValue}
    >
      {list.map((data: ListProps) => {
        const { value, name } = data;
        return (
          <Option key={value} value={value}>
            {name}
          </Option>
        );
      })}
    </SelectBoxStyle>
  );
};

export default SelectBox;

const SelectBoxStyle = styled.select<SelectBoxStyleProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 5px;
  border: ${({ borderStyle }) => borderStyle};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  padding: ${({ paddingStyle }) => paddingStyle};
  outline: none;
  appearance: none;
  background: url(${Polygon}) no-repeat 90% 50%;
  overflow: hidden;
`;

const Option = styled.option``;
