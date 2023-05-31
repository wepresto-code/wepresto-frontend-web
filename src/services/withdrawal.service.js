import axios from "axios";

import environment from "@wepresto/environment";

import getIdTokenFromCurrentUser from "@wepresto/utils/get-id-token-from-current-user";

class WithdrawalService {
  async getTotalWithdrawn({ lenderUid }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${environment.API_URL}/withdrawals/total-withdrawn`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          lenderUid,
        },
      }
    );

    return data;
  }

  async getAvailableToWithdraw({ lenderUid }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${environment.API_URL}/withdrawals/available-to-withdraw`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          lenderUid,
        },
      }
    );

    return data;
  }
}

export default new WithdrawalService();
