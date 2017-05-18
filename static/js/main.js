var locations = [
  'savo',
  'test',
  'null',
  'nothing'
]

function SiderViewModel() {
  var self = this;
  this.name = 'savo';
  self.locations = ko.observableArray(locations);
}

ko.applyBindings(new SiderViewModel());