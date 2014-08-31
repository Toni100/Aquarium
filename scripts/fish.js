function Fish(initialxr, initialyr, initialdirr) {
  'use strict';
  Shape.call(this, {x: 0, y: 0, dir: 0}, initialxr, initialyr, initialdirr);
  this.v = 0;
  this.brain = new Network();
  this.eye = new Eye(this, 6, -4, 0, this.brain);
  this.stomach = new Stomach(this, 0, 0, 0, this.brain);
  this.mouth = new Mouth(this, 4, 2, 0.5, this.brain, this.stomach);
  for (var i = 0; i < 100; i += 1) {
    this.brain.addNeuron();
  }
  this.brain.addAction(function (event) {
    this.accelerate(event.data.strength);
  }.bind(this));
  this.brain.addAction(function (event) {
    this.down(event.data.strength);
  }.bind(this));
  this.brain.addAction(function (event) {
    this.up(event.data.strength);
  }.bind(this));
}

Fish.prototype.draw = function (context) {
  'use strict';
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.dir);
  if (this.selected) {
    context.strokeStyle = 'yellow';
    context.beginPath();
    context.arc(0, 0, 15, 0, 2 * Math.PI);
    context.stroke();
  }
  context.fillStyle = 'gray';
  context.beginPath();
  context.moveTo(20, 0);
  context.lineTo(0, -12);
  context.lineTo(-10, -2);
  context.lineTo(-20, -10);
  context.lineTo(-20, 10);
  context.lineTo(-10, 2);
  context.lineTo(0, 12);
  context.fill();
  context.restore();
  this.stomach.draw(context);
  this.eye.draw(context);
  this.mouth.draw(context);
};

Fish.prototype.move = function (time) {
  'use strict';
  this.xr += this.v * time * Math.cos(this.dir);
  this.yr += this.v * time * Math.sin(this.dir);
};

Fish.prototype.stop = function () {
  'use strict';
  if (this.v === 0) { return; }
  this.v = 0;
  this.brain.reward(-0.2);
};

// actions
Fish.prototype.accelerate = function (strength) {
  'use strict';
  this.v += strength * 0.3 * (30 - this.v);
};

Fish.prototype.down = function (strength) {
  'use strict';
  this.dirr += strength * 0.3;
};

Fish.prototype.up = function (strength) {
  'use strict';
  this.dirr -= strength * 0.3;
};
