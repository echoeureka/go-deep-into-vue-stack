function vuexInit() {
  const options = this.$options;
  if (options.store) {
    // 直接执行store（function时）或者使用store（非function）
    this.$store =
      typeof options.store === "function" ? options.store() : options.store;
  } else if (options.parent && options.parent.$store) {
    // 子组件直接从父组件中获取$store，这样就保证了所有组件都公用了全局的同一份store
    this.$store = options.parent.$store;
  }
}
