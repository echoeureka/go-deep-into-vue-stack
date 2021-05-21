import Dep from "./dep";
import Observer from "./observer";

export default function defineReactive(data: any, key: any, value: any) {
  if (typeof value === "object") {
    new Observer(value);
  }
  let dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      dep.depend();
      return value;
    },
    set: (newValue) => {
      if (value === newValue) {
        return;
      }
      value = newValue;
      dep.notify();
    },
  });
}
