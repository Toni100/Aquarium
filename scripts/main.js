var aquarium = new Aquarium(document.getElementById('water')),
  networkView = new NetworkView(document.getElementById('brain'));
while (aquarium.fish.length < 10) {
  aquarium.addFish();
}
aquarium.onclickfish.add(function (event) {
  networkView.network = event.data.fish.brain;
});