import axios from "axios";
import $host, { API_URL } from "./$host";

export const signIn = async (user) => {
  const { data } = await axios.post(`${API_URL}/login`, {
    email: user.email,
    password: user.password,
  });
  return data;
};

export const createTarif = async (formData) => {
  const { data } = await $host.post(`${API_URL}/tariffs`, {
    tariff_name: formData.tarif,
    tariff_price: formData.price,
    expectation: formData.time,
    price_for_expectation: formData.waiting
  });
  return data;
};

export const refreshUser = async () => {
  const { data } = await axios.post(`${API_URL}/refresh`, {
    withCredentials: true,
  });
  return data;
};