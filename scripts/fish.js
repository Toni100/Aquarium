function Fish(x, y, direction) {
  'use strict';
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.v = 20 * Math.random();
  this.size = 2;
  this.color = 'gray';
  this.onchange = new EventHandlerList();
  this.brain = new Network();
  this.eye = new Eye(3, -2, 0, this.brain);
  this.eye.onchange.add(function () { this.onchange.fire(); }.bind(this));
  this.stomach = new Stomach(this.brain);
  this.stomach.onchange.add(function () { this.onchange.fire(); }.bind(this));
  this.mouth = new Mouth(2, 1, 0.5);
  this.mouth.onchange.add(function () { this.onchange.fire(); }.bind(this));
  this.mouth.oninsert.add(function (event) {
    this.stomach.add(event.data.amount);
  }.bind(this));
  for (var i = 0; i < 100; i += 1) {
    this.brain.addNeuron();
  }
  this.brain.addAction(this.accelerate.bind(this));
  this.brain.addAction(this.directionDown.bind(this));
  this.brain.addAction(this.directionUp.bind(this));
  this.brain.addAction(this.eye.lookDown.bind(this.eye));
  this.brain.addAction(this.eye.lookUp.bind(this.eye));
  this.brain.addAction(this.mouth.open.bind(this.mouth));
}

Fish.prototype.draw = function (context) {
  'use strict';
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.direction);
  context.scale(this.size, this.size);
  if (this.selected) {
    context.beginPath();
    context.strokeStyle = 'yellow';
    context.arc(0, 0, 15, 0, 2 * Math.PI);
    context.stroke();
  }
  context.beginPath();
  context.fillStyle = this.color;
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

// actions
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