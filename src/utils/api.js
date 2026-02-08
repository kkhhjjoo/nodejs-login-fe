// Netlify 프록시를 사용하도록 수정된 api.js

import axios from "axios";

const api = axios.create({
  baseURL: '/api',  // 상대 경로로 변경 (Netlify 프록시 사용)
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor: 요청 전 authorization 헤더에 토큰 추가
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    request.headers.authorization = "Bearer " + sessionStorage.getItem("token");
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

/**
 * Interceptor: 응답 처리
 */
api.interceptors.response.use(
  function (response) {
    console.log("RESPONSE", response);
    return response;
  },
  function (error) {
    console.log("RESPONSE ERROR", error);
    // 에러 객체 반환 (에러 처리 개선)
    return Promise.reject(error.response ? error.response.data : error);
  }
);

export default api;