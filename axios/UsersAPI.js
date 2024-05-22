import axios from "axios";
import $host, { API_URL } from "./$host";

export const signIn = async (user) => {
  const { data } = await axios.post(`${API_URL}/login`, {
    email: user.email,
    password: user.password,
  });
  return data;
};

export const refreshUser = async () => {
  const { data } = await axios.get(`${API_URL}/refresh`)
  return data;
};