


/**
 * 获取 vector1 和 vector2 的夹角的余玄
 * @param vector1
 * @param vector2
 */
export const getIncludedRadian = (vector1, vector2) => {

  if (!vector2) {
    // 重合x正轴，模长为10的向量
    vector2 = {
      vectorOrigin: {
        X: 10,
        Y: 0,
      },
      norm: 10,
    };
  }

  // 将向量平移到原点，两向量的起点重合时，满足公式
  // a·b = x1x2 + y1y2 = |a||b|cosθ
  const {X: X1, Y: Y1} = vector1.vectorOrigin;
  const {X: X2, Y: Y2} = vector2.vectorOrigin;

  const cosA = (X1 * X2 + Y1 * Y2) / (vector1.norm * vector2.norm);

  return Math.acos(cosA);
};

/**
 * 弧度转角度
 * @param angle
 * @returns {number}
 */
export const radianToDeg = angle => {
  const unit = (Math.PI * 2) / 360;
  return angle / unit;
};