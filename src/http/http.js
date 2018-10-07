import axios from 'axios';
import config from '@common/config';

let instance;
const interceptors = [];

function createInstance (response, request) {
  instance = axios.create({
    baseURL: config.baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    responseType: 'json',
    validateStatus: function (status) {
      return status >= 200 && status <= 500;
    }
  });
  interceptors.forEach((interceptor) => useInterceptors(interceptor));
}

function useInterceptors (interceptor) {
  if (!instance) {
    return interceptors.push(interceptor);
  }
  if (interceptor.request) instance.interceptors.request.use(interceptor.request, interceptor.error);
  if (interceptor.response) instance.interceptors.response.use(interceptor.response, interceptor.error);
}

const http = {
  use (interceptor) {
    useInterceptors(interceptor);
    return this;
  }
};

['get', 'post', 'put', 'delete', 'patch'].forEach((method) => {
  http[method] = (url, data, config) => {
    if (!instance) createInstance();
    return instance.request({
      url,
      method,
      data,
      params: method === 'get' ? data : {},
      ...config
    });
  };
});

http.upload = function (url, files, params = {}, config = {}) {
  const formData = new FormData();
  const name = config.name || 'file';
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key]);
  });
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append(name, files[i], files[i].othername || files[i].name);
    }
  } else {
    formData.append(name, files);
  }
  return http.post(url, formData, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Cache-Control': 'no-cache'
    }
  });
};

export default http;
