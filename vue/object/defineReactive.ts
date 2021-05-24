import Dep from "./dep.class";

// export default function defineReactive(data: any, key: any, value: any) {
//   if (typeof value === "object") {
//     new Observer(value);
//   }
//   let dep = new Dep();
//   Object.defineProperty(data, key, {
//     enumerable: true,
//     configurable: true,
//     get: () => {
//       dep.depend();
//       return value;
//     },
//     set: (newValue) => {
//       if (value === newValue) {
//         return;
//       }
//       value = newValue;
//       dep.notify();
//     },
//   });
// }

export default function defineReactive(obj: any, key: any, val: any) {
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      dep.addSub(Dep.target);
      return val;
    },
    set: (newVal: any) => {
      if (val !== newVal) {
        val = newVal;
        dep.notify();
      }
    },
  });
}
