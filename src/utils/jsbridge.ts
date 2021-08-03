function fn(window) {
  const f = () => {};
  function JSBridge() {
    this.callbacks = {};
  }

  JSBridge.prototype = {
    constructor: JSBridge,

    /**
     * @param {type} 调 RN 的服务标识
     * @param {params 可选} 向 RN 传递参数
     * @param {callback} RN web 端的回调
     */
    callNative(type, params = null, callback = f) {
      const paramsIsFn = typeof params === 'function';
      if (paramsIsFn) {
        callback = params;
      }
      const callbackId = `${type}:cb${Date.now()}`;
      const postMsg = paramsIsFn ? { type, callbackId } : { type, params, callbackId };
      window.ReactNativeWebView.postMessage(JSON.stringify(postMsg));
      this.callbacks[callbackId] = callback;
    },
    callWeb({ callbackId, params }) {
      const callback = this.callbacks[callbackId];
      callback && callback.call(this, params);
    },
    appCallback(data) {
      const _data = typeof data === 'string' ? JSON.parse(data) : data;
      const { type, params } = _data;
      if (type === 'appInfo') {
        this.appInfo = params; // 初始化时注入 app 相关信息，如 app 版本等
      } else {
        this.callWeb(_data);
      }
    },
  };

  window.AppJSBridge = new JSBridge();
}

export default fn;
