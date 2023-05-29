import axios from "axios";

import environment from "@wepresto/environment";

import getIdTokenFromCurrentUser from "@wepresto/utils/get-id-token-from-current-user";

class LoanService {
  async getBorrowerLoans({ borrowerUid, statuses }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${environment.API_URL}/borrowers/loans`,
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
  }

  async getMinimumPaymentInformation({ loanUid }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${environment.API_URL}/loans/minimum-payment-amount`,
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
      `${environment.API_URL}/loans/total-payment-amount`,
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

  async getLoan({ loanUid }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${environment.API_URL}/loans/${loanUid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  }

  async getLoanTerms() {
    const { data } = await axios.get(
      `${environment.API_URL}/loans/loan-terms`,
    );

    return data;
  }

  async loanSimulate({ alias, amount, term }) {
    const { data } = await axios.post(
      `${environment.API_URL}/loans/loan-simulate`,
      {
        alias,
        amount,
        term,
      },
    );

    return data;
  }

  async loanApply({ borrowerUid, alias, amount, term }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.post(
      `${environment.API_URL}/loans/loan-apply`,
      {
        borrowerUid,
        alias,
        amount,
        term,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  }

  async getLoansInProgress({ borrowerUid }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${environment.API_URL}/borrowers/loans/in-progress`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          uid: borrowerUid,
        },
      },
    );

    const { loans } = data;

    return loans;
  }
}

export default new LoanService();
