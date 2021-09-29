import axios from "axios";

const fetcher = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

export const get = async (url: string) => {
  try {
    const raw = await fetcher.get(url, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return raw.data;
  } catch (err) {
    throw err;
  }
};

export const post = async (
  url: string,
  data?: object,
  params?: object,
  formData = false
) => {
  try {
    const raw = await fetcher.post(url, data, {
      params,
      headers: {
        "Content-Type": formData ? "multipart/form-data" : "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return raw.data;
  } catch (err) {
    throw err;
  }
};

export const put = async (url: string, data?: object, params?: object) => {
  try {
    const raw = await fetcher.put(url, data, {
      params,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return raw.data;
  } catch (err) {
    throw err;
  }
};

export const patch = async (url: string, data?: object, params?: object) => {
  try {
    const raw = await fetcher.patch(url, data, {
      params,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return raw.data;
  } catch (err) {
    throw err;
  }
};

export const deleteCall = async (url: string) => {
  try {
    const raw = await fetcher.delete(url, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return raw.data;
  } catch (err) {
    throw err;
  }
};
