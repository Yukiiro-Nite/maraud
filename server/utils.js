const pastThreshold = (oldValues, newValues, threshold) =>
  Math.abs(oldValues.x - newValues.x) > threshold
  || Math.abs(oldValues.y - newValues.y) > threshold;

module.exports.pastThreshold = pastThreshold;
