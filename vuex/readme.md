# Vuex

> 我们在使用Vue.js开发复杂的应用时，经常会遇到多个组件共享同一个状态，亦或是多个组件会去更新同一个状态，在应用代码量较少的时候，我们可以组件间通信去维护修改数据，或者是通过事件总线来进行数据的传递以及修改。但是当应用逐渐庞大以后，代码就会变得难以维护，从父组件开始通过prop传递多层嵌套的数据由于层级过深而显得异常脆弱，而事件总线也会因为组件的增多、代码量的增大而显得交互错综复杂，难以捋清其中的传递关系。
>
> 
>
> 那么为什么我们不能将数据层与组件层抽离开来呢？把数据层放到全局形成一个单一的Store，组件层变得更薄，专门用来进行数据的展示及操作。所有数据的变更都需要经过全局的Store来进行，形成一个单向数据流，使数据变化变得“可预测”。
>
> 
>
> Vuex是一个专门为Vue.js框架设计的、用于对Vue.js应用程序进行状态管理的库，它借鉴了Flux、redux的基本思想，将共享的数据抽离到全局，以一个单例存放，同时利用Vue.js的响应式机制来进行高效的状态管理与更新。正是因为Vuex使用了Vue.js内部的“响应式机制”，所以Vuex是一个专门为Vue.js设计并与之高度契合的框架（优点是更加简洁高效，缺点是只能跟Vue.js搭配使用）。具体使用方法及API可以参考[Vuex的官网](https://vuex.vuejs.org/zh-cn/intro.html)。
>
> 
>
> 先来看一下这张Vuex的数据流程图，熟悉Vuex使用的同学应该已经有所了解。
>
> 
>
> ![image](https://vuex.vuejs.org/vuex.png)
>
> 
>
> Vuex实现了一个单向数据流，在全局拥有一个State存放数据，所有修改State的操作必须通过Mutation进行，Mutation的同时提供了订阅者模式供外部插件调用获取State数据的更新。所有异步接口需要走Action，常见于调用后端接口异步获取更新数据，而Action也是无法直接修改State的，还是需要通过Mutation来修改State的数据。最后，根据State的变化，渲染到视图上。Vuex运行依赖Vue内部数据双向绑定机制，需要new一个Vue对象来实现“响应式化”，所以Vuex是一个专门为Vue.js设计的状态管理库。

## Install

> Vuex是怎样把store注入到Vue实例中去的呢?
>
> Vue.js提供了[Vue.use](https://cn.vuejs.org/v2/api/#Vue-use)方法用来给Vue.js安装插件, 内部通过调用插件的install方法(当插件是一个对象的时候)来进行插件的安装.



- 防止Vuex被重复安装
- 执行applyMixin, 执行vuexInit初始化Vuex
  - Vue1中, Vuex会将vuexInit放入Vue的_init方法中
  - Vue2中, vuexInit会被混入Vue的beforeCreate钩子中

```typescript
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
```



> vuexInit会尝试从options中获取store, 如果当前组件是根组件(root节点), 则options中会存在store, 直接获取赋值给store引用.
>
> 这样一来, 所有的组件都获取到了同一份内存地址的store实例, 于是我们可以在每一个组件中通过this.$store愉快地访问全局的store实例了

```typescript
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
```



## Store