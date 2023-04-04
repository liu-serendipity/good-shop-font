export const argumentAsArray = (argument: any) => (Array.isArray(argument) ? argument : [argument]);
export const isElement = (target: any) => target instanceof Node;
export const isElementList = (nodeList: any) => nodeList instanceof NodeList;
export const eachNode = (nodeList: string | any[] | NodeListOf<any>, callback: any) => {
  if (nodeList && callback) {
    nodeList = isElementList(nodeList) ? nodeList : [nodeList];
    for (let i = 0; i < nodeList.length; i++) {
      if (callback(nodeList[i], i, nodeList.length) === true) {
        break;
      }
    }
  }
};
export const throwError = (message: string) => console.error(`[scroll-lock] ${message}`);
export const arrayAsSelector = (array: any[]) => {
  if (Array.isArray(array)) {
    const selector = array.join(', ');
    return selector;
  }
};
export const nodeListAsArray = (nodeList: NodeListOf<any>) => {
  const nodes: any[] = [];
  eachNode(nodeList, (node: any) => nodes.push(node));

  return nodes;
};
export const findParentBySelector = ($el: { parentElement: any }, selector: any, self = true, $root = document) => {
  if (self && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1) {
    return $el;
  }

  while (($el = $el.parentElement) && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) === -1);
  return $el;
};
export const elementHasSelector = ($el: any, selector: any, $root = document) => {
  const has = nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1;
  return has;
};
export const elementHasOverflowHidden = ($el: Element) => {
  if ($el) {
    const computedStyle = getComputedStyle($el);
    const overflowIsHidden = computedStyle.overflow === 'hidden';
    return overflowIsHidden;
  }
};
export const elementScrollTopOnStart = ($el: any) => {
  if ($el) {
    if (elementHasOverflowHidden($el)) {
      return true;
    }

    const scrollTop = $el.scrollTop;
    return scrollTop <= 0;
  }
};
export const elementScrollTopOnEnd = ($el: any) => {
  if ($el) {
    if (elementHasOverflowHidden($el)) {
      return true;
    }

    const scrollTop = $el.scrollTop;
    const scrollHeight = $el.scrollHeight;
    const scrollTopWithHeight = scrollTop + $el.offsetHeight;
    return scrollTopWithHeight >= scrollHeight;
  }
};
export const elementScrollLeftOnStart = ($el: any) => {
  if ($el) {
    if (elementHasOverflowHidden($el)) {
      return true;
    }

    const scrollLeft = $el.scrollLeft;
    return scrollLeft <= 0;
  }
};
export const elementScrollLeftOnEnd = ($el: any) => {
  if ($el) {
    if (elementHasOverflowHidden($el)) {
      return true;
    }

    const scrollLeft = $el.scrollLeft;
    const scrollWidth = $el.scrollWidth;
    const scrollLeftWithWidth = scrollLeft + $el.offsetWidth;
    return scrollLeftWithWidth >= scrollWidth;
  }
};
export const elementIsScrollableField = ($el: any) => {
  const selector = 'textarea, [contenteditable="true"]';
  return elementHasSelector($el, selector);
};
const FILL_GAP_AVAILABLE_METHODS = ['padding', 'margin', 'width', 'max-width', 'none'];
const TOUCH_DIRECTION_DETECT_OFFSET = 3;

const state = {
  scroll: true,
  queue: 0,
  scrollableSelectors: ['[data-scroll-lock-scrollable]'],
  fillGapSelectors: ['body', '[data-scroll-lock-fill-gap]'],
  fillGapMethod: FILL_GAP_AVAILABLE_METHODS[0],
  startTouchY: 0,
  startTouchX: 0,
};

