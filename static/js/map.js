  var map, infowindow, bounds;
  var markers = [];
  /**
   * 初始化地图
   */
  function initMap() {
    infowindow = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();
    // use a constructor to create a new map JS object. You can use the coordinates
    // we used, 40.7413549, -73.99802439999996 or your own!
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 39.93,
        lng: 116.39
      },
      zoom: 12
    });
    updateMarkers(locations);
    map.fitBounds(bounds);
  }

  /**
   * 更新地图上显示的markers
   * @param { Array } locations 包含地址名称和坐标的对象数组
   */
  function updateMarkers(locations) {
    clearMarkers();
    for (var i = 0; i < locations.length; i++) {
      var position = locations[i].location;
      var title = locations[i].title;
      var marker = showMarker(locations[i], i);
      markers.push(marker);
      bounds.extend(markers[i].position);
      marker.addListener('click', function () {
        requestApi(this.title).then(function (data) {
          populateInfoWindow(this, data.geocode.feature.highlightedName);
        }.bind(this));
      })
    }
  }

  /**
   * 清除地图上所有标记
   */
  function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
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
  function populateInfoWindow(marker, displayContent) {
    if (!marker.map) {
      marker.setMap(map);
    }
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent(displayContent);
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function () {
        infowindow.setMarker = null;
      });
      // bounce marker
      marker.setAnimation(google.maps.Animation.BOUNCE);
      // clear animation
      setTimeout(function () {
        marker.setAnimation(null);
      }, 1400)
    }
  }

  /**
   * Google Map Error Handler
   */
  function mapError(){
    alert('Google Map initialized Error');
  }
