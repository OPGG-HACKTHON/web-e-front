export type uploadDto = {
  userId: string;
  videoName: string;
  category: string;
  videoIntro?: string;
  video: unknown;
  hashtags?: string;
};
