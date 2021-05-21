import defineReactive from "./defineReactive";

export default class Observer {
  value: any;
  constructor(value: any) {
    this.value = value;
    if (!Array.isArray(value)) {
      this.walk(value);
    }
  }
  walk(obj: any) {
    for (const key in obj) {
      defineReactive(obj, key, obj[key]);
    }
  }
}
