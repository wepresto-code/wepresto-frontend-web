import localforage from "localforage";

export default async function getFcmToken() {
  const token = await localforage.getItem("fcm_token");
  return token;
}
