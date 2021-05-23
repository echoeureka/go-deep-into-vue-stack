export default function _proxy(data: any) {
  const that = this;
  Object.keys(data).forEach((key) => {
    Object.defineProperty(that, key, {
      configurable: true,
      enumerable: true,
      get: () => {
        return that._data[key];
      },
      set: (val) => {
        that._data[key] = val;
      },
    });
  });
}
