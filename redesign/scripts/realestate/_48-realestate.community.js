/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 34*/
var nret = nret || {};
(function ($) {
    function padNumber(num, size) {
        var s = num + '';
        while (s.length < size) s = '0' + s;
        return s;
    }

    nret.realEstateCommunity = {
        addListeners: function () {
            $('.real-estate-community-listings .sort-by-container > select').on('change', nret.realEstateCommunity.communitySort);
        },
        setActiveCommunityMapLocation: function (index) {
            $('.community-map-locations-item').removeClass('active');
            $('.community-map-locations-item').eq(index).addClass('active');
            for (var i = 0; i < nret.realEstateCommunity.communityMapMarkers.length; i++) {
                var iconImageUrl = i === index
                    ? 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + padNumber(i + 1, 2) + '|2A2C33|FFFFFF'
                    : 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + padNumber(i + 1, 2) + '|FFFFFF|000000';
                nret.realEstateCommunity.communityMapMarkers[i].setIcon(iconImageUrl);
                nret.realEstateCommunity.communityMapMarkers[i].setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
            }
        },
        communityMap: function () {
            var $communityMap = $('#community-map');
            if (!$communityMap.length) return;
            var $communityMapLocations = $('.community-map-locations-item');
            var map = new google.maps.Map($communityMap[0], {
                center: {
                    lat:  parseFloat($communityMapLocations.eq(0).data('latitude')),
                    lng:  parseFloat($communityMapLocations.eq(0).data('longitude'))
                },
                fullscreenControl: false,
                mapTypeControl: false,
                mapTypeId: 'hybrid',
                rotateControl: false,
                scaleControl: true,
                streetViewControl: false,
                scrollwheel: false,
                zoom: 8,
                zoomControl: true
            });
            $('.community-map-locations-item button').click(function () {
                var associatedMarkerIndex = $(this).closest('.community-map-locations-item').index();
                var associatedMarker = nret.realEstateCommunity.communityMapMarkers[associatedMarkerIndex];
                // map.setZoom(8);
                map.setCenter(associatedMarker.getPosition());
                associatedMarker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
                nret.realEstateCommunity.setActiveCommunityMapLocation(associatedMarkerIndex);
            });
            for (var i = 0; i < $communityMapLocations.length; i++) {
                (function (i) {
                    var iconImageUrl = i === 0
                        ? 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + padNumber(i + 1, 2) + '|2A2C33|FFFFFF'
                        : 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + padNumber(i + 1, 2) + '|FFFFFF|000000';
                    var newMarker = new google.maps.Marker({
                        icon: iconImageUrl,
                        position: {
                            lat: parseFloat($communityMapLocations.eq(i).data('latitude')),
                            lng: parseFloat($communityMapLocations.eq(i).data('longitude'))
                        },
                        map: map
                    });
                    newMarker.addListener('click', function () {
                        map.setZoom(8);
                        map.setCenter(newMarker.getPosition());
                        newMarker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
                        nret.realEstateCommunity.setActiveCommunityMapLocation(i);
                    });
                    nret.realEstateCommunity.communityMapMarkers.push(newMarker);
                })(i);
            }
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < nret.realEstateCommunity.communityMapMarkers.length; i++) {
                bounds.extend(nret.realEstateCommunity.communityMapMarkers[i].getPosition());
            }
            map.fitBounds(bounds);
            nret.realEstateCommunity.setActiveCommunityMapLocation(0);
        },
        communityMapMarkers: [],
        communitySort: function (e) {
            var $wrapper = $(".real-estate-community-listings__teasers");
            var $selected = $('.real-estate-community-listings .sort-by-container > select');
            var $listings = $('article.real-estate-property-teaser');
            [].sort.call($listings, function (a, b) {
                var bedroomA = parseInt(+$(a).attr('data-bedrooms').replace(/\D/g, ''));
                var bedroomB = parseInt(+$(b).attr('data-bedrooms').replace(/\D/g, ''));
                var priceA = parseInt(+$(a).attr('data-price').replace(/\D/g, ''));
                var priceB = parseInt(+$(b).attr('data-price').replace(/\D/g, ''));
                switch ($selected.val()) {
                    //sort by ascending # of bedrooms
                    case '1':
                        return bedroomA - bedroomB;
                        break;
                    //sort by descending # of bedrooms
                    case '2':
                        return bedroomB - bedroomA;
                        break;
                    //sort by ascending price
                    case '3':
                        return priceA - priceB;
                        break;
                    //sort by descending price
                    case '4':
                        return priceB - priceA;
                        break;
                    default:
                }
            });
            $listings.each(function () {
                $wrapper.append(this);
            });
        },
        init: function () {
            nret.realEstateCommunity.addListeners();
            nret.realEstateCommunity.communitySort();
            nret.realEstateCommunity.communityMap();
        }
    };
}(jQuery));