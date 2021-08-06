import { ROOT_CONST } from '../constants';

type Payload = {
  isLoading?: boolean;
  isLogin?: boolean;
  token?: string;
};

export default (prevState: Payload, { type, payload }: { type: string; payload?: Payload }) => {
  const { token, ...rest } = payload;

  switch (type) {
    case ROOT_CONST.SIGN_IN:
      return {
        ...prevState,
        ...rest,
        isLogin: true,
        token,
      };

    case ROOT_CONST.SIGN_OUT:
      return {
        ...prevState,
        ...rest,
        isLogin: false,
        token: null,
      };

    case ROOT_CONST.RESTORE_TOKEN:
      return {
        ...prevState,
        ...rest,
        token,
        isLoading: false,
      };

    case ROOT_CONST.GET_LOGIN_INFO:
      return {
        ...prevState,
      };
  }
};
