export const addEvent = (el, event, handler) => {
  if (!el) return;
  if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, false);
  } else {
    el['on' + event] = handler;
  }
};

export const removeEvent = (el, event, handler) => {
  if (!el) return;
  if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, false);
  } else {
    el['on' + event] = null;
  }
};
