var locations = [{
    name: '什刹海公园',
    point: {
      lat: 39.9204541,
      lng: 116.3693653
    }
  },
  {
    name: '天安门广场',
    point: {
      lat: 39.9063748,
      lng: 116.3925044
    }
  },
  {
    name: '奥体公园',
    point: {
      lat: 39.9942851,
      lng: 116.3915031
    }
  }
]

function SiderViewModel() {
  var self = this;
  this.name = 'savo';
  this.filter = ko.observable('');
  this.siderVisible = ko.observable(true);

  // 动态绑定地址列表
  self.filteredLots = ko.computed(function () {
    return locations.filter(function (lot) {
      return lot.name.toLowerCase().indexOf(self.filter().toLowerCase()) > -1;
    });
  });

  self.toggleSider = function () {
    self.siderVisible(!self.siderVisible());
  }

  self.markLot = function(lot){
    console.log(lot)
  }
}

ko.applyBindings(new SiderViewModel());