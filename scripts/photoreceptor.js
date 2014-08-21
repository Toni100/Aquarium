function Photoreceptor(direction) {
  'use strict';
  this.direction = direction;
  this.onfire = new EventHandlerList();
}

Photoreceptor.prototype.draw = function (context) {
  'use strict';
  context.strokeStyle = 'rgba(200, 160, 170, 0.3)';
  context.beginPath();
  context.moveTo(3 * Math.cos(this.direction), 3 * Math.sin(this.direction));
  context.lineTo(12 * Math.cos(this.direction), 12 * Math.sin(this.direction));
  context.stroke();
};

Photoreceptor.prototype.stimulate = function (direction, color, magnitude) {
  'use strict';
  if (Math.abs(this.direction - direction) < 0.3) {
    this.onfire.fire({color: color, magnitude: magnitude});
  }
};