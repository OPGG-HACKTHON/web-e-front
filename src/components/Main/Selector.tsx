import React, { useContext, useMemo } from 'react';
import Select from 'react-select';
import { ThemeContext } from 'styled-components';

const Selector = () => {
  const themeStyle = useContext(ThemeContext);

  const options = useMemo(
    () => [
      { value: 'popular', label: '인기순' },
      { value: 'new', label: '최신순' },
    ],
    []
  );
  const customStyles = useMemo(
    () => ({
      // 옵션 창 전체
      menu: (provided: any) => ({
        ...provided,
        width: '10rem',
      }),
      // 옵션창 menu의 자식(전체창)
      menuList: (provided: any) => ({
        ...provided,
        maxHeight: '68px',
      }),
      // 선택창과 옆 화살표사이 수직선
      indicatorSeparator: (provided: any) => ({
        ...provided,
        opacity: 0,
      }),
      // 선택창 옆 화살표
      indicatorsContainer: (provided: any) => ({
        ...provided,
        border: 'none',
      }),
      // 선택창 아래 옵션들
      option: (provided: any, state: any) => ({
        ...provided,
        font: state.isSelected
          ? themeStyle.typography.bodyRgBold
          : themeStyle.typography.bodyRg,
        fontSize: '1.4rem',
        margin: '0 auto',
        padding: 2,
        marginTop: '2px',
        width: '10rem',
        background: state.isSelected
          ? themeStyle.color.grayScale[100]
          : 'white',
        color: '#000',
        height: '20px',
        textAlign: 'center',
        verticalAlign: 'end',
        display: 'inline-block',
        '&:hover': {
          // Overwrittes the different states of border
          background: state.isFocused
            ? themeStyle.color.grayScale[50]
            : themeStyle.color.white,
        },
      }),
      // 옵션 선택창 박스
      control: (provided: any) => ({
        ...provided,
        width: '10rem',
        border: 0,
        boxShadow: 'none',
      }),
      // 옵션 선택창에 있는 value
      singleValue: (provided: any) => ({
        ...provided,
        font: themeStyle.typography.bodyRgBold,
        fontSize: '1.4rem',
      }),
    }),
    [
      themeStyle.color.grayScale,
      themeStyle.color.white,
      themeStyle.typography.bodyRg,
      themeStyle.typography.bodyRgBold,
    ]
  );

  return (
    <Select options={options} defaultValue={options[1]} styles={customStyles} />
  );
};

export default Selector;
