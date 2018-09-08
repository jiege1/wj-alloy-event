import {addEvent, removeEvent} from './utils';
import Vector from './vector';

/**
 * 合成事件
 *
 * el
 *
 * triggers: {
 *  onTap
 *  onSingleTap
 *  onDoubleTap
 *  onLongPress
 *  onSwipe
 * }
 *
 * config
 *
 */
export default class AlloyEvent {

  config = {
    swipePercent: 0.02, // 触发滑动的横向屏比
    doubleInterval: 200, // 触发双击的间隔时间
    longPressTime: 500, // 长按触发时间
  };

  constructor(el, triggers, config = {}) {
    this.el = el;
    this.triggers = triggers;
    this.config = {
      ...this.config,
      ...config,
    };
    this.swipeLength = window.screen.width * this.config.swipePercent;

    this.isMobile = 'ontouchend' in window;
    this.touchStart = this.isMobile ? 'touchstart' : 'mousedown';
    this.touchEnd = this.isMobile ? 'touchend' : 'mouseup';

    this.startPosition = null;
    this.lastTouchPosition = null;

    this.clear = this.clear.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    this.on();
  }

  getTouchPoint(e, touchIndex = 0) {

    if (touchIndex) { // touchIndex >= 1 时，为多指事件，只有移动端才会有多指事件
      return {
        x: e.changedTouches[touchIndex].clientX,
        y: e.changedTouches[touchIndex].clientY,
      };
    }

    return this.isMobile
      ? {x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY}
      : {x: e.clientX, y: e.clientY};
  }

  /**
   * 添加事件绑定
   */
  on() {
    addEvent(this.el, this.touchStart, this.onTouchStart);
  }

  /**
   * 监听合成事件
   */
  emit(type, ...arg) {
    if (this.triggers[type]) {
      this.triggers[type](...arg);
    }
  }

  /**
   * 清除事件
   */
  clear() {
    removeEvent(this.el, this.touchStart, this.onTouchStart);
    removeEvent(this.el, this.touchEnd, this.onTouchEnd);
  };

  onTouchStart(e) {
    e.preventDefault();
    // console.log('onTouchStart=====', e);

    // 手机端多指事件，只支持双指时间
    if (e.touches && e.touches.length >= 2) {
      console.log(e.touches);

    } else { // 单指事件

      if (this.singleTapTimer) {
        // 如果存在单击的延迟，先清除延迟
        clearTimeout(this.singleTapTimer);
        this.singleTapTimer = null;
        this.tapDouble = true;
      }

      const startPosition = this.getTouchPoint(e);
      this.startPosition = startPosition;
      this.lastTouchPosition = startPosition;

      // 长按设置
      this.longPressTimer = setTimeout(() => {
        this.isLongPress = true;
      }, this.config.longPressTime);

      addEvent(this.el, this.touchEnd, this.onTouchEnd);
    }

  };

  onTouchEnd(e) {
    clearTimeout(this.longPressTimer);
    console.log('onTouchEnd=====', e);

    const endPosition = this.getTouchPoint(e);

    // 手指滑动的向量
    const swipeVector = new Vector(this.startPosition, endPosition);

    /**
     * 1. 若swipeVector.norm <= this.swipeLength
     *    用户滑动的距离未达到触发滑动事件的条件，
     *    判断为点击类事件： tap longPress
     *
     * 2. 若swipeVector.norm > this.swipeLength
     *    判断为滑动类事件： swipe
     */
    if (swipeVector.norm <= this.swipeLength) {
      // 点击
      this.emit('onTap', e);

      if (!this.isLongPress) {
        if (!this.tapDouble) {
          // 单击
          this.singleTapTimer = setTimeout(() => {
            this.emit('onSingleTap', e);
            this.singleTapTimer = null;
          }, this.config.doubleInterval);
        } else {
          // 双击
          this.emit('onDoubleTap', e);
          this.tapDouble = false;
        }
      } else {
        // 长按
        this.emit('onLongPress', e);
        delete this.isLongPress;
      }

    } else {
      // 先清除所有的点击事件
      if (this.singleTapTimer) {
        clearTimeout(this.singleTapTimer);
        this.singleTapTimer = null;
      }
      this.tapDouble = false;

      e.swipeVector = swipeVector;
      this.emit('onSwipe', e);
    }

    delete this.isLongPress;
    removeEvent(this.el, this.touchEnd, this.onTouchEnd);
  }
}
