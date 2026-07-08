import api from "./api.js";

const register = async ({ name, email, password, repeatPassword }) => {
  const { data } = await api.post("/auth/register", {
    name,
    email,
    password,
    repeatPassword,
  });
  return data;
};

const verifyEmail = async (token) => {
  const { data } = await api.get(`/auth/verify-email?token=${token}`);
  return data;
};

const login = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export { register, login, verifyEmail };