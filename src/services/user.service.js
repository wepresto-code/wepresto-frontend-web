import axios from "axios";

import getIdTokenFromCurrentUser from "@wepresto/utils/get-id-token-from-current-user";

class UserService {
  async getOne({ uid }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${uid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  }

  async createBorrower({
    documentType,
    documentNumber,
    fullName,
    email,
    phoneNumber,
    country,
    city,
    address,
    password,
  }) {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/borrower`,
      {
        documentType,
        documentNumber,
        fullName,
        email,
        phoneNumber,
        country,
        city,
        address,
        password,
      },
    );

    return {
      ...data,
      message: "Tú usuario ha sido creado exitosamente",
    };
  }

  async createLender({
    documentType,
    documentNumber,
    fullName,
    email,
    phoneNumber,
    country,
    city,
    address,
    password,
  }) {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/lender`,
      {
        documentType,
        documentNumber,
        fullName,
        email,
        phoneNumber,
        country,
        city,
        address,
        password,
      },
    );

    return {
      ...data,
      message: "Tú usuario ha sido creado exitosamente",
    };
  }

  async sendResetPasswordEmail({ email }) {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/reset-password-email`,
      {
        email,
      },
    );

    return {
      ...data,
      message: "Se ha enviado un correo electrónico para restablecer tu contraseña",
    };
  }
}

export default new UserService();
