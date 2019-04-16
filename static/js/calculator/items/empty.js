'use strict';

import DefaultItem from './item'

export default class Empty extends DefaultItem {
  constructor(diameter) {
    super();
    this.diameter = diameter;
    this.atTop = diameter/2;
  }
}