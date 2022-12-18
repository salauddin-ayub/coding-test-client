import { Axios } from "../api/api";

export const getSectors = async (batchID, requisitionID) => {
  const { data } = await Axios.get(`/dropDown`);
  return data;
};

export const getUserInfo = async (batchID, requisitionID) => {
  const { data } = await Axios.get(`/userInformation`);
  return data;
};
