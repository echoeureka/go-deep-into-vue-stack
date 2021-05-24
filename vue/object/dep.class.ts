import remove from "../../utils/remove";
import Watcher from "./watcher.class";

// export default class Dep {
//   subs: any[];
//   constructor() {
//     this.subs = [];
//   }
//   addSub(sub: any) {
//     this.subs.push(sub);
//   }
//   removeSub(sub: any) {
//     remove(this.subs, sub);
//   }
//   depend() {
//     if (window.target) {
//       this.addSub(window.target);
//     }
//   }
//   notify() {
//     const subs = this.subs.slice();
//     for (const sub of subs) {
//       sub.update();
//     }
//   }
// }

export default class Dep {
  subs: Watcher[];
  static target: Watcher;
  constructor() {
    this.subs = [];
  }
  addSub(sub: Watcher) {
    this.subs.push(sub);
  }
  removeSub(sub: Watcher) {
    remove(this.subs, sub);
  }
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
