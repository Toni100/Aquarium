var aquarium = new Aquarium(document.getElementById('water')),
  networkView = new NetworkView(document.getElementById('brain'));
while (aquarium.fish.length < 5) {
  aquarium.addFish();
}
while (aquarium.food.length < 10) {
  aquarium.addFood();
}
setInterval(function () {
  'use strict';
  while (aquarium.food.length < 25) {
    aquarium.addFood();
  }
}, 9000);
aquarium.onclickfish.add(function (event) {
  'use strict';
  networkView.network = event.data.fish.brain;
});