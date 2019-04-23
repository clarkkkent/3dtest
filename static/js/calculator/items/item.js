'use strict';

export default class DefaultItem {
  diameter = 10;
  atTop = 0;
  hasGap = false;

  getDiameter() {
    return this.diameter;
  }

  getAtTop() {
    return this.atTop;
  }

  getHasGap() {
    return this.hasGap;
  }
}