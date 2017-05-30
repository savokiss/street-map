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
    self.locations(locations.filter(function(val){
      return val.indexOf(self.filter) > -1;
    }));
  }
}

ko.applyBindings(new SiderViewModel());