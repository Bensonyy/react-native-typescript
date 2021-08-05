import * as React from 'react';

import { getUserInfo } from '../api';

export default function useUserInfo({ userId = '' } = {}) {
  const [userInfo, setUserInfo] = React.useState({});
  React.useEffect(() => {
    const fetchData = async () => {
      const { result, data, message } = await getUserInfo.fetch(userId);
      if (result === 'success') {
        setUserInfo(data);
      }
    };
    fetchData();
    return () => {};
  }, [userId]);

  return userInfo;
}
