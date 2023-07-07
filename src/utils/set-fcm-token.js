import localforage from "localforage";

export default async function setFcmToken(token) {
  await localforage.setItem("fcm_token", token);
};
