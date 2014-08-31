function Aquarium(canvas) {
  'use strict';
  this.fish = [];
  this.food = [];
  this.onclickfish = new EventHandlerList();
  this.canvas = canvas;
  this.canvas.onclick = function (event) {
    var x = event.layerX,
      y = event.layerY,
      candidate;
    this.fish.forEach(function (f) {
      if (candidate) {
        if (Math.pow(f.x - x, 2) + Math.pow(f.y - y, 2) < Math.pow(candidate.x - x, 2) + Math.pow(candidate.y - y, 2)) {
          candidate = f;
        }
      } else {
        candidate = f;
      }
    });
    if (candidate) {
      this.fish.forEach(function (f) { f.selected = false; });
      candidate.selected = true;
      this.onclickfish.fire({fish: candidate});
    }
  }.bind(this);
  setInterval(this.deliverMotion.bind(this), 40);
  setInterval(this.deliverVisual.bind(this), 800);
  setInterval(this.deliverFood.bind(this), 150);
}

Aquarium.prototype.addFish = function () {
  'use strict';
  var fish = new Fish(
    10 + Math.random() * (this.canvas.width - 20),
    10 + Math.random() * (this.canvas.height - 20),
    2 * Math.PI * Math.random()
  );
  this.fish.push(fish);
  this.draw();
};

Aquarium.prototype.addFood = function () {
  'use strict';
  this.food.push(new Food(
    10 + Math.random() * (this.canvas.width - 20),
    10 + Math.random() * (this.canvas.height - 20),
    0.24 * Math.random()
  ));
  this.draw();
};

Aquarium.prototype.deliverFood = function () {
  'use strict';
  this.fish.forEach(function (f) {
    var food = this.getFood(f.mouth.x, f.mouth.y);
    if (food.length) {
      if (f.mouth.tryPut(food[0])) {
        this.food.splice(this.food.indexOf(food[0]), 1);
      }
    }
  }, this);
};

Aquarium.prototype.deliverMotion = function () {
  'use strict';
  this.fish.forEach(function (f) {
    var dir = ((f.dir % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    if ((f.x < 10 && Math.PI / 2 < dir && dir < 3 * Math.PI / 2) ||
        (f.y < 10 && Math.PI < dir && dir < 2 * Math.PI) ||
        (f.x > this.canvas.width - 10 && ((0 <= dir && dir < Math.PI / 2) || (3 * Math.PI / 2 < dir && dir <= 2 * Math.PI))) ||
        (f.y > this.canvas.height - 10 && 0 < dir && dir < Math.PI)) {
      f.stop();
    }
    f.move(0.04);
    f.v *= 0.99;
  }, this);
};

Aquarium.prototype.deliverVisual = function () {
  'use strict';
  this.fish.forEach(function (f) {
    f.eye.photoreceptors.forEach(function (p) {
      p.tryStimulate(this.getVisual(p.x, p.y, p.dir));
    }, this);
  }, this);
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
    this.food.forEach(function (f) { f.draw(context); });
    this.draw();
  }.bind(this));
};

Aquarium.prototype.getFood = function (x, y) {
  'use strict';
  var food = [];
  this.food.forEach(function (f) {
    if (Math.sqrt(Math.pow(f.x - x, 2) + Math.pow(f.y - y, 2)) < 15) {
      food.push(f);
    }
  });
  return food;
};

Aquarium.prototype.getVisual = function (x, y, dir) {
  'use strict';
  var visual = [];
  function dirDiff(angle1, angle2) {
    return Math.abs((Math.abs(angle1 - angle2) + Math.PI) % (2 * Math.PI) - Math.PI);
  }
  this.food.forEach(function (f) {
    if (dirDiff(dir, Math.atan2(f.y - y, f.x - x)) < 0.05) {
      visual.push({
        type: 'food',
        distance: Math.sqrt(Math.pow(f.x - x, 2) + Math.pow(f.y - y, 2))
      });
    }
  });
  return visual;
};
