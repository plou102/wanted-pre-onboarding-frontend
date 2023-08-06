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

// todo list 추가
export function postAddTodo(data) {
  return requestPost(PATH.TODO, tokenInstance, data);
}

// todo list 불러오기
export function getTodo() {
  return requestGet(PATH.TODO, tokenInstance);
}

// todo list 삭제
export function deleteTodo(id) {
  return requestDelete(`${PATH.TODO}/${id}`, tokenInstance);
}

// todo list 수정
export function updateTodo(id, data) {
  return requestPut(`${PATH.TODO}/${id}`, tokenInstance, data);
}
