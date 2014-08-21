function Aquarium(canvas) {
  'use strict';
  this.canvas = canvas;
  this.fish = [];
  setInterval(function () {
    this.fish.forEach(function (f) {
      var dir = ((f.direction % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      if ((f.x < 10 && Math.PI / 2 < dir && dir < 3 * Math.PI / 2) ||
          (f.y < 10 && Math.PI < dir && dir < 2 * Math.PI) ||
          (f.x > canvas.width - 10 && ((0 <= dir < Math.PI / 2) || (3 * Math.PI / 2 < dir <= 2 * Math.PI))) ||
          (f.y > canvas.height - 10 && 0 < dir && dir < Math.PI)) {
        f.stop();
      }
      f.move(0.04);
      f.v *= 0.99;
    });
  }.bind(this), 40);
  var i = 0;
  setInterval(function () {
    i += 1;
    if (i >= this.fish.length) {
      i = 0;
    }
    this.fish[i].mouth.eat();
    if (Math.random() > 0.7) {
      this.fish[i].eye.lookUp();
    } else if (Math.random() > 0.7) {
      this.fish[i].eye.lookDown();
    }
    if (Math.random() > 0.3) {
      this.fish[i].accelerate();
    }
    if (Math.random() > 0.8) {
      this.fish[i].directionUp();
    } else if (Math.random() > 0.6) {
      this.fish[i].directionDown();
    }
  }.bind(this), 50);
}

Aquarium.prototype.addFish = function () {
  'use strict';
  var fish = new Fish(
    10 + Math.random() * (this.canvas.width - 20),
    10 + Math.random() * (this.canvas.height - 20),
    2 * Math.PI * Math.random()
  );
  fish.onchange.add(this.draw.bind(this));
  this.fish.push(fish);
  this.draw();
};

Aquarium.prototype.draw = function () {
  'use strict';
  if (this.drawing) { return; }
  this.drawing = true;
  requestAnimationFrame(function () {
    this.drawing = false;
    var context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.fish.forEach(function (f) { f.draw(context); });
  }.bind(this));
};