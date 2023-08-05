import PATH from "./path";
import { defaultInstance, tokenInstance } from "./util.js";

const requestPost = async (path, instance, data) => {
  return await instance.post(path, JSON.stringify(data)).then((res) => {
    return res.data;
  });
};

const requestGet = async (path, instance) => {
  return await instance.get(path).then((res) => {
    return res.data;
  });
};

const requestPut = async (path, instance, data) => {
  return await instance.put(path, JSON.stringify(data)).then((res) => {
    return res.data;
  });
};

const requestDelete = async (path, instance, data) => {
  if (data) {
    return await instance.delete(path, { data }).then((res) => {
      return res.data;
    });
  } else {
    return await instance.delete(path).then((res) => {
      return res.data;
    });
  }
};

// 회원가입
export function postSignUp(data) {
  return requestPost(PATH.SIGNUP, defaultInstance, data);
}

// 로그인
export function postSignIn(data) {
  return requestPost(PATH.SIGNIN, defaultInstance, data);
}
