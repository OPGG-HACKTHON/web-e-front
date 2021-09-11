export type likeDto = {
  userId: string;
  likeId: string;
  videoId: number;
};

export type fetchNewLikeUserType = {
  newLikeList: likeUserType[];
};

export type likeUserType = {
  userId: string;
  userName: string;
  userPhotoURL: null | string;
  userIntro: null | string;
};
