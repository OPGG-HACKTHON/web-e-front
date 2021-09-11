export type myProfileType = {
  email: string;
  feed: string;
  id: string | null;
  intro: string | null;
  lolTier: string;
  photo: string | null;
  pubgTier: string;
  role: string;
  watchTier: string;
};

// type followersList = {};
export type follwerType = {
  followers: [];
  followersCount: number;
};

export type follwingType = {
  followings: [];
  followingsCount: number;
};

export type editProfileUserInputType = {
  userName: string;
  intro: string;
};

export type fetchProfileType = {
  data: {
    data: profileType;
  };
};

export type profileType = {
  userId: string;
  userName: string;
  userPhotoURL: null | string;
  userCoverURL: null | string;
  userColor: null | string;
  userFeed: string;
  lolTier: string;
  pubgTier: string;
  watchTier: string;
  userIntro: null | string;
  userLolId: null | string;
  userWatchId: null | string;
  userPubgId: null | string;
  userRole: string;
  followerCount: number;
  isPro: boolean;
  loginAt: string;
};

export type patchProfileDto = {
  userName?: string;
  userPassword?: string;
  userPhotoURL?: null | string;
  userCoverURL?: null | string;
  userColor?: null | string;
  userFeed?: string;
  lolTier?: string;
  pubgTier?: string;
  watchTier?: string;
  userIntro?: null | string;
  userLolId?: null | string;
  userWatchId?: null | string;
  userPubgId?: null | string;
};

export type gameNickNameType = {
  lol: string;
  pubg: string;
};

export type follwerListType = {
  userId: string;
  userIntro: null | string;
  userName: string;
  userPhotoURL: null | string;
};

export type followingListType = {
  userId: string;
  userIntro: null | string;
  userName: string;
  userPhotoURL: null | string;
};
