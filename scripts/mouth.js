function Mouth(parent, initialxr, initialyr, initialdirr, brain) {
  'use strict';
  Shape.call(this, parent, initialxr, initialyr, initialdirr);
  this.oninsert = new EventHandlerList();
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

Mouth.prototype.tryInsert = function (amount) {
  'use strict';
  if (this.isOpen) {
    this.oninsert.fire({amount: amount});
    return true;
  }
  return false;
};

// actions
Mouth.prototype.open = function () {
  'use strict';
  this.isOpen = true;
  setTimeout(function () {
    this.isOpen = false;
  }.bind(this), 200);
};