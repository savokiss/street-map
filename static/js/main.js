var locations = [
  'savo',
  'test',
  'null',
  'nothing'
]

function SiderViewModel() {
  var self = this;
  this.name = 'savo';
  this.filter = ko.observable('');
  this.siderVisible = ko.observable(true);

  // 动态绑定地址列表
  self.filteredLots = ko.computed(function() {
    return locations.filter(function(lot){
      return lot.toLowerCase().indexOf(self.filter().toLowerCase()) > -1;
    });
  });

  self.toggleSider = function() {
    self.siderVisible(!self.siderVisible());
    // $('#sider').slideToggle();
  }
}

ko.applyBindings(new SiderViewModel());