import * as React from 'react';

import { getUserInfo } from '../api';

export default function useUserInfo({ userId }: { userId: string }) {
  const [userInfo, setUserInfo] = React.useState({});
  React.useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      const { result, data, message } = await getUserInfo.fetch(userId);
      if (result === 'success' && !ignore) {
        setUserInfo(data);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [userId]);

  return userInfo;
}
