import { Toast } from 'antd-mobile';

// 延时
export function sleep(time = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

// 查空
export const handleIsEmpty = (val, fix) => {
  if (!val) {
    Toast.show(`${fix}不能为空！`);
    return false;
  }
  return true;
};
