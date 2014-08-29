function Mouth(parent, initialxr, initialyr, initialdirr, brain, stomach) {
  'use strict';
  Shape.call(this, parent, initialxr, initialyr, initialdirr);
  this.stomach = stomach;
  brain.addAction(this.open.bind(this));
}

Mouth.prototype.draw = function (context) {
  'use strict';
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.dir);
  context.strokeStyle = 'limegreen';
  context.beginPath();
  if (this.isOpen) {
    context.moveTo(6, 4);
    context.lineTo(0, 0);
    context.lineTo(10, -2);
  } else {
    context.moveTo(0, 0);
    context.lineTo(8, 0);
  }
  context.stroke();
  context.restore();
};

Mouth.prototype.tryPut = function (food) {
  'use strict';
  return this.isOpen && this.stomach.tryPut(food);
};

// actions
Mouth.prototype.open = function () {
  'use strict';
  this.isOpen = true;
  setTimeout(function () {
    this.isOpen = false;
  }.bind(this), 400);
};