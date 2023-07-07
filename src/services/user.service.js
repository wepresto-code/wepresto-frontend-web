import axios from "axios";

import environment from "@wepresto/environment";

import getIdTokenFromCurrentUser from "@wepresto/utils/get-id-token-from-current-user";

class UserService {
  async getOne({ authUid }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${environment.API_URL}/users/${authUid}`,
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
      `${environment.API_URL}/users/borrower`,
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
      `${environment.API_URL}/users/lender`,
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
      `${environment.API_URL}/users/reset-password-email`,
      {
        email,
      },
    );

    return {
      ...data,
      message: "Se ha enviado un correo electrónico para restablecer tu contraseña",
    };
  }

  async changeFcmtoken({ authUid, fcmToken }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.patch(
      `${environment.API_URL}/users/fcm-token`,
      {
        authUid,
        fcmToken,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  }
}

export default new UserService();
