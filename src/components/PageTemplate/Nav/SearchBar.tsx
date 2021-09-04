import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Search from 'assets/svg/Search.svg';
import useSearch from 'hooks/useSearch/useSearch';
import { useHistory } from 'react-router-dom';

const SearchBar = ({ onAddKeyword }: any) => {
  const [searchTxt, setSearchTxt] = useState('');

  const searchSpace = (e: any) => {
    setSearchTxt(e.target.value);
  };

  const { goToLink } = useSearch();
  const history = useHistory();
  const onClick = (value) => {
    onAddKeyword(value);
    const url = goToLink(value);
    history.push(url);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick(searchTxt);
    }
  };
  return (
    <SearchWrapper>
      <SearchIconWrapper>
        <SearchIcon src={Search} alt={Search} />
      </SearchIconWrapper>
      <SearchInput
        value={searchTxt}
        placeholder="사용자 이름 또는 해시태그 검색"
        onChange={(e) => searchSpace(e)}
        // onAddKeyword={handleAddKeyword}
        onKeyPress={onKeyPress}
      />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  max-width: 210px;
  height: 36px;
  display: flex;
  border-radius: 5px;
`;

const SearchIconWrapper = styled.div`
  width: 100%;
  max-width: 36px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchIcon = styled.img`
  margin-left: 16px;
  width: 12px;
  height: 12px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  background-color: #f2f2f2;
  border-radius: 0px 4px 4px 0px;
  &::placeholder {
    ${({ theme }) => theme.typography.bodySmRegular}
  }

  &:focus {
    outline: none;
  }
`;

export default SearchBar;
