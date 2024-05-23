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

export const updateTarif = async (formData) => {
  const { data } = await $host.put(`${API_URL}/tariffs/${formData.id}`, formData);
  return data;
};

export const deleteTarif = async (id) => {
  const { data } = await $host.delete(`${API_URL}/tariffs/${id}`);
  return data;
};

export const getTarifs = async () => {
  const { data } = await $host.get(`${API_URL}/tariffs`);
  return data;
};

export const refreshUser = async () => {
  const { data } = await axios.post(`${API_URL}/refresh`, {
    withCredentials: true,
  });
  return data;
};