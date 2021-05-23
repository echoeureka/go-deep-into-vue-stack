import defineReactive from "./defineReactive";

// export default class Observer {
//   value: any;
//   constructor(value: any) {
//     this.value = value;
//     if (!Array.isArray(value)) {
//       this.walk(value);
//     }
//   }
//   walk(obj: any) {
//     for (const key in obj) {
//       defineReactive(obj, key, obj[key]);
//     }
//   }
// }

export default function observer(obj: any) {
  if (!obj || typeof obj !== "object") return;
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key]);

    // 递归遍历添加reactive
    // observer(obj[key]);
  });
}
