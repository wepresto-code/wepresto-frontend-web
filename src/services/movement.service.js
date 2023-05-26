import axios from "axios";

import getIdTokenFromCurrentUser from "@wepresto/utils/get-id-token-from-current-user";

class MovementService {
  async getLoanInstallmentInfo ({ movementUid }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/movements/loan-installment-info`,
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
}

export default new MovementService();
