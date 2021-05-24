let Vue: any;

// 此处只为了解决报错问题
function applyMixin(_Vue: any) {}

export default function install(_Vue: any) {
  if (Vue) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "[vuex] already installed. Vue.use(Vuex) should be called only once."
      );
    }
  }
  Vue = _Vue;
  // 将vuexInit混淆进Vue的beforeCreate(Vue2)或_init方法(Vue1)
  applyMixin(Vue);
}
