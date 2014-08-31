function Shape(parent, initialxr, initialyr, initialdirr) {
  'use strict';
  this.xr = typeof initialxr === 'number' ? initialxr : 0;
  this.yr = typeof initialyr === 'number' ? initialyr : 0;
  this.dirr = typeof initialdirr === 'number' ? initialdirr : 0;
  Object.defineProperty(this, 'x', {
    get: function () {
      return parent.x + this.xr * Math.cos(parent.dir) - this.yr * Math.sin(parent.dir);
    }
  });
  Object.defineProperty(this, 'y', {
    get: function () {
      return parent.y + this.xr * Math.sin(parent.dir) + this.yr * Math.cos(parent.dir);
    }
  });
  Object.defineProperty(this, 'dir', {
    get: function () {
      return ((parent.dir + this.dirr) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    }
  });
}
