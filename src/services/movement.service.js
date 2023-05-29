import axios from "axios";

import environment from "@wepresto/environment";

import getIdTokenFromCurrentUser from "@wepresto/utils/get-id-token-from-current-user";

class MovementService {
  async getLoanInstallmentInfo({ movementUid }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${environment.API_URL}/movements/loan-installment-info`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          uid: movementUid,
        },
      },
    );

    return data;
  }

  async getLoanMovements({ loanUid }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${environment.API_URL}/movements/loan-movements`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          loanUid,
          take: 1000,
        },
      },
    );

    const { movements } = data;

    return movements;
  }
}

export default new MovementService();
