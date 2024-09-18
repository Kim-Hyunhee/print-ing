# **인쇄ING**  
> **디자인 상품이나 폰트를 공동 구매하여 가격을 낮추어 구매하는 플랫폼을 구현하는 프로젝트**

---

## **목차**
1. [실행 환경](#1-실행-환경)  
   1-1. [로컬 실행](#1-1-로컬-실행)  
   1-2. [환경 변수](#1-2-환경-변수)  
2. [기술 스택](#2-기술-스택)  
3. [디렉토리 구조](#3-디렉토리-구조)  
4. [ERD](#4-erd)  
5. [기능 구현](#5-기능-구현)  
   5-1. [회원가입](#5-1-회원가입)   
   5-2. [로그인](#5-2-로그인)  
   5-3. [주문 CRUD](#5-3-주문-CRUD)  
   5-4. [결제(iamport)](#5-4-결제(iamport))  
   5-5. [관리자 기능](#5-7-관리자-기능)  

---

## **1. 실행 환경**
### **1-2. 환경 변수**  
- 아래 항목들이 `.env` 파일에 반드시 존재해야 합니다:
  - `DB_HOST`: 데이터베이스 연결 HOST 주소
  - `DB_TYPE`: 데이터베이스 연결 TYPE
  - `DB_USERNAME`: 데이터베이스 연결 username
  - `DB_PASSWORD`: 데이터베이스 연결 password
  - `DB_DATABASE`: 데이터베이스 연결 database 이름
  - `AWS_ACCESSKEY`: AWS Accesskey
  - `AWS_SECRETKEY`: AWS Secretkey
  - `JWT_SECRET_KEY`: JWT 토큰 서명에 사용될 비밀 키

---

### 기술 스택
<img src="https://img.shields.io/badge/TypeScript-version 5-3178C6">&nbsp;
<img src="https://img.shields.io/badge/Node.js-version 10-E0234E">&nbsp;
<img src="https://img.shields.io/badge/TypeORM-version 0.3-fcad03">&nbsp;
<img src="https://img.shields.io/badge/MySQL-version 8-00758F">&nbsp;

</br>

---

## 디렉토리 구조

<details>
<summary><strong>디렉토리 구조</strong></summary>
<div markdown="1">
 
```bash
└─src
    │  app.ts
    │  database.ts
    │  index.ts
    │
    ├─api
    │      kakao.ts
    │
    ├─controller
    │  │  adminAccount.ts
    │  │  auth.ts
    │  │  bank.ts
    │  │  banners.ts
    │  │  category.ts
    │  │  coupon.ts
    │  │  courier.ts
    │  │  homepage.ts
    │  │  iamport.ts
    │  │  notice.ts
    │  │  notification.ts
    │  │  order.ts
    │  │  orderOption.ts
    │  │  product.ts
    │  │  productOption.ts
    │  │  productOptionValue.ts
    │  │  refundAccount.ts
    │  │  review.ts
    │  │  shippingAddress.ts
    │  │  upload.ts
    │  │
    │  └─admin
    │          adminAccount.ts
    │          auth.ts
    │          bank.ts
    │          banner.ts
    │          category.ts
    │          courier.ts
    │          homepage.ts
    │          notice.ts
    │          notification.ts
    │          order.ts
    │          orderOption.ts
    │          product.ts
    │          productOption.ts
    │          productOptionValue.ts
    │          productPrice.ts
    │          review.ts
    │          shipment.ts
    │          statistics.ts
    │          upload.ts
    │
    ├─entity
    │      adminAccount.ts
    │      bank.ts
    │      banner.ts
    │      category.ts
    │      coupon.ts
    │      courier.ts
    │      homepage.ts
    │      index.ts
    │      notice.ts
    │      notification.ts
    │      order.ts
    │      orderOption.ts
    │      orderProduct.ts
    │      orderStatusLog.ts
    │      product.ts
    │      productOption.ts
    │      productOptionValue.ts
    │      productPrice.ts
    │      review.ts
    │      shipment.ts
    │      shippingAddress.ts
    │      user.ts
    │      userCoupon.ts
    │
    ├─helper
    │      auth.ts
    │      order.ts
    │      upload.ts
    │
    ├─router
    │  │  auth.ts
    │  │  bank.ts
    │  │  banner.ts
    │  │  category.ts
    │  │  iamport.ts
    │  │  index.ts
    │  │  order.ts
    │  │  product.ts
    │  │  refundAccount.ts
    │  │  ShippingAddress.ts
    │  │  upload.ts
    │  │
    │  └─admin
    │          auth.ts
    │          banner.ts
    │          category.ts
    │          courier.ts
    │          index.ts
    │          order.ts
    │          product.ts
    │          productPrice.ts
    │          shipment.ts
    │          upload.ts
    │          user.ts
    │
    ├─service
    │      adminAccount.ts
    │      bank.ts
    │      banner.ts
    │      category.ts
    │      coupon.ts
    │      courier.ts
    │      homepage.ts
    │      iamport.ts
    │      notice.ts
    │      notification.ts
    │      order.ts
    │      orderOption.ts
    │      orderProduct.ts
    │      orderStatusLog.ts
    │      product.ts
    │      productOption.ts
    │      productOptionValue.ts
    │      productPrice.ts
    │      review.ts
    │      shipment.ts
    │      shippingAddress.ts
    │      statistics.ts
    │      user.ts
    │
    └─swagger
            admin.yml
            bank.yml
            banner.yml
            category.yml
            courier.yml
            iamport.yml
            index.ts
            order.yml
            product.yml
            productPrice.yml
            refundAccount.yml
            shipment.yml
            shippingAddress.yml
            upload.yml
            user.yml
```
</div>
</details>

</br>

## **ERD**

<details>
<summary><strong>ERD 이미지 보기</strong></summary>
<div markdown="1">

![ERD 이미지](https://github.com/user-attachments/assets/2ee30f73-bc99-4960-aa5f-85a74dc2ca71)

</div>
</details>

</br>

## 기능구현
### **5-1. 회원가입** 
* 이메일과 휴대폰 번호 중복을 확인 합니다.
  
### **5-2. 로그인** 
* 로그인 성공 시 Cookie로 토큰을 인가합니다.
* 카카오 로그인 연결

### **5-3. 주문 CRUD**
* 공동 구매하고 싶은 상품 주문, 수정, 상세보기, 삭제
* 최소 구매, 최대 구매 제한 구현
* 주문 성공 시 주문 번호를 리턴합니다.

### **5-4. 결제(iamport)**
* iamport api를 연결하여 결제 진행

### **5-5. 관리자 기능**
* 관리자 로그인 기능 (JWT 토큰 발급)
* 상품, 상품 옵션 CRUD
* 사용자 목록
* 주문 목록
* 카테고리 CRUD
* 배너 CRUD

 ---
 
 ## **Swagger 문서**
API 명세는 Swagger를 통해 확인할 수 있습니다. 아래 링크를 클릭하여 Swagger 문서로 이동하세요.

[Swagger 문서 보러 가기](https://github.com/user-attachments/assets/22808784-c793-4132-bfea-a691f14f77c0)

---
