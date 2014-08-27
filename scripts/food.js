function Food(x, y, amount) {
  'use strict';
  this.x = x;
  this.y = y;
  this.amount = amount;
}

Food.prototype.draw = function (context) {
  'use strict';
  context.fillStyle = 'yellow';
  context.beginPath();
  context.arc(this.x, this.y, 5 * Math.pow(this.amount, 1 / 3), 0, 2 * Math.PI);
  context.fill();
};