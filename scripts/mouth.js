function Mouth(x, y, direction) {
  'use strict';
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.open = false;
  this.onchange = new EventHandlerList();
}

Mouth.prototype.eat = function () {
  'use strict';
  this.open = true;
  this.onchange.fire({open: true});
  setTimeout(function () {
    this.open = false;
    this.onchange.fire({open: false});
  }.bind(this), 500);
};

Mouth.prototype.draw = function (context) {
  'use strict';
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.direction);
  context.beginPath();
  context.strokeStyle = 'limegreen';
  if (this.open) {
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