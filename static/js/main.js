var locations = [{
    title: '天安门广场',
    pinyin: 'Tian An Men Guang Chang',
    position: {
      lat: 39.9063748,
      lng: 116.3925044
    }
  },
  {
    title: '奥林匹克公园',
    pinyin: 'Ao Lin Pi Ke Gong Yuan',
    position: {
      lat: 39.9942851,
      lng: 116.3915031
    }
  },
  {
    title: '颐和园',
    pinyin: 'Yi He Yuan',
    position: {
      lat: 39.9892384,
      lng: 116.232084212
    }
  },
  {
    title: '大观园',
    pinyin: 'Da Guan Yuan',
    position: {
      lat: 39.8712889,
      lng: 116.353961517
    }
  },
  {
    title: '故宫博物院',
    pinyin: 'Gu Gong Bo Wu Yuan',
    position: {
      lat: 39.9101321,
      lng: 116.363471212
    }
  }
]

/**
 * 侧边栏 VM
 */
function AppViewModel() {
  var self = this;
  self.name = 'savo';
  self.filter = ko.observable('');
  self.siderVisible = ko.observable(true);

  /**
   * 动态绑定地址列表
   */
  self.filteredLots = ko.computed(function () {
    var res = locations.filter(function (lot) {
      return lot.title.toLowerCase().indexOf(self.filter().toLowerCase()) > -1;
    });
    // 更新地图信息
    updateMarkers(res);
    return res;
  });

  /**
   * 切换侧边栏
   */
  self.toggleSider = function () {
    self.siderVisible(!self.siderVisible());
  }

  /**
   * 点击地点高亮地图上的标记
   */
  self.markLot = function (lot) {
    populateInfoWindow(markers[locations.indexOf(lot)]);
  }
}
/**
 * app 初始化函数，Google JS回调调用
 */
function appInit() {
  initMap();
  ko.applyBindings(new AppViewModel());
}

/**
 * 获取 foursquare 数据
 * @param { String } location 
 */
function requestApi(location) {
  var clientId = 'EK1A12BSCKPWIGLZOWRWI44OBGJSG1M35FMPXVCGRVI1ZGUK';
  var clientSecret = 'WOJWRAPLVCN5FNKH52D4P4Q5YDF2RWDZQ5QCKUE5KPYXIJC1';
  var url = 'https://api.foursquare.com/v2/venues/search?v=20170601';
  var requestUrl = url + '&near=' + location + '&client_id=' + clientId + '&client_secret=' + clientSecret;
  return $.get(requestUrl).then(function (data) {
    return data.response;
  }, function (data) {
    alert(data.responseJSON.meta.errorDetail);
  });
}