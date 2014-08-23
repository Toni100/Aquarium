function Mouth(x, y, direction) {
  'use strict';
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.isOpen = false;
  this.onchange = new EventHandlerList();
  this.oninsert = new EventHandlerList();
}

Mouth.prototype.draw = function (context) {
  'use strict';
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.direction);
  context.beginPath();
  context.strokeStyle = 'limegreen';
  if (this.isOpen) {
    context.moveTo(3, 2);
    context.lineTo(0, 0);
    context.lineTo(5, -1);
  } else {
    context.moveTo(0, 0);
    context.lineTo(4, 0);
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
  this.onchange.fire();
  setTimeout(function () {
    this.isOpen = false;
    this.onchange.fire();
  }.bind(this), 200);
};