import axios from "axios";
import dotenv from "dotenv";
import qs from "qs";

dotenv.config();

const postTokenInstance = axios.create({
  baseURL: "https://kauth.kakao.com/",
  withCredentials: true,
});

const getUserProfileInstance = axios.create({
  baseURL: "https://kapi.kakao.com/",
  withCredentials: true,
});

export const KakaoApi = {
  getToken: async ({ code }: { code: string }) => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_REST_APIKEY,
      redirect_uri: process.env.REDIRECT_URI,
      code,
      client_secret: process.env.CLIENT_SECRET,
    });

    try {
      const { data } = await postTokenInstance.post("oauth/token", payload);

      return data;
    } catch (error) {
      console.error(error);

      return error;
    }
  },

  getUserProfile: async ({ accessToken }: { accessToken: string }) => {
    try {
      const { data } = await getUserProfileInstance.get("v2/user/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return data;
    } catch (error) {
      console.error(error);

      return error;
    }
  },
};
