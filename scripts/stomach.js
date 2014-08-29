function Stomach(parent, initialxr, initialyr, initialdirr, brain) {
  'use strict';
  Shape.call(this, parent, initialxr, initialyr, initialdirr);
  this.content = 0.2 + 0.2 * Math.random();
  var n = brain.addNeuron();
  setInterval(function () {
    n.stimulate(1 - this.content);
  }.bind(this), 2000);
  setInterval(function () {
    this.content *= 0.95;
  }.bind(this), 10000);
}

Stomach.prototype.draw = function (context) {
  'use strict';
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.dir);
  // inner
  context.fillStyle = 'rgba(155, 255, 250, 0.5)';
  context.beginPath();
  context.arc(0, 0, 4, 0, this.content * 2 * Math.PI, false);
  context.fill();
  // outer
  context.strokeStyle = 'rgba(255, 150, 0, 0.4)';
  context.beginPath();
  context.arc(0, 0, 4, 0, 2 * Math.PI, false);
  context.stroke();
  context.restore();
};

Stomach.prototype.tryPut = function (food) {
  'use strict';
  if (this.content + food.amount <= 1) {
    this.content += food.amount;
    return true;
  }
  return false;
};