export const disablePageScroll = (target: HTMLDivElement | null) => {
  if (state.queue <= 0) {
    fillGaps();
    document.body.style.overflow = 'hidden';
    state.scroll = false;
  }

  addScrollableTarget(target);
  state.queue++;
};
export const enablePageScroll = (target: null) => {
  state.queue--;
  if (state.queue <= 0) {
    document.body.style.overflow = '';
    unfillGaps();
    state.scroll = true;
  }

  removeScrollableTarget(target);
};
export const getScrollState = () => {
  return state.scroll;
};
export const clearQueueScrollLocks = () => {
  state.queue = 0;
};
export const getPageScrollBarWidth = () => {
  const overflowCurrentProperty = document.body.style.overflow;
  document.body.style.overflow = 'scroll';
  const width = getCurrentPageScrollBarWidth();
  document.body.style.overflow = overflowCurrentProperty;

  return width;
};
export const getCurrentPageScrollBarWidth = () => {
  const documentWidth = document.documentElement.clientWidth;
  const windowWidth = window.innerWidth;
  const currentWidth = windowWidth - documentWidth;

  return currentWidth;
};
export const addScrollableTarget = (target: any) => {
  if (target) {
    const targets = argumentAsArray(target);
    targets.map(($targets) => {
      eachNode($targets, ($target: any) => {
        if (isElement($target)) {
          $target.dataset.scrollLockScrollable = '';
        } else {
          throwError(`"${$target}" is not a Element.`);
        }
      });
    });
  }
};
export const removeScrollableTarget = (target: any) => {
  if (target) {
    const targets = argumentAsArray(target);
    targets.map(($targets) => {
      eachNode($targets, ($target: { dataset: { scrollLockScrollable: any } }) => {
        if (isElement($target)) {
          delete $target.dataset.scrollLockScrollable;
        } else {
          throwError(`"${$target}" is not a Element.`);
        }
      });
    });
  }
};
export const addScrollableSelector = (selector: any) => {
  if (selector) {
    const selectors = argumentAsArray(selector);
    selectors.map((selector) => {
      state.scrollableSelectors.push(selector);
    });
  }
};
export const removeScrollableSelector = (selector: any) => {
  if (selector) {
    const selectors = argumentAsArray(selector);
    selectors.map((selector) => {
      state.scrollableSelectors = state.scrollableSelectors.filter((sSelector) => sSelector !== selector);
    });
  }
};
export const setFillGapMethod = (method: string) => {
  if (method) {
    if (FILL_GAP_AVAILABLE_METHODS.indexOf(method) !== -1) {
      state.fillGapMethod = method;
      refillGaps();
    } else {
      const methods = FILL_GAP_AVAILABLE_METHODS.join(', ');
      throwError(`"${method}" method is not available!\nAvailable fill gap methods: ${methods}.`);
    }
  }
};
export const addFillGapTarget = (target: any) => {
  if (target) {
    const targets = argumentAsArray(target);
    targets.map(($targets) => {
      eachNode($targets, ($target: { dataset: { scrollLockFillGap: string } }) => {
        if (isElement($target)) {
          $target.dataset.scrollLockFillGap = '';
          if (!state.scroll) {
            fillGapTarget($target);
          }
        } else {
          throwError(`"${$target}" is not a Element.`);
        }
      });
    });
  }
};
export const removeFillGapTarget = (target: any) => {
  if (target) {
    const targets = argumentAsArray(target);
    targets.map(($targets) => {
      eachNode($targets, ($target: { dataset: { scrollLockFillGap: any } }) => {
        if (isElement($target)) {
          delete $target.dataset.scrollLockFillGap;
          if (!state.scroll) {
            unfillGapTarget($target);
          }
        } else {
          throwError(`"${$target}" is not a Element.`);
        }
      });
    });
  }
};
export const addFillGapSelector = (selector: any) => {
  if (selector) {
    const selectors = argumentAsArray(selector);
    selectors.map((selector) => {
      state.fillGapSelectors.push(selector);
      if (!state.scroll) {
        fillGapSelector(selector);
      }
    });
  }
};
export const removeFillGapSelector = (selector: any) => {
  if (selector) {
    const selectors = argumentAsArray(selector);
    selectors.map((selector) => {
      state.fillGapSelectors = state.fillGapSelectors.filter((fSelector) => fSelector !== selector);
      if (!state.scroll) {
        unfillGapSelector(selector);
      }
    });
  }
};

export const refillGaps = () => {
  if (!state.scroll) {
    fillGaps();
  }
};

const fillGaps = () => {
  const selector = arrayAsSelector(state.fillGapSelectors);
  fillGapSelector(selector);
};
const unfillGaps = () => {
  const selector = arrayAsSelector(state.fillGapSelectors);
  unfillGapSelector(selector);
};
const fillGapSelector = (selector: any) => {
  const $targets = document.querySelectorAll(selector);
  eachNode($targets, ($target: any) => {
    fillGapTarget($target);
  });
};
const fillGapTarget = ($target: any) => {
  const scrollBarWidth = getPageScrollBarWidth();

  if (isElement($target)) {
    if ($target.dataset.scrollLockFilledGap === 'true') {
      unfillGapTarget($target);
    }

    const computedStyle = window.getComputedStyle($target);
    $target.dataset.scrollLockFilledGap = 'true';
    $target.dataset.scrollLockCurrentFillGapMethod = state.fillGapMethod;

    if (state.fillGapMethod === 'margin') {
      const currentMargin = parseFloat(computedStyle.marginRight);
      $target.style.marginRight = `${currentMargin + scrollBarWidth}px`;
    } else if (state.fillGapMethod === 'width') {
      $target.style.width = `calc(100% - ${scrollBarWidth}px)`;
    } else if (state.fillGapMethod === 'max-width') {
      $target.style.maxWidth = `calc(100% - ${scrollBarWidth}px)`;
    } else if (state.fillGapMethod === 'padding') {
      const currentPadding = parseFloat(computedStyle.paddingRight);
      $target.style.paddingRight = `${currentPadding + scrollBarWidth}px`;
    }
  }
};
const unfillGapSelector = (selector: any) => {
  const $targets = document.querySelectorAll(selector);
  eachNode($targets, ($target: any) => {
    unfillGapTarget($target);
  });
};
const unfillGapTarget = ($target: any) => {
  if (isElement($target)) {
    if ($target.dataset.scrollLockFilledGap === 'true') {
      const currentFillGapMethod = $target.dataset.scrollLockCurrentFillGapMethod;
      delete $target.dataset.scrollLockFilledGap;
      delete $target.dataset.scrollLockCurrentFillGapMethod;

      if (currentFillGapMethod === 'margin') {
        $target.style.marginRight = ``;
      } else if (currentFillGapMethod === 'width') {
        $target.style.width = ``;
      } else if (currentFillGapMethod === 'max-width') {
        $target.style.maxWidth = ``;
      } else if (currentFillGapMethod === 'padding') {
        $target.style.paddingRight = ``;
      }
    }
  }
};

