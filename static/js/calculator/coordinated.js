
export default class Coordinated {
  item; // Instance of item
  x = 0;
  y = 0;
  z = 0;

  constructor(item, x, y, z) {
    this.item = item;
    this.x = x;
    this.y = y;
    this.z = z ? z : 0;
  }

  getItem() {
    return this.item;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getZ() {
    return this.z;
  }
}