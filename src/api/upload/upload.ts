import customAxios from 'lib/axios';
import { uploadDto } from './upload.dto';

const upload = async (dto: uploadDto) => {
  const formData = new FormData();
  formData.append('userId', dto.userId);
  formData.append('videoName', dto.videoName);
  formData.append('category', dto.category);
  formData.append('tags', dto.tags as string);
  formData.append('videoIntro', dto.videoIntro as string);
  formData.append('video', dto.video as Blob);

  const data = await customAxios.post('/videos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export default upload;
