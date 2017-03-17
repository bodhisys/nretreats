/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 16*/
// Pease refer to Google Maps Javascript API Documentation
// If maps are showing up as blank, check to see if a height and width are set before this runs.
var nret = nret || {};
(function($){
    nret.maps = {
        mapController : function(){
            var mapMarkers = [],
                activeMarker,
                pinColor = "505866",
                inactiveMarker =  new google.maps.MarkerImage("/themes/nretreats/images/pin_alt.png");
            return {
                updateMarker: function(marker){
                    if(activeMarker){
                        activeMarker.setIcon(inactiveMarker);
                    }
                    activeMarker = marker;
                    marker.setIcon();
                },
                push:function(marker){
                    mapMarkers.push(marker);
                },
                setHightlightContainer:function(container){
                    for(var markerItem=0; markerItem < mapMarkers.length; markerItem++){
                        mapMarkers[markerItem].setIcon(inactiveMarker);
                        (function(position){
                            mapMarkers[markerItem].addListener('click', function() {
                                $($('.'+container).children()[position]).find('h4').trigger('click');
                            });
                        })(markerItem);
                    }
                    $('.'+container).children().on('click',function(obj){
                        this.updateMarker(mapMarkers[$(obj.currentTarget).index()])
                    }.bind(this));
                    $(function(){
                        $($('.'+container).children()[0]).find('h4').trigger('click');
                    });
                },
                setBounds:function(map){
                    var bounds = new google.maps.LatLngBounds();
                    for(var markerItem=0; markerItem < mapMarkers.length; markerItem++){
                        bounds.extend(mapMarkers[markerItem].getPosition());
                    }

                    map.fitBounds(bounds);

                    zoomChangeBoundsListener =
                        google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
                            if (this.getZoom()){
                                this.setZoom(this.getZoom() - 2);
                            }
                        });
                    setTimeout(function(){google.maps.event.removeListener(zoomChangeBoundsListener)}, 2000);
                }
            }
        },
        initMap : function(lat, lng, el, markersArray, highlightOnClickContainer,zoom) {
            var zoom = zoom;
            var latLng;
            var destinationId = null;
            var region = null;
            var allMarkers = [];
            var regionArr = [];

            if (zoom === undefined) {
                zoom = 8;
            }
            // Specify features and elements to define styles.
            var styleArray = [
                {
                    featureType: "all",
                    stylers: [
                        { saturation: -80 }
                    ]
                },{
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [
                        { hue: "#e4e4e4" },
                        { saturation: 50 }
                    ]
                },{
                    featureType: "poi.business",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                }
            ];

            var map = new google.maps.Map(el, {
                    center: {lat: lat, lng: lng},
                    scrollwheel: false,
                    styles: styleArray,
                    disableDefaultUI: false,
                    zoom: zoom
                }),
                mapController = new this.mapController();
            if (markersArray.length > 0) {
                var mapCardContainer = $('.map-card__container');
                var c = 0;
                markersArray.forEach(function(index){
                    latLng = {lat: parseFloat(index[0]), lng: parseFloat(index[1])};
                    if (index[2]) {
                        destinationId = index[2];
                    }
                    if (index[3]) {
                        region = String(index[3]);
                    }
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        id : destinationId,
                        region: region,
                        animation: google.maps.Animation.DROP
                    }); // end market obj
                    mapController.push(marker);
                    allMarkers.push(marker);
                    google.maps.event.addListener(marker, 'click', function () {
                        mapCardContainer.removeClass('show');
                        mapCardContainer.each(function() {
                            if ($(this).data('destinationcard') == marker.id) {
                                $(this).addClass('show');
                            }
                        });
                    });
                    c++;
                }) // end for each

                $('.region-list').find('.filter-choice-init').on('click', function() {

                    var r = $(this).data('filter-choice');
                    if(jQuery.inArray(r, regionArr) !== -1) {
                        for (var i=regionArr.length-1; i>=0; i--) {
                            if (regionArr[i] === r) {
                                regionArr.splice(i, 1);
                            }
                        }
                    } else {
                        regionArr.push(r);
                    }

                    for(i=0; i < allMarkers.length; i++) {
                        var region = allMarkers[i].region;
                        allMarkers[i].setMap(null);
                        for (t=0;t<regionArr.length;t++) {
                            if (region === regionArr[t]) {
                                allMarkers[i].setMap(map);
                            }
                        }
                    }

                    // Wait for class to be added from page_destinationListing.js
                    window.setTimeout(function() {
                        // If none are selected, show all markers
                        if ( $('.region-list').find('.filter-selected').length === 0 ) {
                            showAllMarkers();
                        }
                    }, 100);
                });

                // Shares handler with class filter__clear
                $('.destination-listing__filter-clear').on('click', function() {
                    showAllMarkers();
                });

                function showAllMarkers() {
                    for(i=0; i < allMarkers.length; i++) {
                        allMarkers[i].setMap(map);
                    }
                }

                if(highlightOnClickContainer){
                    mapController.setHightlightContainer(highlightOnClickContainer);
                    mapController.setBounds(map);
                }
            } //end if

        },

        getMapElements : function(mapSelector) {
            var maps = mapSelector || $('.map');
            maps.each(function(){
                var zoom = undefined;
                var $this = $(this),
                    el = this,
                    spliceNum,
                    lat = $this.attr('data-lat'),
                    latNum = Number(lat),
                    lng = $this.attr('data-lng'),
                    lngNum = Number(lng),
                    markersArray = [],
                    highlightOnClickContainer = $this.data('highlightonclickcontainer');
                if ($this.attr('data-zoom')) {
                    zoom = parseInt($this.attr('data-zoom'));
                }
                if($this.attr('id') === 'destinationListMap') {
                    spliceNum = 4;
                } else {
                    spliceNum = 2;
                }

                if ( $this.data('markers') ) {
                    var dataArray = $(this).data('markers');
                    if($this.attr('id') === 'destinationListMap') {
                        dataArray = dataArray.replace('[', '').replace(']', '').split(',');
                    }
                    for (var i = 0; i < dataArray.length; i++) {
                        var items = dataArray.splice(0,spliceNum);
                        if (dataArray.length == spliceNum) {
                            markersArray.push(dataArray);
                        }
                        markersArray.push(items);
                    }
                }
                nret.maps.initMap(latNum, lngNum, el, markersArray, highlightOnClickContainer, zoom);
            });
        },

        runMapInOrder : function() {
            nret.maps.getMapElements();
        }
    };


}(jQuery));