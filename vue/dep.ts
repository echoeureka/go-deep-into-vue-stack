import remove from "../utils/remove";

export default class Dep {
  subs: any[];
  constructor() {
    this.subs = [];
  }
  addSub(sub: any) {
    this.subs.push(sub);
  }
  removeSub(sub: any) {
    remove(this.subs, sub);
  }
  depend() {
    if (window.target) {
      this.addSub(window.target);
    }
  }
  notify() {
    const subs = this.subs.slice();
    for (const sub of subs) {
      sub.update();
    }
  }
}
