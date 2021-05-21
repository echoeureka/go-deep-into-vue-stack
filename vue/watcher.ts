import parsePath from "../utils/parsePath";

export default class Watcher {
  vm: any;
  getter: any;
  cb: any;
  value: any;
  constructor(vm: any, expOrFn: any, cb: any) {
    this.vm = vm;
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }
  get() {
    // 将window.target设置成了watcher的实例
    window.target = this;
    let value = this.getter.call(this.vm, this.vm);
    window.target = undefined;
    return value;
  }
  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}
