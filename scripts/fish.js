function Fish(x, y, direction) {
  'use strict';
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.v = 20 * Math.random();
  this.size = 2;
  this.color = 'gray';
  this.onchange = new EventHandlerList();
  this.eye = new Eye(3, -2, 0);
  this.mouth = new Mouth(2, 1, 0.5);
  this.mouth.onchange.add(function () {
    this.onchange.fire();
  }.bind(this));
}

Fish.prototype.accelerate = function () {
  'use strict';
  this.v += 0.3 * (20 - this.v);
};

Fish.prototype.directionDown = function () {
  'use strict';
  this.direction += 0.2;
  this.onchange.fire({direction: this.direction});
};

Fish.prototype.directionUp = function () {
  'use strict';
  this.direction -= 0.2;
  this.onchange.fire({direction: this.direction});
};

Fish.prototype.draw = function (context) {
  'use strict';
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.direction);
  context.scale(this.size, this.size);
  context.fillStyle = this.color;
  context.beginPath();
  context.moveTo(10, 0);
  context.lineTo(0, -6);
  context.lineTo(-5, -1);
  context.lineTo(-10, -5);
  context.lineTo(-10, 5);
  context.lineTo(-5, 1);
  context.lineTo(0, 6);
  context.fill();
  this.eye.draw(context);
  this.mouth.draw(context);
  context.restore();
};

Fish.prototype.move = function (time) {
  'use strict';
  this.x += this.v * time * Math.cos(this.direction);
  this.y += this.v * time * Math.sin(this.direction);
  this.onchange.fire();
};

Fish.prototype.stop = function () {
  'use strict';
  this.v = 0;
};