import customAxios from 'lib/axios';
import { uploadDto } from './upload.dto';

const upload = async (dto: uploadDto) => {
  const data = await customAxios.post('/videos', dto, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export default upload;
