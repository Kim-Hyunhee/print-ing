import "reflect-metadata";
import axios from "axios";

// 개발 테스트용
const mid = "2999199990";
const authorization =
  "pgapi Mjk5OTE5OTk5MDpNQTAxOjNEMUVBOEVBRUM0NzA1MTFBMkIyNUVFMzQwRkI5ODQ4";

const devServer = "https://paydev.ksnet.co.kr/kspay/webfep";
const liveServer = "https://pay.ksnet.co.kr/kspay/webfep";

const KspayService = {
  postCertPayment: async ({
    orderId,
    userName,
    userEmail,
    productName,
    totalAmount,
    cardNumb,
    expiryDate,
    installMonth,
    password2,
    userInfo,
  }: {
    orderId: string;
    userName: string;
    userEmail: string;
    productName: string;
    totalAmount: number;
    cardNumb: string;
    expiryDate: string;
    installMonth: number;
    password2: string;
    userInfo: string;
  }) => {
    const jsonData = {
      mid: mid,
      orderNumb: orderId,
      userName: userName,
      userEmail: userEmail,
      productType: "REAL",
      productName: productName,
      totalAmount: totalAmount,
      taxFreeAmount: 0,
      interestType: "PG",
      cardNumb: cardNumb,
      expiryDate: expiryDate,
      installMonth: installMonth,
      password2: password2,
      userInfo: userInfo,
      currencyType: "KRW",
    };
    const postNoncerCardPaymentData = await axios({
      url: `${devServer}/api/v1/card/pay/oldcert`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      data: jsonData,
    });

    console.log(`응답 : ${postNoncerCardPaymentData.statusText}`);
    console.log(`응답 : ${JSON.stringify(postNoncerCardPaymentData.data)}`);

    const paymentData = {
      data: postNoncerCardPaymentData.data.data,
      status: postNoncerCardPaymentData.status,
      message: postNoncerCardPaymentData.data.message,
    };

    return paymentData;
  },

  postCardCancel: async ({
    cancelType,
    orgTradeKey,
    cancelTotalAmount,
    cancelSeq,
  }: {
    cancelType: string;
    orgTradeKey: string;
    cancelTotalAmount?: number;
    cancelSeq?: number;
  }) => {
    let jsonData = {
      mid: mid,
      cancelType: cancelType,
      orgTradeKeyType: "TID",
      orgTradeKey: orgTradeKey,
    };

    if (cancelType === "PARTIAL") {
      if (!cancelTotalAmount || !cancelSeq) {
        return {
          status: 400,
          message: "부분 취소일때는, 반드시 취소 금액과 취소 순번을 넣어주세요",
          data: null,
        };
      }
      const clonedJsonData = {
        ...jsonData,
        cancelTotalAmount: cancelTotalAmount,
        cancelSeq: cancelSeq,
      };
      jsonData = clonedJsonData;
    }

    console.log(`취소 시도 리퀘스터 : ${jsonData}`);
    const postCardCancelData = await axios({
      url: `${devServer}/api/v1/card/cancel`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      data: jsonData,
    });

    console.log(`취소 시도 응답 : ${postCardCancelData.statusText}`);
    console.log(`취소 시도 응답 : ${JSON.stringify(postCardCancelData.data)}`);

    const cancelData = {
      data: postCardCancelData.data.data,
      status: postCardCancelData.status,
      message: postCardCancelData.data.message,
    };

    return cancelData;
  },

  postCardOwnerCheck: async ({
    orderId,
    userName,
    productName,
    totalAmount,
    password2,
    userInfo,
  }: {
    orderId: string;
    userName: string;
    productName: string;
    totalAmount: number;
    password2: string;
    userInfo: string;
  }) => {
    const jsonData = {
      mid: mid,
      orderNumb: orderId,
      userName: userName,
      productType: "REAL",
      productName: productName,
      totalAmount: totalAmount,
      taxFreeAmount: 0,
      interestType: "PG",
      cardNumb: "9410000003895856",
      expiryDate: "0125",
      installMonth: 0,
      currencyType: "KRW",
      password2: password2,
      userInfo: userInfo,
    };
    const postCardOwnerCheck = await axios({
      url: `${devServer}/api/v1/card/cert`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      data: jsonData,
    });

    console.log(`카드정보 응답 : ${postCardOwnerCheck.statusText}`);
    console.log(`카드정보 응답 : ${JSON.stringify(postCardOwnerCheck.data)}`);

    const responseData = {
      data: postCardOwnerCheck.data.data,
      status: postCardOwnerCheck.status,
      message: postCardOwnerCheck.data.message,
    };

    return responseData;
  },
};
export default KspayService;
