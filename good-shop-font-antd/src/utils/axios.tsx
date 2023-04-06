import axios from 'axios';
import { Toast } from 'antd-mobile';
import { useRef } from 'react';

axios.defaults.withCredentials = true;

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? '//localhost:28019/api/v1' : '//localhost:28019/api/v1';

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers['token'] = localStorage.getItem('token') || '';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 拦截器
axios.interceptors.response.use((res) => {
  if (typeof res.data !== 'object') {
    Toast.show('服务端异常！');
    return Promise.reject(res);
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) {
      Toast.show(res.data.message);
    }
    if (res.data.resultCode == 416) {
      window.location.replace('/login');
    }
    if (res.data.data && window.location.pathname.split('/v')[1] === '/login') {
      window.localStorage.setItem('token', res.data.data);
      axios.defaults.headers['token'] = res.data.data;
    }

    return Promise.reject(res.data);
  }

  return Promise.resolve(res.data);
});

// axios的get请求
export function getAxios(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err, '1');
        reject(err);
      });
  });
}

// axios的post请求
export function postAxios(url: string, data: any) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'post',
      data,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default axios;
