var locations = [{
    title: '什刹海公园',
    position: {
      lat: 39.9204541,
      lng: 116.3693653
    }
  },
  {
    title: '天安门广场',
    position: {
      lat: 39.9063748,
      lng: 116.3925044
    }
  },
  {
    title: '奥体公园',
    position: {
      lat: 39.9942851,
      lng: 116.3915031
    }
  }
]

/**
 * 侧边栏 VM
 */
function SiderViewModel() {
  var self = this;
  this.name = 'savo';
  this.filter = ko.observable('');
  this.siderVisible = ko.observable(true);

  // 动态绑定地址列表
  self.filteredLots = ko.computed(function () {
    var res =  locations.filter(function (lot) {
      return lot.title.toLowerCase().indexOf(self.filter().toLowerCase()) > -1;
    });
    // 更新地图信息
    updateMarkers(res);
    return res;
  });

  self.toggleSider = function () {
    self.siderVisible(!self.siderVisible());
  }

  self.markLot = function(lot){
    showMarker(lot);
  }
}
/**
 * app 初始化函数，Google JS回调调用
 */
function appInit() {
  ko.applyBindings(new SiderViewModel());
  initMap();
}