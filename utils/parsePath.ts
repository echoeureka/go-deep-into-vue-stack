const bailRE = /[^\w.$]/;
function parsePath(path: string) {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split(".");
  return (obj: {}) => {
    for (const segment of segments) {
      if (!obj) {
        return;
      }
      obj = obj[segment];
    }
    return obj;
  };
}
export default parsePath;
