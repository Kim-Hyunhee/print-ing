import "reflect-metadata";
import axios from "axios";

const imp_key = "3741181371155518";
const imp_secret =
  "PKNG1q7ze5Lj3haCkN5hcJps9u8DhUVALCCFJ00UgZ2wYFQGaq4EGQhXQx62HsMR38U7ePxfKbv9P6hy";

const IamPortService = {
  getToken: async () => {
    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        imp_key,
        imp_secret,
      },
    });
    const { access_token } = getToken.data.response;

    return access_token;
  },

  getPaymentData: async ({ imp_uid }: { imp_uid: string }) => {
    const token = await IamPortService.getToken();
    const getPaymentData = await axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`,
      method: "get",
      headers: { Authorization: token },
    });

    const paymentData = getPaymentData.data.response;

    return paymentData;
  },
};
export default IamPortService;
