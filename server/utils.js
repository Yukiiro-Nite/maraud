const pastThreshold = (oldValues, newValues, threshold) =>
  Math.abs(oldValues.x - newValues.x) > threshold
  || Math.abs(oldValues.y - newValues.y) > threshold;

const distance = (point1, point2) => Math.sqrt(Math.pow(point2.x - point1.x,2) + Math.pow(point2.y - point1.y,2));

module.exports.pastThreshold = pastThreshold;
module.exports.distance = distance;