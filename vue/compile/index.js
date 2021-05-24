function isStatic(node) {
  if (node.type === 2) return false;
  if (node.type === 3) return true;
  return !node.if && !node.for;
}

// console.log(
//   isStatic({
//     type: 1,
//     if: false,
//     for: false,
//   })
// );

function markStatic(node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    node.children.forEach((child) => {
      markStatic(child);
      // difference, optimize by myself
      node.static = child.static;
    });
  }
}

function markStaticRoots(node) {
  if (node.type === 1) {
    if (
      node.static &&
      node.children.length &&
      !(node.children.length === 1 && node.children[0].type === 3)
    ) {
      node.staticRoot = true;
      // i do not know why return here, it is unnecessary, maybe it can optimize
      return;
    } else {
      node.staticRoot = false;
    }
  }
}

export default function optimize(rootAst) {
  markStatic(rootAst);
  markStaticRoots(rootAst);
}
