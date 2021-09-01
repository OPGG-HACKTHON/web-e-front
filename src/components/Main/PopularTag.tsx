/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Button from 'common/Button';
import { typography } from 'styles/theme';
import { useRecoilState, useRecoilValue } from 'recoil';
import { popTagsState } from 'atom/videoListAtom';
import { searchAreaAtom } from 'atom/searchAreaAtom';
import Close from 'assets/svg/tag_close.svg';

const PopularTag = () => {
  const themeStyle = useContext(ThemeContext);
  const popularTags = useRecoilValue(popTagsState);

  const [keywordsArr, setKeywordsArr] = useRecoilState(searchAreaAtom);
  console.log(keywordsArr);

  const handleRemoveKeyword = (id) => {
    const nextKeyword = keywordsArr.filter((thisKeyword) => {
      return thisKeyword.id !== id;
    });
    console.log(id);

    setKeywordsArr(nextKeyword);
  };

  return (
    <TagWrapper>
      {keywordsArr.map(({ id, keywords }) => (
        <HistoryButton key={id} onClick={() => console.log(`${keywords}`)}>
          {keywords}
          <span onClick={() => handleRemoveKeyword(id)}>
            <img src={Close} alt="alt" />
          </span>
        </HistoryButton>
      ))}
      {popularTags.map((tag) => (
        <Button
          key={popularTags.indexOf(`${tag}`)}
          text={`#${tag}`}
          onClick={() => console.log(`${tag}`)}
          fontColor={themeStyle.color.blackScale[50]}
          bkgColor={themeStyle.color.grayScale[50]}
          padding="0.8rem 0.7rem"
          height={3}
          borderRadius={0.5}
          fontStyle={typography.bodyRg}
          hoverBkgColor={themeStyle.color.grayScale[250]}
        />
      ))}
    </TagWrapper>
  );
};

export default PopularTag;

const TagWrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: pre;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  img {
    margin-left: 5px;
    margin-bottom: 2px;
  }

  button {
    margin: 0 ${({ theme }) => theme.margins.xs} 0
      ${({ theme }) => theme.margins.xs};
    vertical-align: middle;
    text-align: center;
    line-height: 100%;
  }
`;

const HistoryButton = styled.button`
  color: ${({ theme }) => theme.color.blackScale[50]};
  background-color: ${({ theme }) => theme.color.yellow};
  width: max-content;
  height: 3rem;
  border-radius: 0.5rem;
  padding: 0.8rem 0.7rem;
  cursor: pointer;
  border: none;
  transition: all 0.1s ease-out;
`;
