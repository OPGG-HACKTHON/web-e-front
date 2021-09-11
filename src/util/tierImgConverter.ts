import LOL_U from 'assets/svg/Tier/LOL/롤 - 언랭크티어.svg';
import LOL_I from 'assets/svg/Tier/LOL/롤 - 아이언티어.svg';
import LOL_B from 'assets/svg/Tier/LOL/롤 - 브론즈티어.svg';
import LOL_S from 'assets/svg/Tier/LOL/롤 - 실버티어.svg';
import LOL_G from 'assets/svg/Tier/LOL/롤 - 골드티어.svg';
import LOL_P from 'assets/svg/Tier/LOL/롤 - 플래티넘티어.svg';
import LOL_D from 'assets/svg/Tier/LOL/롤 - 다이아몬드티어.svg';
import LOL_M from 'assets/svg/Tier/LOL/롤 - 마스터티어.svg';
import LOL_GM from 'assets/svg/Tier/LOL/롤 - 그랜드마스터티어.svg';
import LOL_C from 'assets/svg/Tier/LOL/롤 - 챌린저티어.svg';

import PUBG_U from 'assets/svg/Tier/PUBG/배그 - 언랭크티어.svg';
import PUBG_B from 'assets/svg/Tier/PUBG/배그 - 브론즈티어.svg';
import PUBG_S from 'assets/svg/Tier/PUBG/배그 - 실버티어.svg';
import PUBG_G from 'assets/svg/Tier/PUBG/배그 - 골드티어.svg';
import PUBG_P from 'assets/svg/Tier/PUBG/배그 - 플래티넘티어.svg';
import PUBG_D from 'assets/svg/Tier/PUBG/배그 - 다이아몬드티어.svg';
import PUBG_M from 'assets/svg/Tier/PUBG/배그 - 마스터티어.svg';

import WATCH_U from 'assets/svg/Tier/WATCH/옵치 - 언랭크티어.svg';
import WATCH_B from 'assets/svg/Tier/WATCH/옵치 - 브론즈티어.svg';
import WATCH_S from 'assets/svg/Tier/WATCH/옵치 - 실버티어.svg';
import WATCH_G from 'assets/svg/Tier/WATCH/옵치 - 골드티어.svg';
import WATCH_P from 'assets/svg/Tier/WATCH/옵치 - 플래티넘티어.svg';
import WATCH_D from 'assets/svg/Tier/WATCH/옵치 - 다이아몬드티어.svg';
import WATCH_M from 'assets/svg/Tier/WATCH/옵치 - 마스터티어.svg';
import WATCH_GM from 'assets/svg/Tier/WATCH/옵치 - 그랜드마스터티어.svg';
import WATCH_R from 'assets/svg/Tier/WATCH/옵치 - 상위 500위.svg';

export const lolTierImgConverter = (tier: string) => {
  switch (tier) {
    case 'UNRANKED':
      return LOL_U;
    case 'IRON':
      return LOL_I;
    case 'BRONZE':
      return LOL_B;
    case 'SILVER':
      return LOL_S;
    case 'GOLD':
      return LOL_G;
    case 'PLATINUM':
      return LOL_P;
    case 'DIAMOND':
      return LOL_D;
    case 'MASTER':
      return LOL_M;
    case 'GRANDMASTER':
      return LOL_GM;
    case 'CHALLENGER':
      return LOL_C;
    default:
      return tier;
  }
};

export const pubgTierImgConverter = (tier: string) => {
  switch (tier) {
    case 'UNRANKED':
      return PUBG_U;
    case 'BRONZE':
      return PUBG_B;
    case 'SILVER':
      return PUBG_S;
    case 'GOLD':
      return PUBG_G;
    case 'PLATINUM':
      return PUBG_P;
    case 'DIAMOND':
      return PUBG_D;
    case 'MASTER':
      return PUBG_M;
    default:
      return tier;
  }
};

export const watchTierImgConverter = (tier: string) => {
  switch (tier) {
    case 'UNRANKED':
      return WATCH_U;
    case 'BRONZE':
      return WATCH_B;
    case 'SILVER':
      return WATCH_S;
    case 'GOLD':
      return WATCH_G;
    case 'PLATINUM':
      return WATCH_P;
    case 'DIAMOND':
      return WATCH_D;
    case 'MASTER':
      return WATCH_M;
    case 'GRANDMASTER':
      return WATCH_GM;
    case 'RANKER':
      return WATCH_R;
    default:
      return tier;
  }
};
