import api from "../config/axiosConfig";

export async function decodeToken(token) {
  const data = await api
    .get("accounts/decode", { params: { token } })
    .then((response) => response.data)
    .then((data) => data.data)
    .catch((error) => console.log(error));

  return data;
}
