export type followDto = {
  userId: string;
  followingId: string;
};

export type fetchNewFollowerType = {
  followers: followerType[];
};

export type followerType = {
  userId: string;
  userName: string;
  userPhotoURL: null | string;
  userIntro: null | string;
};
