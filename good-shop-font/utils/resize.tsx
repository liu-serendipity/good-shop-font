export function scale() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const width = document.documentElement.clientWidth;
  let scale = 1;

  if (width <= 750) {
    scale = width / 750;
  } else if (width > 750 && width < 1200) {
    scale = 1200 / 1920;
  } else if (width >= 1200 && width < 1920) {
    scale = width / 1920;
  } else {
    scale = 1;
  }

  return scale;
}

export function rootFontSize() {
  return scale() * 100;
}

export function resize() {
  window.onresize = function () {
    // 设置页面根节点字体大小
    document.documentElement.style.fontSize = rootFontSize() + 'px';
  };

  window.onresize(new UIEvent('resize'));
}
