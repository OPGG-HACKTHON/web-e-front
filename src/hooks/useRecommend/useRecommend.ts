/* eslint-disable */
import { useCallback, useState, useEffect, useMemo } from 'react';
import { getRecommendVideos } from 'api/recommend/recommend';
import { IVideoPayload } from 'common/VideoList/VideoList';

const useRecommend = () => {
  const [recommends, setRecommends] = useState({});
  const [lolRecommends, setLol] = useState<IVideoPayload[]>([]);
  const [overwatchRecommends, setOverWatch] = useState([]);
  const [pubgRecommends, setPubg] = useState([]);

  const handleRecommend = useCallback(async () => {
    try {
      const res = await getRecommendVideos();
      const { data } = res.datas;

      setRecommends(data);
      // console.log(data?.lolRecommand);
      setLol(data?.lolRecommand);
      setOverWatch(data?.overwatchRecommand);
      setPubg(data?.pubgRecommand);
      return data;
    } catch (err) {
      console.log(err);
    }
  }, []);

  return {
    recommends,
    lolRecommends,
    overwatchRecommends,
    pubgRecommends,
    handleRecommend,
  };
};

export default useRecommend;
