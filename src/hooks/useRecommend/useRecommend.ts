/* eslint-disable */
import { useCallback, useState, useEffect, useMemo } from 'react';
import { getRecommendVideos } from 'api/recommend/recommend';
import { IVideoPayload } from 'common/VideoList/VideoList';

const useRecommend = () => {
  const [recommends, setRecommends] = useState<IVideoPayload[]>([]);
  const [lolRecommends, setLol] = useState<IVideoPayload[]>([]);
  const [overwatchRecommends, setOverWatch] = useState<IVideoPayload[]>([]);
  const [pubgRecommends, setPubg] = useState<IVideoPayload[]>([]);

  const handleRecommend = useCallback(async () => {
    try {
      const res = await getRecommendVideos();
      const lol = res.lolRecommand;
      const ow = res.watchRecommand;
      const pg = res.pubgRecommand;
      console.log(lol, ow, pg);
      setLol(lol);
      setOverWatch(ow);
      setPubg(pg);
      return res;
    } catch (err) {
      return err;
    }
  }, []);

  useEffect(() => {
    handleRecommend();
  }, [handleRecommend]);

  return {
    recommends,
    lolRecommends,
    overwatchRecommends,
    pubgRecommends,
    handleRecommend,
  };
};

export default useRecommend;
