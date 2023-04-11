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

// 根据路由决定是否显示footer
export const isPathPartlyExisted = (path) => {
  const arr = ['/home', '/shop', '/cart', '/about'];
  // 任何情况 结果数组第二项都是arr里匹配的单项
  let pathRes = path.split('/');
  if (pathRes[1] && arr.indexOf(`/${pathRes[1]}`) != -1) return true;
  return false;
};
