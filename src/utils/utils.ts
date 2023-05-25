import { NUMS, LITTERS_MAX, LITTERS_MIN } from './enum';
import _ from 'lodash';

export const randomStr = (len: number): string => {
  let result = ''
  for (let i = 0; i < len; i++) {
    let str = [...NUMS, ... LITTERS_MAX, ...LITTERS_MIN][_.random(0, NUMS.length + LITTERS_MAX.length + LITTERS_MIN.length, false)];
    result += str;
  }
  return result;
};


export const getUserInfo = (key?: string): any => {
  const userInfo = window.localStorage.getItem('userInfo');
  if (!userInfo) {
    return {};
  }
  if (key) {
    return JSON.parse(userInfo)[key];
  }
  return JSON.parse(userInfo);
};

export const hours = () => {
  const result = [];
  for (let i = 0; i < 24; i++) {
    result.push(i < 10 ? '0' + i : i);
  };
  return result;
};

export const minutes = () => {
  const result = [];
  for (let i = 0; i < 60; i++) {
    result.push(i < 10 ? '0' + i : i);
  };
  return result;
};
