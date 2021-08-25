import React from 'react';
import styled from 'styled-components';

const EditProfile = () => {
  return (
    <EditProfileWrapper>
      <EditProfileNav>
        <Item>프로필 편집</Item>
        <Item>티어 변경</Item>
      </EditProfileNav>
      <div>editProfile</div>
    </EditProfileWrapper>
  );
};

export default EditProfile;

const EditProfileWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const EditProfileNav = styled.div`
  margin-top: 25px;
  width: 210px;
  height: 100px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.white};
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  border-left: 1px solid red;
  padding: 0px 30px;
  margin: 10px 0px;
`;
