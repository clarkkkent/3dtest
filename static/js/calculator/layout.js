'use strict';

import Empty from "./items/empty";
import Coordinated from "./coordinated";

export default class Layout {
  beadSize = 10;
  wristSize = 160;

  lineLengthCurrent = 0;

  /**
   * Renderer
   */
  renderer;

  items = [];

  constructor(renderer) {
    this.renderer = renderer
  }

  getWristRadius() {
     return this.wristSize + Math.PI * 2
  }

  getLineRadius() {
    return this.getWristRadius() + this.beadSize / 2;
  }

  getLineLengthBase() {
    return 2 * Math.PI * this.getLineRadius();
  }

  getLineLengthDelta() {
    return this.getLineLengthBase() * 0.05;
  }

  getIsAllowedLength(checkLength) {
    return Math.abs(checkLength - this.getLineLengthBase()) < this.getLineLengthDelta();
  }

  getIsAllowedCurrentLength() {
    return this.getIsAllowedLength(this.lineLengthCurrent);
  }

  build() {
    if (!this.items.length) {
      this.fillEmpty()
    }
  }

  fillEmpty() {
    let quantity = Math.floor(this.getLineLengthBase() / this.beadSize);
    // TODO: Check length
    while (quantity > 0) {
      this.items.push(new Empty(this.beadSize));
      quantity--;
    }
    this.lineLengthCurrent = this.calculateLength(this.items)
  }

  itemOnLineWidth(item) {
    return item.getDiameter();
  }

  calculateLength(items) {
    let length = 0;
    items.forEach((item) => {
      length += this.itemOnLineWidth(item);
    });
    return length
  }

  lengthToAngle(length) {
    return 360 * length / this.lineLengthCurrent;
  }

  place() {
    let coordinatedItems = [];
    let lengthAccumulated = 0;

    this.items.forEach((item) => {
      let diameter = this.itemOnLineWidth(item);
      let angle = this.lengthToAngle(lengthAccumulated + diameter/2);

      let x = this.getLineRadius() * Math.sin(angle * (Math.PI/180));
      let y = this.getLineRadius() * Math.cos(angle * (Math.PI/180));
      let z = item.getAtTop() - this.beadSize / 2;

      console.log(x, y, z);

      coordinatedItems.push(new Coordinated(item, x, y, z));

      lengthAccumulated += diameter;
    }, );
    return coordinatedItems;
  }

  render() {
    this.fillEmpty();
    let coordinatedItems = this.place(this.items, this.lineLengthCurrent);
    this.renderer.render(coordinatedItems);
  }
}