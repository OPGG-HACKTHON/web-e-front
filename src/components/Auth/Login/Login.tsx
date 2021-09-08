/* eslint-disable indent */
import { CloseIcon } from '@class101/ui';
import { loginDto } from 'api/auth/auth.dto';
import Button from 'common/Button';
import Input from 'common/Input';
import useInput from 'hooks/useInput/useInput';
import React, { SetStateAction, Dispatch, useMemo } from 'react';
import styled from 'styled-components';
import { color, typography } from 'styles/theme';
/* eslint-disable react/jsx-props-no-spreading */
type Props = {
  closeModal: () => void;
  value: loginDto;
  setValue: Dispatch<SetStateAction<loginDto>>;
  login: () => void;
  status: number;
  goToRegister: () => void;
};

enum EInputType {
  ID,
  PW,
}

const Login = ({
  closeModal,
  value,
  setValue,
  login,
  status,
  goToRegister,
}: Props) => {
  const [inputLogin] = useInput<loginDto>();

  const inputCommonStyle = useMemo(
    () => ({
      [EInputType.ID]: {
        height: '40px',
        placeHolder: '아이디를 입력해 주세요.',
        placeHolderFontSize: '1.2rem',
        borderRadius: '5px',
        borderStyle: `1px solid ${color.grayScale[250]}`,
        backgroundColor: color.grayScale[50],
        placeHolderColor: color.grayScale[500],
        fontSize: '1.2rem',
      },
      [EInputType.PW]: {
        height: '40px',
        placeHolder: '비밀번호를 입력해 주세요.',
        placeHolderFontSize: '1.2rem',
        borderRadius: '5px',
        borderStyle: `1px solid ${color.grayScale[250]}`,
        backgroundColor: color.grayScale[50],
        placeHolderColor: color.grayScale[500],
        fontSize: '1.2rem',
      },
    }),
    []
  );

  const loginButtonStyle = useMemo(() => {
    return value.userId.length <= 0 || value.userPassword.length <= 0
      ? {
          fontColor: color.grayScale[500],
          bkgColor: color.grayScale[50],
          hoverBkgColor: color.grayScale[50],
        }
      : {
          fontColor: color.white,
          bkgColor: color.yellow,
          onClick: login,
        };
  }, [login, value.userId.length, value.userPassword.length]);

  return (
    <LoginWrapper>
      <TopWrapper>
        <TopText>왓플-WATPL에 로그인</TopText>
        <CloseIconWrapper onClick={closeModal}>
          <CloseIconItem size={20} />
        </CloseIconWrapper>
      </TopWrapper>
      <InputElementWrapper>
        <InputWrapper>
          <LabelText>아이디</LabelText>
          <Input
            {...inputCommonStyle[EInputType.ID]}
            inputType="text"
            value={value.userId}
            onChange={(e) => inputLogin(e, setValue)}
            name="userId"
            paddingStyle="9px"
            focusOutline={`1px solid ${color.yellow}`}
            focusBackgroundColor={color.white}
          />
        </InputWrapper>
        <InputWrapper>
          <LabelText>비밀번호</LabelText>
          <Input
            {...inputCommonStyle[EInputType.PW]}
            inputType="password"
            value={value.userPassword}
            onChange={(e) => inputLogin(e, setValue)}
            name="userPassword"
            paddingStyle="9px"
            focusOutline={`1px solid ${color.yellow}`}
            focusBackgroundColor={color.white}
          />
        </InputWrapper>
      </InputElementWrapper>
      <WarningText>
        {status === 401 || status === 400 || status === 404
          ? '⚠︎ ID가 존재하지 않거나 비밀번호가 일치하지 않습니다. 다시 시도해주세요.'
          : ''}
      </WarningText>
      <ButtonWrapper>
        <Button
          text="로그인"
          {...loginButtonStyle}
          width={38}
          height={4}
          padding="0"
          fontStyle={typography.bodySmBold}
          borderRadius={0.5}
        />
      </ButtonWrapper>
      <RegisterButton onClick={goToRegister}>
        <RegisterOfferText>계정이 없으신가요?</RegisterOfferText>
        <RegisterJoinText>가입하기</RegisterJoinText>
      </RegisterButton>
    </LoginWrapper>
  );
};

export default Login;

const RegisterButton = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.color.yellow};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
`;

const RegisterOfferText = styled.div`
  ${({ theme }) => theme.typography.bodyRg};
`;

const RegisterJoinText = styled.div`
  ${({ theme }) => theme.typography.bodyRgBold};
  text-decoration: underline;
  margin-left: 4px;
`;

const WarningText = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.red};
  ${({ theme }) => theme.typography.bodySmRegular}
  padding: 0px 40px;
`;

const LoginWrapper = styled.div`
  width: 460px;
  height: 405px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 5px;
  position: relative;
`;

const TopWrapper = styled.div`
  width: 100%;
  height: 66px;
  margin-bottom: 18px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[250]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopText = styled.div`
  ${({ theme }) => theme.typography.headRgBold}
`;

const CloseIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CloseIconItem = styled(CloseIcon)`
  position: absolute;
  right: 20px;
`;

const InputElementWrapper = styled.div`
  width: 100%;
  height: 142px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 40px;
`;

const InputWrapper = styled.div``;

const LabelText = styled.div`
  ${({ theme }) => theme.typography.bodyRgBold};
  margin-bottom: 6px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;
