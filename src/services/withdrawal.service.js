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

  async requestWithdrawal({ lenderUid, amount, bank, accountType, accountNumber }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.post(
      `${environment.API_URL}/withdrawals/withdrawal-request`,
      {
        lenderUid,
        amount,
        bank,
        accountType,
        accountNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      ...data,
      message: "Tu solicitud de retiro ha sido enviada."
    };
  }

  async getWithdrawals({ lenderUid }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${environment.API_URL}/withdrawals/lender-withdrawals`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          lenderUid,
          take: 100,
        },
      }
    );

    const { withdrawals } = data;

    return withdrawals;
  }
}

export default new WithdrawalService();
