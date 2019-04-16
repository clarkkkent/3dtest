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

  getLineLengthBase() {
    let lineRadius = this.getWristRadius() + this.beadSize / 2;
    return 2 * Math.PI * lineRadius;
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

  beadWithGap(diameter) {
    return diameter + 1;
  }

  calculateLength(items) {
    let length = 0;
    items.forEach((item) => {
      let diameter = item.getDiameter();
      if (item.hasGap) {
        diameter += this.beadWithGap(diameter)
      }

      length += diameter;
    });
    return length
  }

  render() {
    this.renderer.render();
  }
}