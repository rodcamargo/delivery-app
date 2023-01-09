import axios from 'axios';

const api = axios.create({
  baseURL: `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT || '3001'}`,
});

export const setToken = () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  api.defaults.headers.common.Authorization = token;
};

export const requestGet = async (endpoint, body = []) => {
  const { data } = await api.get(endpoint, body);
  return data;
};

export const requestPost = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestPatch = async (endpoint, body) => {
  const { data } = await api.patch(endpoint, body);
  return data;
};

export const requestDelete = async (endpoint) => {
  await api.delete(endpoint);
};

export default api;
