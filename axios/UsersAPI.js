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
    call_price: formData.call_price,
    expectation: formData.time,
    price_for_expectation: formData.waiting,
    tariff_min_price: formData.tariff_min_price,
    tariff_min_km: formData.tariff_min_km,
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
export const createManager = async (formData) => {
  const { data } = await $host.post(`${API_URL}/register`, formData);
  return data;
};
//update
export const updateTarif = async (formData) => {
  const { data } = await $host.put(`${API_URL}/tariffs/${formData.id}`, formData);
  return data;
};

export const updateDriver = async (formData) => {
  const { data } = await $host.put(`${API_URL}/drivers/${formData.id}`, {
    name: formData.name,
    phone: formData.phone,
    driver_license: formData.driver_license,
    car_number: formData.car_number,
    status: formData.status,
    tariff_id: formData.tariff_id,
    car_type_id: formData.car_type
  });
  return data;
};

export const updateCar = async (formData) => {
  const { data } = await $host.put(`${API_URL}/carTypes/${formData.id}`, {
    name: formData.name
  });
  return data;
};

export const updateManager = async (formData) => {
  const { data } = await $host.put(`${API_URL}/users/${formData.id}`, {
    email: formData.email,
    name: formData.name,
    password: formData.password,
    password_confirmation: formData.password_confirmation
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

export const deleteDriver = async (id) => {
  const { data } = await $host.delete(`${API_URL}/drivers/${id}`);
  return data;
};

export const deleteManager = async (id) => {
  const { data } = await $host.delete(`${API_URL}/users/${id}`);
  return data;
};
//get
export const getTarifs = async () => {
  const { data } = await $host.get(`${API_URL}/tariffs`);
  return data;
};

export const getDrivers = async (page, status, search) => {
  if(status) {
    const { data } = await $host.get(`${API_URL}/drivers?per_page`, {
      params: {
        page: page,
        status: status,
        phone: search
      }
      
    });
    return data;
  }
  const { data } = await $host.get(`${API_URL}/drivers`, {
    params: {
      page: page,
      phone: search
    }
  });
  return data;
};

export const getCars = async (page) => {
  const { data } = await $host.get(`${API_URL}/carTypes`);
  return data;
};

export const getUsers = async () => {
  const { data } = await $host.get(`${API_URL}/users`);
  return data;
};

export const refreshUser = async () => {
  const { data } = await axios.post(`${API_URL}/refresh`, {
    withCredentials: true,
  });
  return data;
};