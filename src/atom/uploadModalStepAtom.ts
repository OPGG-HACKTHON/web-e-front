import { atom } from 'recoil';
import { EUploadStep } from 'enum/uploadStep.enum';

// eslint-disable-next-line import/prefer-default-export
export const uploadModalStep = atom({
  key: 'uploadModalStep',
  default: EUploadStep.FIRST_STEP,
});
