import axios from "axios";

const fetcher = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const get = async (url: string) => {
  try {
    const raw = await fetcher.get(url);
    return raw.data;
  } catch (err) {
    throw err;
  }
};

export const post = async (url: string, data?: object, params?: object) => {
  try {
    const raw = await fetcher.post(url, data, {
      params,
    });
    return raw.data;
  } catch (err) {
    throw err;
  }
};

export const put = async (url: string, data?: object, params?: object) => {
  try {
    const raw = await fetcher.put(url, data, { params });
    return raw.data;
  } catch (err) {
    throw err;
  }
};

export const patch = async (url: string, data?: object, params?: object) => {
  try {
    const raw = await fetcher.patch(url, data, { params });
    return raw.data;
  } catch (err) {
    throw err;
  }
};

export const deleteCall = async (url: string) => {
  try {
    const raw = await fetcher.delete(url);
    return raw.data;
  } catch (err) {
    throw err;
  }
};