const onResize = () => {
  refillGaps();
};

const onTouchStart = (e: any) => {
  if (!state.scroll) {
    state.startTouchY = e.touches[0].clientY;
    state.startTouchX = e.touches[0].clientX;
  }
};
const onTouchMove = (e: any) => {
  if (!state.scroll) {
    const { startTouchY, startTouchX } = state;
    const currentClientY = e.touches[0].clientY;
    const currentClientX = e.touches[0].clientX;

    if (e.touches.length < 2) {
      const selector = arrayAsSelector(state.scrollableSelectors);
      const direction = {
        up: startTouchY < currentClientY,
        down: startTouchY > currentClientY,
        left: startTouchX < currentClientX,
        right: startTouchX > currentClientX,
      };
      const directionWithOffset = {
        up: startTouchY + TOUCH_DIRECTION_DETECT_OFFSET < currentClientY,
        down: startTouchY - TOUCH_DIRECTION_DETECT_OFFSET > currentClientY,
        left: startTouchX + TOUCH_DIRECTION_DETECT_OFFSET < currentClientX,
        right: startTouchX - TOUCH_DIRECTION_DETECT_OFFSET > currentClientX,
      };
      const handle = ($el: any, skip = false) => {
        if ($el) {
          const parentScrollableEl = findParentBySelector($el, selector, false);
          if (
            skip ||
            (elementIsScrollableField($el) && findParentBySelector($el, selector)) ||
            elementHasSelector($el, selector)
          ) {
            let prevent = false;
            if (elementScrollLeftOnStart($el) && elementScrollLeftOnEnd($el)) {
              if ((direction.up && elementScrollTopOnStart($el)) || (direction.down && elementScrollTopOnEnd($el))) {
                prevent = true;
              }
            } else if (elementScrollTopOnStart($el) && elementScrollTopOnEnd($el)) {
              if (
                (direction.left && elementScrollLeftOnStart($el)) ||
                (direction.right && elementScrollLeftOnEnd($el))
              ) {
                prevent = true;
              }
            } else if (
              (directionWithOffset.up && elementScrollTopOnStart($el)) ||
              (directionWithOffset.down && elementScrollTopOnEnd($el)) ||
              (directionWithOffset.left && elementScrollLeftOnStart($el)) ||
              (directionWithOffset.right && elementScrollLeftOnEnd($el))
            ) {
              prevent = true;
            }
            if (prevent) {
              if (parentScrollableEl) {
                handle(parentScrollableEl, true);
              } else {
                if (e.cancelable) {
                  e.preventDefault();
                } else {
                  console.log('e.preventDefault() is not cancelable');
                }
              }
            }
          } else {
            handle(parentScrollableEl);
          }
        } else {
          e.preventDefault();
        }
      };

      handle(e.target);
    }
  }
};
const onTouchEnd = () => {
  if (!state.scroll) {
    state.startTouchY = 0;
    state.startTouchX = 0;
  }
};

export function init() {
  window.addEventListener('resize', onResize);
  document.addEventListener('touchstart', onTouchStart);
  document.addEventListener('touchmove', onTouchMove, {
    passive: false,
  });
  document.addEventListener('touchend', onTouchEnd);
}

export default {
  init,
  disablePageScroll,
  enablePageScroll,

  getScrollState,
  clearQueueScrollLocks,
  getPageScrollBarWidth,
  getCurrentPageScrollBarWidth,

  addScrollableSelector,
  removeScrollableSelector,

  addScrollableTarget,
  removeScrollableTarget,

  addFillGapSelector,
  removeFillGapSelector,

  addFillGapTarget,
  removeFillGapTarget,

  setFillGapMethod,
  refillGaps,

  _state: state,
};
