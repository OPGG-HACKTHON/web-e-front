/* eslint-disable  */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-useless-escape */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Input from 'common/Input';
import useInput from 'hooks/useInput/useInput';
import Button from 'common/Button';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { registerDto } from 'api/auth/auth.dto';
import { registerStatusAtom, userInfo } from 'atom/authAtom';
import { color, typography } from 'styles/theme';
import { EButtonType } from '../Register';

enum EInputType {
  userId,
  userName,
  userPassword,
}
type Props = {
  pageHandler: (buttonType: EButtonType) => () => void;
};
const UserInfoInput = ({ pageHandler }: Props) => {
  const [inputRegister] = useInput<registerDto>();
  const [registerObj, setRegisterObj] = useRecoilState(userInfo);
  const setRegisterStatus = useSetRecoilState(registerStatusAtom);

  const regName = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
  const regPassword = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"\_]/gi;

  useEffect(() => {
    setRegisterStatus(0);
  }, []);

  const commonInputStyle = useMemo(() => {
    return {
      height: '40px',
      placeHolderFontSize: '1.2rem',
      borderRadius: '5px',
      borderStyle: `1px solid ${color.grayScale[250]}`,
      backgroundColor: color.grayScale[50],
      placeHolderColor: color.grayScale[500],
      fontSize: '1.2rem',
    };
  }, []);

  const inputStyle = useMemo(
    () => ({
      [EInputType.userId]: {
        ...commonInputStyle,
        placeHolder: '아이디를 입력해 주세요.',
      },
      [EInputType.userPassword]: {
        ...commonInputStyle,
        placeHolder: '비밀번호를 입력해 주세요.',
      },
      [EInputType.userName]: {
        ...commonInputStyle,
        placeHolder: '닉네임을 입력해 주세요.',
      },
    }),
    [commonInputStyle]
  );

  const checkPasswordLength = useCallback(() => {
    if (
      registerObj.userPassword.length >= 8 &&
      registerObj.userPassword.length < 21
    ) {
      return true;
    }
    return false;
  }, [registerObj.userPassword.length]);

  const buttonProps = useMemo(() => {
    if (
      registerObj.userId.length >= 3 &&
      registerObj.userName.length >= 3 &&
      registerObj.userPassword.length >= 8 &&
      registerObj.userName.match(regName) === null &&
      regPassword.test(registerObj.userPassword.slice())
    ) {
      return {
        width: 38,
        height: 4,
        hoverBkgColor: color.yellow,
        onClick: pageHandler(EButtonType.NEXT),
        fontColor: color.white,
        bkgColor: color.yellow,
      };
    }
    return {
      width: 38,
      height: 4,
      hoverBkgColor: color.grayScale[50],
      onClick: () => '',
      fontColor: color.grayScale[500],
      bkgColor: color.grayScale[50],
    };
  }, [
    regName,
    regPassword,
    registerObj.userId.length,
    registerObj.userName,
    registerObj.userPassword,
  ]);

  registerObj.userPassword.match(regPassword);
  return (
    <UserInfoInputWrapper>
      <InputWrapper>
        <div>
          <LabelText>아이디</LabelText>
          <Input
            {...inputStyle[EInputType.userId]}
            inputType="text"
            value={registerObj.userId}
            onChange={(e) => inputRegister(e, setRegisterObj)}
            name="userId"
            paddingStyle="9px"
            focusOutline={`1px solid ${color.yellow}`}
            focusBackgroundColor={color.white}
          />
          {registerObj.userId.length >= 1 &&
          (registerObj.userId.length < 3 || registerObj.userId.length > 20) ? (
            <NoticeProvision>
              ⚠︎ 최소 3자 이상 최대 20자 이하로 작성해주시기 바랍니다.
            </NoticeProvision>
          ) : (
            ''
          )}
        </div>
        <div>
          <LabelText>닉네임</LabelText>
          <Input
            {...inputStyle[EInputType.userId]}
            inputType="text"
            value={registerObj.userName}
            onChange={(e) => inputRegister(e, setRegisterObj)}
            name="userName"
            paddingStyle="9px"
            focusOutline={`1px solid ${color.yellow}`}
            focusBackgroundColor={color.white}
          />
          {(registerObj.userName.length >= 1 &&
            registerObj.userName.length < 3) ===
          !regName.test(registerObj.userName.slice()) ? (
            <NoticeProvision>
              ⚠︎ 최소 3자이상 영문자, 숫자, _ 만 입력 가능합니다.
            </NoticeProvision>
          ) : null}
        </div>
        <div>
          <LabelText>비밀번호</LabelText>
          <div>
            <Input
              {...inputStyle[EInputType.userPassword]}
              inputType="password"
              value={registerObj.userPassword}
              onChange={(e) => inputRegister(e, setRegisterObj)}
              name="userPassword"
              paddingStyle="9px"
              focusOutline={`1px solid ${color.yellow}`}
              focusBackgroundColor={color.white}
            />
            <PasswordWrapper>
              {registerObj.userPassword.length >= 1 ? (
                <>
                  <PasswordNotice>비밀번호 필수 포함 항목</PasswordNotice>
                  <CheckPasswordNotice isAllow={checkPasswordLength()}>
                    ✓ 8~20자
                  </CheckPasswordNotice>
                  <CheckPasswordNotice
                    isAllow={regPassword.test(registerObj.userPassword.slice())}
                  >
                    ✓ 문자, 숫자, 특수문자
                  </CheckPasswordNotice>
                </>
              ) : (
                ''
              )}
            </PasswordWrapper>
          </div>
        </div>
        <Button
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...buttonProps}
          text="다음"
          padding=""
          borderRadius={0.5}
          fontStyle={typography.bodyRgBold}
        />
      </InputWrapper>
    </UserInfoInputWrapper>
  );
};

export default UserInfoInput;

const UserInfoInputWrapper = styled.div``;

const InputWrapper = styled.div`
  width: 100%;
  & > * + * {
    margin-top: 10px;
  }
`;

const LabelText = styled.div`
  ${({ theme }) => theme.typography.bodyRgBold};
  margin-bottom: 6px;
`;

const NoticeProvision = styled.div`
  ${({ theme }) => theme.typography.bodySmRegular};
  color: ${({ theme }) => theme.color.red};
`;

const PasswordWrapper = styled.div`
  height: 60px;
  margin-bottom: 54px;
`;

const PasswordNotice = styled.div`
  color: ${({ theme }) => theme.color.grayScale[500]};
  ${({ theme }) => theme.typography.bodySmRegular}
`;

const CheckPasswordNotice = styled.div<{ isAllow: boolean }>`
  ${({ theme }) => theme.typography.bodySmRegular}
  color: ${({ isAllow, theme }) =>
    isAllow ? theme.color.grayScale[500] : theme.color.red}
`;
