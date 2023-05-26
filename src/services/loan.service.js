import axios from "axios";

import getIdTokenFromCurrentUser from "@wepresto/utils/get-id-token-from-current-user";

class LoanService {
  async getBorrowerLoans ({ borrowerUid, statuses }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/borrowers/loans`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          uid: borrowerUid,
          statuses,
        },
      },
    );

    const { loans } = data;

    return loans;
  };

  async getMinimumPaymentInformation({ loanUid }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/loans/minimum-payment-amount`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          uid: loanUid,
        },
      },
    );

    return data;
  }

  async getTotalPaymentInformation({ loanUid }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/loans/total-payment-amount`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          uid: loanUid,
        },
      },
    );

    return data;
  }
}

export default new LoanService();
