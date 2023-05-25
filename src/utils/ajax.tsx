import axios from "axios";
import { Toast } from 'antd-mobile';

axios.defaults.timeout = 100000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = true;
axios.defaults.withCredentials = true;

// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = "http://127.0.0.1:3000/api";

// http request 拦截
axios.interceptors.request.use((config: any) => {
  return {
    ...config,
    data: JSON.stringify(config.data),
  };
});

// http response 拦截
axios.interceptors.response.use(
  (response) => {
    if (response.data.errorCode !== 0) {
      Toast.show({
        icon: 'fail',
        content: response.data.errorMessage || '请求失败',
      })
    }
    return response;
  },
  (error) => {
    console.log("请求出错", error);
  }
);

// 封装get方法
export const get = (url: string, params: any = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api' + url, { params })
      .then((response) => {
        console.log(resolve);
        // landing(url, params, response.data);
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.post('/api' + url, data).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
};

// 封装patch
export const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.patch('/api' + url, data).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
};

export const put = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.put('/api' + url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
};

//统一接口处理，返回数据
export default (fecth, url, param) => {
  let _data = "";
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case "get":
        console.log("begin a get request,and url:", url);
        get(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request GET failed.", error);
            reject(error);
          });
        break;
      case "post":
        post(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request POST failed.", error);
            reject(error);
          });
        break;
      default:
        break;
    }
  });
}

//失败提示
const msag = (err) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        alert(err.response.data.error.details);
        break;
      case 401:
        alert("未授权，请登录");
        break;

      case 403:
        alert("拒绝访问");
        break;

      case 404:
        alert("请求地址出错");
        break;

      case 408:
        alert("请求超时");
        break;

      case 500:
        alert("服务器内部错误");
        break;

      case 501:
        alert("服务未实现");
        break;

      case 502:
        alert("网关错误");
        break;

      case 503:
        alert("服务不可用");
        break;

      case 504:
        alert("网关超时");
        break;

      case 505:
        alert("HTTP版本不受支持");
        break;
      default:
    }
  }
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
const landing = (url, params, data) => {
  if (data.code === -1) {
  }
}





