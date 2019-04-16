'use strict';

import DefaultItem from './item'

export default class Bead extends DefaultItem {
  texture;

  constructor(diameter, texture) {
    super();
    this.diameter = diameter;
    this.atTop = diameter/2;
    this.texture = texture;
  }

  getTexture() {
    return this.texture;
  }
}