export default function remove(array: any[], item: any) {
  if (array && array.length) {
    let index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
}
