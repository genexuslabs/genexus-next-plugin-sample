import { r as s, h as o } from "./index-Dn2KiDX2.js";
function r(t, e, n) {
  return (t || "") + (e ? ` ${e}` : "") + (n ? ` ${n}` : "");
}
const i = ":host{display:block}", d = i, c = class {
  constructor(t) {
    s(this, t), this.first = void 0, this.middle = void 0, this.last = void 0;
  }
  getText() {
    return r(this.first, this.middle, this.last);
  }
  render() {
    return o("div", { key: "70654fc83039b5f659efe99cc990e9b86d20dbe0" }, "Hello, World(4)! I'm ", this.getText());
  }
};
c.style = d;
export {
  c as my_component
};
