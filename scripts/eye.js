function Eye(x, y, direction) {
  'use strict';
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.photoreceptors = [];
  var i;
  for (i = 0; i < 11; i += 1) {
    this.photoreceptors.push(new Photoreceptor(-0.5 + 0.1 * i));
  }
  this.onchange = new EventHandlerList();
}

Eye.prototype.draw = function (context) {
  'use strict';
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.direction);
  context.fillStyle = 'white';
  context.fillRect(-1, -1, 2, 2);
  this.photoreceptors.forEach(function (p) { p.draw(context); });
  context.restore();
};

Eye.prototype.lookDown = function () {
  'use strict';
  this.direction = 0.7;
  this.onchange.fire({direction: this.direction});
  setTimeout(function () {
    this.direction = 0;
    this.onchange.fire({direction: this.direction});
  }.bind(this), 900);
};

Eye.prototype.lookUp = function () {
  'use strict';
  this.direction = -0.7;
  this.onchange.fire({direction: this.direction});
  setTimeout(function () {
    this.direction = 0;
    this.onchange.fire({direction: this.direction});
  }.bind(this), 900);
};

Eye.prototype.stimulate = function (direction, color, magnitude) {
  'use strict';
  this.photoreceptors.forEach(function (p) {
    p.stimulate(direction, color, magnitude);
  });
};