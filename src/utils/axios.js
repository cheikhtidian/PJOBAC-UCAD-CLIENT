import axios from 'axios';
import store from '@/store';
import router from '@/router'

window.axios = axios;
const lang = localStorage.getItem('lang'); 
const  refreshtokenURL = '/auth/v1/refresh-token';

//document.documentElement.lang =lang;
//console.log(this.$state.lang)
const defaultOptions = {
  //baseURL: process.env.VUE_APP_BASE_API+'/ipms/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': lang,
    'X-localization': lang,
  }
};
let axiosInstance = axios.create(defaultOptions);


axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function(response) {
    return response;
  },
  async function(error) {
    const originalRequest = error.config;
    if ( error.response.status === 401 && originalRequest.url.includes(refreshtokenURL)) {
      store.commit("user/resetCredentials");
      router.push("/login");
      return Promise.reject(error);
    } else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await store.dispatch("user/refreshToken");
      const token = localStorage.getItem('token');
      error.config.headers.Authorization =  `Bearer ${token}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

