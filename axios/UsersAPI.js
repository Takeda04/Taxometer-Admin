import axios from "axios";
import $host, { API_URL } from "./$host";

export const signIn = async (user) => {
  const { data } = await axios.post(`${API_URL}/login`, {
    email: user.email,
    password: user.password,
  });
  return data;
};
//create
export const createTarif = async (formData) => {
  const { data } = await $host.post(`${API_URL}/tariffs`, {
    tariff_name: formData.tarif,
    tariff_price: formData.price,
    expectation: formData.time,
    price_for_expectation: formData.waiting
  });
  return data;
};

export const createCar = async (formData) => {
  const { data } = await $host.post(`${API_URL}/carTypes`, formData);
  return data;
};

export const createDriver = async (formData) => {
  const { data } = await $host.post(`${API_URL}/drivers`, formData);
  return data;
};
//update
export const updateTarif = async (formData) => {
  const { data } = await $host.put(`${API_URL}/tariffs/${formData.id}`, formData);
  return data;
};

export const updateCar = async (formData) => {
  const { data } = await $host.put(`${API_URL}/carTypes/${formData.id}`, {
    name: formData.name
  });
  return data;
};
//delete
export const deleteTarif = async (id) => {
  const { data } = await $host.delete(`${API_URL}/tariffs/${id}`);
  return data;
};

export const deleteCar = async (id) => {
  const { data } = await $host.delete(`${API_URL}/carTypes/${id}`);
  return data;
};
//get
export const getTarifs = async () => {
  const { data } = await $host.get(`${API_URL}/tariffs`);
  return data;
};

export const getDrivers = async (page) => {
  const { data } = await $host.get(`${API_URL}/drivers?page=${page}`);
  return data;
};

export const getCars = async (page) => {
  const { data } = await $host.get(`${API_URL}/carTypes`);
  return data;
};

export const refreshUser = async () => {
  const { data } = await axios.post(`${API_URL}/refresh`, {
    withCredentials: true,
  });
  return data;
};