import customAxios from 'lib/axios';
import { uploadDto } from './upload.dto';

const upload = async (dto: uploadDto) => {
  const data = await customAxios.post('/videos', dto);

  return data;
};

export default upload;
