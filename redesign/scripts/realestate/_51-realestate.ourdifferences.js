/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 37*/
var nret = nret || {};
(function ($) {
    nret.realEstateOurDifferences = {
        markers: [],
        setLocationsMapLocation: function (index) {
            var $realEstateOurDifferencesMapLocations = $('.our-differences-map-locations-item');
            $realEstateOurDifferencesMapLocations.removeClass('active');
            $realEstateOurDifferencesMapLocations.eq(index).addClass('active');
            for (var i = 0; i < nret.realEstateOurDifferences.markers.length; i++) {
                if (i === index) {
                    nret.realEstateOurDifferences.markers[i].setIcon({
                        anchor: new google.maps.Point(31, 31),
                        origin: new google.maps.Point(0, 0),
                        scaledSize: new google.maps.Size(34, 49),
                        size: new google.maps.Size(34, 49),
                        url: 'https://s3.amazonaws.com/natural-retreats/real-estate/google-maps-marker-active.png'
                    });
                } else {
                    nret.realEstateOurDifferences.markers[i].setIcon({
                        anchor: new google.maps.Point(14, 14),
                        origin: new google.maps.Point(0, 0),
                        scaledSize: new google.maps.Size(18, 26),
                        size: new google.maps.Size(18, 26),
                        url: 'https://s3.amazonaws.com/natural-retreats/real-estate/google-maps-marker.png'
                    });
                }
            }
        },
        ourLocationsMap: function () {
            var $realEstateOurDifferencesMap = $('#our-differences-map');
            if (!$realEstateOurDifferencesMap.length) return;
            var $realEstateOurDifferencesMapLocations = $('.our-differences-map-locations-item');
            var map = new google.maps.Map($realEstateOurDifferencesMap[0], {
                center: {
                    lat:  parseFloat($realEstateOurDifferencesMapLocations.eq(0).data('latitude')),
                    lng:  parseFloat($realEstateOurDifferencesMapLocations.eq(0).data('longitude'))
                },
                fullscreenControl: false,
                mapTypeControl: false,
                rotateControl: false,
                scaleControl: true,
                scrollwheel: false,
                streetViewControl: false,
                styles: [{"featureType": "administrative","elementType": "all","stylers": [{"saturation": "-100"}]},{"featureType": "administrative.province","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "landscape","elementType": "all","stylers": [{"saturation": -100},{"lightness": 65},{"visibility": "on"}]},{"featureType": "poi","elementType": "all","stylers": [{"saturation": -100},{"lightness": "50"},{"visibility": "simplified"}]},{"featureType": "road","elementType": "all","stylers": [{"saturation": "-100"},{"visibility": "off"}]},{"featureType": "road.highway","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "road.arterial","elementType": "all","stylers": [{"lightness": "30"}]},{"featureType": "road.local","elementType": "all","stylers": [{"lightness": "40"}]},{"featureType": "transit","elementType": "all","stylers": [{"saturation": -100},{"visibility": "off"}]},{"featureType": "water","elementType": "all","stylers": [{"lightness": "100"}]},{"featureType": "water","elementType": "geometry","stylers": [{"hue": "#ffff00"},{"lightness": -25},{"saturation": -97}]},{"featureType": "water","elementType": "labels","stylers": [{"lightness": -25},{"saturation": -100}]}],
                zoom: 3,
                zoomControl: true
            });
            for (var i = 0; i < $realEstateOurDifferencesMapLocations.length; i++) {
                (function (i) {
                    var newMarker = new google.maps.Marker({
                        icon: i === 0
                            ? {
                                anchor: new google.maps.Point(31, 31),
                                origin: new google.maps.Point(0, 0),
                                scaledSize: new google.maps.Size(34, 49),
                                size: new google.maps.Size(34, 49),
                                url: 'https://s3.amazonaws.com/natural-retreats/real-estate/google-maps-marker-active.png'
                            }
                            : {
                                anchor: new google.maps.Point(14, 14),
                                origin: new google.maps.Point(0, 0),
                                scaledSize: new google.maps.Size(18, 26),
                                size: new google.maps.Size(18, 26),
                                url: 'https://s3.amazonaws.com/natural-retreats/real-estate/google-maps-marker.png'
                            },
                        position: {
                            lat: parseFloat($realEstateOurDifferencesMapLocations.eq(i).data('latitude')),
                            lng: parseFloat($realEstateOurDifferencesMapLocations.eq(i).data('longitude'))
                        },
                        map: map
                    });
                    newMarker.addListener('click', function () {
                        map.setZoom(3);
                        map.setCenter(newMarker.getPosition());
                        nret.realEstateOurDifferences.setLocationsMapLocation(i);
                    });
                    nret.realEstateOurDifferences.markers.push(newMarker);
                })(i);
            }
        },
        init: function () {
            nret.realEstateOurDifferences.ourLocationsMap();
        }
    };
}(jQuery));