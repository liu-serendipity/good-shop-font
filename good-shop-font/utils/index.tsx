export const rem2px = (v: any) => {
  const f = window.document.documentElement.style.fontSize;
  return v * parseFloat(f);
};
export const px2rem = (v: any) => {
  const f = window.document.documentElement.style.fontSize;
  return v / parseFloat(f);
};

export const isAndroid = () => {
  const u = window.navigator.userAgent;

  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
};

export const isIOS = () => {
  const u = window.navigator.userAgent;

  return (
    u.toLowerCase().indexOf('ios') >= 0 ||
    u.toLowerCase().indexOf('ipod') >= 0 ||
    u.toLowerCase().indexOf('iphone') >= 0
  );
};

export const isMobile = () => {
  return isAndroid() || isIOS();
};

export const isIE = () => {
  const u = window.navigator.userAgent;

  return !!u.match(/Trident/g) || !!u.match(/MSIE/g);
};

export const getViewPort = () => {
  const d = window.document.documentElement;
  const b = window.document.body;
  return {
    width: d.clientWidth || b.clientWidth,
    height: d.clientHeight || b.clientHeight,
  };
};
