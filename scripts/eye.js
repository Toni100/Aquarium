function Eye(parent, initialxr, initialyr, initialdirr, brain) {
  'use strict';
  Shape.call(this, parent, initialxr, initialyr, initialdirr);
  this.photoreceptors = [];
  for (var i = 0; i < 11; i += 1) {
    this.photoreceptors.push(
      new Photoreceptor(this, 0, 0, -0.5 + 0.1 * i, brain, ['food', 'wall', 'fish'])
    );
  }
  brain.addAction(this.lookDown.bind(this));
  brain.addAction(this.lookUp.bind(this));
}

Eye.prototype.draw = function (context) {
  'use strict';
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.dir);
  context.fillStyle = 'white';
  context.fillRect(-2, -2, 4, 4);
  context.restore();
  this.photoreceptors.forEach(function (p) { p.draw(context); });
};

// actions
Eye.prototype.lookDown = function () {
  'use strict';
  this.dirr = 0.7;
  setTimeout(function () {
    this.dirr = 0;
  }.bind(this), 1400);
};

Eye.prototype.lookUp = function () {
  'use strict';
  this.dirr = -0.7;
  setTimeout(function () {
    this.dirr = 0;
  }.bind(this), 1400);
};