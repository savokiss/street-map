var locations = [
  'savo',
  'test',
  'null',
  'nothing'
]

function SiderViewModel() {
  var self = this;
  this.name = 'savo';
  this.filter = '';
  self.locations = ko.observableArray(locations);

  self.handleFilterChange = function() {
    console.log(this.filter)
  }
}

ko.applyBindings(new SiderViewModel());