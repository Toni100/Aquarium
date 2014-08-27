function Photoreceptor(parent, initialxr, initialyr, initialdirr, brain, colors) {
  'use strict';
  Shape.call(this, parent, initialxr, initialyr, initialdirr);
  this.colors = new Map(colors.map(function (c) {
    return [c, brain.addNeuron()];
  }));
}

Photoreceptor.prototype.draw = function (context) {
  'use strict';
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.dir);
  context.strokeStyle = this.activated ? 'orange' : 'rgba(200, 160, 170, 0.3)';
  context.beginPath();
  context.moveTo(3, 0);
  context.lineTo(22, 0);
  context.stroke();
  context.restore();
};

Photoreceptor.prototype.tryStimulate = function (visual) {
  'use strict';
  visual.forEach(function (v) {
    if (this.colors.has(v.type)) {
      this.colors.get(v.type).stimulate(Math.min(1, 50 / v.distance));
      this.activated = true;
    }
  }, this);
  if (this.activated) {
    setTimeout(function () {
      this.activated = false;
    }.bind(this), 50);
  }
};