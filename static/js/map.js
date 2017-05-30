  var map;
  var markers = [];
  /**
   * 初始化地图
   */
  function initMap() {

    var largeInfoWindow = new google.maps.InfoWindow();
    // use a constructor to create a new map JS object. You can use the coordinates
    // we used, 40.7413549, -73.99802439999996 or your own!
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 39.93,
        lng: 116.39
      },
      zoom: 12
    });
    updateMarkers(locations)
  }

  /**
   * 更新地图上显示的markers
   * @param { Array } locations 包含地址名称和坐标的对象数组
   */
  function updateMarkers(locations) {
    markers = [];
    for(var i=0;i<locations.length;i++){
      var position = locations[i].location;
      var title = locations[i].title;
      var marker = showMarker(locations[i], i);
      markers.push(marker);
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfoWindow);
      })
    }
  }

  /**
   * 显示地图上的markers
   * @param { Object } mark Marker对象
   * @param { Number } index marker在数组中的index
   */
  function showMarker(mark, index) {
    return new google.maps.Marker({
      position: mark.position,
      map: map,
      title: mark.title,
      animation: google.maps.Animation.DROP,
      id: index
    })
  }

  /**
   * 
   * @param { Object } marker Marker对象
   * @param { Object } infowindow InfoWindow对象
   */
  function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function () {
        infowindow.setMarker = null;
      });
    }
  }