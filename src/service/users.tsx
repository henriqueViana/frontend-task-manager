import { api } from "../config/api";

type UserDataType = {
  id: string;
  email: string;
};

export const getUserLogin = async (
  email: string,
  password: string
): Promise<UserDataType | null> => {
  const url = `/users?email=${encodeURIComponent(
    email
  )}&password=${encodeURIComponent(password)}`;

  try {
    const result = await api.get(url);

    if (result.data.length == 0) return null;

    const user = result.data[0];

    return {
      id: user.id,
      email: user.email,
    };
  } catch (error) {
    console.log("error---", error);
  }
  return null;
};
