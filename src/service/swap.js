// eslint-disable-next-line no-extend-native
Object.prototype.MyVeryCustomSwapMethodForAnyObject = function() {
    return Object.keys(this).reduce((converted, key) => {
      if (!Array.isArray(this[key])) this[key] = [this[key]];
      this[key].forEach((innerKey) => {
        if (
          typeof innerKey === "string" &&
          innerKey.length > 0
        )
          converted[innerKey] = key;
      });
      return converted;
    }, {});
  };
module.exports = Object