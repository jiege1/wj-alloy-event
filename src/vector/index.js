import {getIncludedRadian, radianToDeg} from '../utils/vector';

export default class Vector {

  constructor(startPoint = {}, endPoint = {}) {
    // 定义向量的起点和终点
    this.startPoint = {
      x: startPoint.x || 0,
      y: startPoint.y || 0,
    };
    this.endPoint = {
      x: endPoint.x || 0,
      y: endPoint.y || 0,
    };
  }


  /**
   * 将向量平移到原点的时，xy轴的偏移
   */
  get vectorOrigin() {
    return {
      X: this.endPoint.x - this.startPoint.x,
      Y: this.endPoint.y - this.startPoint.y,
    };
  }

  /**
   * 向量的摸
   * @returns {number}
   */
  get norm() {
    return Math.sqrt(this.vectorOrigin.X ** 2 + this.vectorOrigin.Y ** 2);
  }


  /**
   * 向量与x轴的夹角
   */
  get radianForX() {
    return getIncludedRadian(this);
  }

  get degForX() {
    return radianToDeg(this.radianForX);
  }

  // 向量方向判定
  get direction() {
    return {
      up: this.vectorOrigin.Y < 0 && this.degForX > 45 && this.degForX < 135,
      down: this.vectorOrigin.Y > 0 && this.degForX > 45 && this.degForX < 135,
      right: this.vectorOrigin.X > 0 && (this.degForX <= 45 || this.degForX >= 135),
      left: this.vectorOrigin.X < 0 && (this.degForX <= 45 || this.degForX >= 135),
    };
  }

}
