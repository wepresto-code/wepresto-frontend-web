import axios from "axios";

import environment from "@wepresto/environment";

import getIdTokenFromCurrentUser from "@wepresto/utils/get-id-token-from-current-user";

class LenderService {
  async getParticipationsResume({ lenderUid }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${environment.API_URL}/lenders/participations-resume`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          uid: lenderUid,
        },
      }
    );

    return data;
  }

  async getParticipations({ lenderUid }) {
    const token = await getIdTokenFromCurrentUser();

    const { data } = await axios.get(
      `${environment.API_URL}/lenders/participations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          uid: lenderUid,
        },
      },
    );

    const { participations } = data;
    
    return participations;
  }
}

export default new LenderService();
