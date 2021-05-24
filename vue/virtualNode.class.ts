export default class VirtualNode {
  tag: any;
  data: any;
  children: any;
  text: any;
  element: any;
  constructor(tag: any, data: any, children: any, text: any, element: any) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.element = element;
  }
}

function createEmptyVirtualNode() {
  return new VirtualNode(null, null, null, "", null);
}

function createTextVirtualNode(value: string) {
  return new VirtualNode(undefined, undefined, undefined, value, undefined);
}

function cloneVirtualNode(node: VirtualNode) {
  return new VirtualNode(
    node.tag,
    node.data,
    node.children,
    node.text,
    node.element
  );
}

// function render() {
//   return new VirtualNode(
//     "span",
//     {
//       /* 指令集合数组 */
//       directives: [
//         {
//           /* v-show指令 */
//           rawName: "v-show",
//           expression: "isShow",
//           name: "show",
//           value: true,
//         },
//       ],
//       /* 静态class */
//       staticClass: "demo",
//     },
//     [new VirtualNode(undefined, undefined, undefined, "This is a span.")]
//   );
// }
