import observer from "./observer";
import _proxy from "./proxy";
import Watcher from "./watcher";

export default class Vue {
  _data: any;
  constructor(options: any) {
    this._data = options.data;
    // _proxy.call(this, options.data);
    observer(this._data);
    let wather = new Watcher(this, "expOrFn", options.render);
    // trigger get function manually to add wather into dep
    console.log("rendering...", this._data.cnt);
  }
}
