/**
 * Created by Subash Maharjan on 3/16/2017.
 */
var nret = nret || {};
(function ($) {
    var Carousel = function (element) {
        var self = this;
        var $carouselItems = $('.real-estate-carousel__item', element);
        var $paginationButtons = $('.real-estate-carousel__pagination button', element);
        var xDown = null;
        var yDown = null;

        if ($carouselItems.length <= 1) return;

        self.activeIndex = $('.real-estate-carousel__item.active', element).index();
        self.itemLength = $carouselItems.length;

        self.next = next;
        self.previous = previous;
        self.paginate = paginate;

        init();


        function handleTouchStart(evt) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
        };

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
                if ( xDiff > 0 ) {
                    /* left swipe */
                    self.previous();
                } else {
                    /* right swipe */
                    self.next();
                }
            } else {
                if ( yDiff > 0 ) {
                    /* up swipe */
                } else {
                    /* down swipe */
                }
            }
            /* reset values */
            xDown = null;
            yDown = null;
        };

        function init() {
            $('.real-estate-carousel__next', element).on('click', function () {
                self.next();
            });

            $('.real-estate-carousel__previous', element).on('click', function () {
                self.previous();
            });

            element.addEventListener('touchstart', handleTouchStart, false);
            element.addEventListener('touchmove', handleTouchMove, false);

            $paginationButtons.on('click', function () {
                var newIndex = $(this).index();
                self.paginate(newIndex);
            });
        }

        function _wrapIndex(index) {
            var wrappedIndex;
            if (index < 0) {
                wrappedIndex = self.itemLength - 1;
            } else if (index >= self.itemLength) {
                wrappedIndex = 0;
            } else {
                wrappedIndex = index;
            }
            return wrappedIndex;
        }

        function next() {
            var newIndex = self.activeIndex + 1;
            paginate(newIndex);
        }

        function previous() {
            var newIndex = self.activeIndex - 1;
            paginate(newIndex);
        }

        function paginate(index) {
            $carouselItems.removeClass('active');
            $paginationButtons.removeClass('active');
            self.activeIndex = _wrapIndex(index);
            $carouselItems.eq(self.activeIndex).addClass('active');
            $paginationButtons.eq(self.activeIndex).addClass('active');
        }
    };

    $('.real-estate-carousel').each(function (index, element) {
        new Carousel(element);
    });
}(jQuery));
/**
 * Created by Subash Maharjan on 3/16/2017.
 */
(function ($) {
    $contactForm = $('#real-estate-contact-form');
    if (!$contactForm) return;

    $('input[type=radio][name=real-estate-topic]', $contactForm).on('change', function () {
        var topic = this.value === 'marketing' ? 'developing' : this.value;
        $('.real-estate-contact-form__follow-up', $contactForm).hide();
        $('.real-estate-contact-form__follow-up--' + topic, $contactForm).show();
    });

    $contactForm.submit(function(event) {
        event.preventDefault();
        var timer;
        var data = $(this).serializeArray();
        var originalSubmitValue = $('#real-estate-contact-form button[type=submit]').text();
        $('#real-estate-contact-form button[type=submit]').text('Sending...');
        $.ajax({
            type: 'POST',
            url: '/api/v1/realstatecontact',
            data: data,
            success: function(response) {
                if (response.error) {
                    $('#real-estate-contact-form button[type=submit]').text('Error, Try Again');
                } else {
                    $('#real-estate-contact-form button[type=submit]').text('Sent');
                }
                window.clearTimeout(timer);
                timer = setTimeout(function() {
                    $('#real-estate-contact-form button[type=submit]').text(originalSubmitValue);
                }, 5000);
            }
        });
    });
}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 33*/
var nret = nret || {};
(function ($) {
    nret.realEstateCaseStudy = {
        init: function () {

        }
    };
}(jQuery));
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
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 35*/
var nret = nret || {};
(function ($) {
    nret.realEstateContact = {
        init: function () {

        }
    };
}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 36*/
var nret = nret || {};
(function ($) {
    nret.realEstateHomepage = {
        addListeners: function () {
            $('.real-estate-homepage-nav__menu-item > button').on('click', function () {
                $(this).closest('.real-estate-homepage-nav__menu-item').siblings().removeClass('active open');
                $(this).closest('.real-estate-homepage-nav__menu-item').toggleClass('open').addClass('active');
            });
        },
        init: function () {
            nret.realEstateHomepage.addListeners();
        }
    };
}(jQuery));
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
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 38*/
var nret = nret || {};
(function ($) {
    nret.realEstateProperty = {
        propertyFeaturesMobileDrawers: function () {
            $('.real-estate-property-features .feature button').on('click', function () {
                $(this).closest('.feature').siblings().removeClass('open');
                $(this).closest('.feature').toggleClass('open');
            });
        },
        propertyMap: function () {
            var $propertyMap = $('#property-map');
            if (!$propertyMap.length) return;
            var map = new google.maps.Map($propertyMap[0], {
                center: {
                    lat:  parseFloat($propertyMap.data('lat')),
                    lng:  parseFloat($propertyMap.data('lng'))
                },
                fullscreenControl: false,
                mapTypeControl: false,
                rotateControl: false,
                scaleControl: true,
                scrollwheel: false,
                streetViewControl: false,
                styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}],				zoom: 3,
                zoom: 8,
                zoomControl: true
            });
            var newMarker = new google.maps.Marker({
                icon: {
                    anchor: new google.maps.Point(14, 14),
                    origin: new google.maps.Point(0, 0),
                    scaledSize: new google.maps.Size(18, 26),
                    size: new google.maps.Size(18, 26),
                    url: 'https://s3.amazonaws.com/natural-retreats/real-estate/google-maps-marker.png'
                },
                position: {
                    lat: parseFloat($propertyMap.data('lat')),
                    lng: parseFloat($propertyMap.data('lng'))
                },
                map: map
            });
        },
        init: function () {
            nret.realEstateProperty.propertyFeaturesMobileDrawers();
            nret.realEstateProperty.propertyMap();
        }
    };
}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 39*/
var nret = nret || {};
(function ($) {
    nret.realEstateServices = {
        init: function () {

        }
    };
}(jQuery));