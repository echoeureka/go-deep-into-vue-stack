import Vue from "./Vue";

let vm = new Vue({
  data: { cnt: 0 },
  render: () => {
    console.log("view changed");
  },
});
vm._data.cnt = 1;
