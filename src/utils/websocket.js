import ReconnectingWebSocket from 'reconnecting-websocket';
import Constants from 'expo-constants';
import RNConfig from 'react-native-config';
import EE from './eventEmit';
const { WSAPI_URl } = RNConfig;

// send(data: string | ArrayBuffer | Blob | ArrayBufferView)
// addEventListener(type: 'open' | 'close' | 'message' | 'error', listener: EventListener)
// removeEventListener(type:  'open' | 'close' | 'message' | 'error', listener: EventListener)

/*
### code（区分消息类型）定义
客户端到服务端：客户发送的消息code 必须以1开头,长度是4位
code	说明
1000	心跳
1001	问诊消息
1002	问诊聊天记录
1003	问诊消息已读
1004	问诊消息撤销


服务端到客户端：推送的消息 必须以3开头，长度位4位
code	说明
3001	消息送达确认
3002	消息查看确认
3003	系统默认等待消息
3004	问诊聊天消息
3005	问诊聊天记录
3006	问诊聊天记录
3007	问诊聊天记录
3009	异地登录
3500	站内信消息
*/

const deviceId = Constants.deviceId;

const options = {
  // connectionTimeout: 3000,
  debug: true,
};

// /imws-service/im/{用户类型}/{token}/{deviceId}
/* 用户类型：
医生 D 端 1
患者 C 端 2
*/

const userType = 2;

const ws = ({ token }) => {
  let timer = null;
  const rws = new ReconnectingWebSocket(
    `${WSAPI_URl}/imws-service/im/${userType}/${token}/${deviceId}`,
    [],
    options
  );

  // 连接成功每隔 1 分钟进行心跳检测
  rws.addEventListener('open', () => {
    EE.emit('wsState', { readyState: rws.readyState });
    timer = setInterval(() => {
      const data = { code: 1000 };
      // console.log(data, 'WS 心跳检测');
      rws.send(JSON.stringify(data));
    }, 60 * 1000);
  });

  rws.addEventListener('close', (error) => {
    EE.emit('wsState', { readyState: rws.readyState });
    timer && clearTimeout(timer);
  });

  rws.addEventListener('error', (err) => {
    EE.emit('wsState', { readyState: rws.readyState });
    err?.message.includes('403') && rws.close();
    timer && clearTimeout(timer);
  });

  const on = (type, fn) => {
    rws.addEventListener(type, fn);
  };
  const remove = (type, fn) => {
    rws.removeEventListener(type, fn);
  };
  const send = (data) => {
    if (typeof data === 'string') {
      rws.send(data);
    } else {
      rws.send(JSON.stringify(data));
    }
  };
  const close = () => rws.close();
  const reconnect = () => rws.reconnect();

  // 暴露给页面的方法
  return {
    on, // 事件监听, 如监听服务端推送的消息
    send, // 向服务器发送信息
    remove, // 移除监听事件
    reconnect, // 重新连接
    close, // 关闭连接
  };
};

export default ws;
