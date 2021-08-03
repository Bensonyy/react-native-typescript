const isProd = process.env.NODE_ENV === 'production';

export const config = {
  name: 'create-rn-app', // 项目名称
  aesKey: '4xITplHmgQezu630', // 加密密钥
  privateKey:
    'MOoL41B2PfLqzbFvsNHc0RE8t7uEIoeeryQDCTEs0pULXsCnUss87Qa7DnpyCvbMRHcqCEAnqF4S7wMJgHfWMVZMOTVWyNdvD6a7aNb5ZZba0sUtoqoBgCfrSXPXUZ0d',
  appName: 'GSYS',
  version: 'V0.11.1',
  schemeUrl: 'benson://myapp', // 协议名 benson, host myapp
};

export const swrOptions = {
  errorRetryCount: isProd ? 5 : 0,
  refreshInterval: isProd ? 3000 : 0,
};
