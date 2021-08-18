import {
  SELECT_LOL_TIER,
  SELECT_OVERWATCH_TIER,
  SELECT_PUBG_TIER,
} from 'atom/authAtom';
import Button from 'common/Button';
import SelectBox from 'common/SelectBox';
import useAuth from 'hooks/useAuth';
import { LOL_TIER, OVERWATCH_TIER, PUBG_TIER } from 'model/authModel';
import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { color, typography } from 'styles/theme';
import { EButtonType } from '../Register';

type Props = {
  pageHandler: (buttonType: EButtonType) => () => void;
};

enum EBottomButtonType {
  SKIP,
  REGISTER,
}

const AdditionalInfo = ({ pageHandler }: Props) => {
  const [selectLol, setSelectLol] = useRecoilState(SELECT_LOL_TIER);
  const [selectOverwatch, setSelectOverwatch] = useRecoilState(
    SELECT_OVERWATCH_TIER
  );
  const [selectPubg, setSelectPubg] = useRecoilState(SELECT_PUBG_TIER);

  const { handleRegister } = useAuth();

  const buttonProps = useMemo(
    () => ({
      [EBottomButtonType.SKIP]: {
        width: 38,
        height: 4,
        hoverBkgColor: color.white,
        onClick: () => '',
        fontColor: color.grayScale[500],
        bkgColor: color.white,
      },
      [EBottomButtonType.REGISTER]: {
        width: 38,
        height: 4,
        hoverBkgColor: color.yellow,
        onClick: handleRegister,
        fontColor: color.white,
        bkgColor: color.yellow,
      },
    }),
    [handleRegister]
  );

  return (
    <AdditionalInfoWrapper>
      <TopText>회원님의 게임 티어를 선택해주세요. 건너뛸 수 있습니다.</TopText>
      <SubText>프로필에 등급 아이콘이 노출됩니다.</SubText>
      <SelectWrapper>
        <div>
          <GameTitle>리그오브레전드 랭크 티어</GameTitle>
          <SelectBox
            stateValue={selectLol}
            setStateValue={setSelectLol}
            list={LOL_TIER}
            width="120px"
            height="40px"
            borderStyle={`1px solid ${color.grayScale[250]}`}
            backgroundColor={color.white}
            color={color.grayScale[500]}
            paddingStyle="10px 10px"
          />
        </div>
        <div>
          <GameTitle>배틀그라운드 랭크 티어</GameTitle>
          <SelectBox
            stateValue={selectPubg}
            setStateValue={setSelectPubg}
            list={PUBG_TIER}
            width="120px"
            height="40px"
            borderStyle={`1px solid ${color.grayScale[250]}`}
            backgroundColor={color.white}
            color={color.grayScale[500]}
            paddingStyle="10px 10px"
          />
        </div>
        <div>
          <GameTitle>오버워치 경쟁전 티어</GameTitle>
          <SelectBox
            stateValue={selectOverwatch}
            setStateValue={setSelectOverwatch}
            list={OVERWATCH_TIER}
            width="120px"
            height="40px"
            borderStyle={`1px solid ${color.grayScale[250]}`}
            backgroundColor={color.white}
            color={color.grayScale[500]}
            paddingStyle="10px 10px"
          />
        </div>
      </SelectWrapper>
      <ButtonWrapper>
        <Button
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...buttonProps[EBottomButtonType.SKIP]}
          text="건너뛰기"
          padding=""
          borderRadius={0.5}
          fontStyle={typography.bodyRgBold}
        />
        <Button
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...buttonProps[EBottomButtonType.REGISTER]}
          text="가입하기"
          padding=""
          borderRadius={0.5}
          fontStyle={typography.bodyRgBold}
        />
      </ButtonWrapper>
    </AdditionalInfoWrapper>
  );
};

export default AdditionalInfo;

const TopText = styled.div`
  ${({ theme }) => theme.typography.bodyRgBold};
  color: ${({ theme }) => theme.color.blackScale[50]};
`;

const SubText = styled.div`
  ${({ theme }) => theme.typography.bodySmRegular};
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-bottom: 20px;
`;

const GameTitle = styled.div`
  ${({ theme }) => theme.typography.bodyRgBold};
  color: ${({ theme }) => theme.color.blackScale[50]};
  margin-bottom: 6px;
`;

const SelectWrapper = styled.div`
  & > * + * {
    margin-top: 10px;
  }
`;

const AdditionalInfoWrapper = styled.div``;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  & > * + * {
    margin-top: 8px;
  }
`;
