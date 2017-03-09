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