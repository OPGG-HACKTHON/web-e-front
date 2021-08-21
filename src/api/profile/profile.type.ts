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
  followingsCounts: number;
};
