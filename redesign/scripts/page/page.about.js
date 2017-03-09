/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 26*/
var nret = nret || {};
(function($) {


    nret.about = {

        embedInstagramPics : function() {
            var feed = new Instafeed({
                get: 'user',
                userId: '1101490324',
                clientId: 'c8d28a45dd02413e975170c69d007168',
                sortBy: 'most-recent',
                resolution: 'standard_resolution',
                template: '<div class="instagram-block" style="background:url({{image}}) no-repeat center center;background-size:contain;background-position:top;"><div class="instagram-block__cta"><span class="icon icon_instagram"></span></div></div>',
                limit: 2
            });
            feed.run();
        },

        controlPlaybackOnAbout : function() {
            var aboutBgVid = document.getElementById('aboutBgVid')
            $('#launchMobileAboutVideo').on('click', function() {
                aboutBgVid.webkitEnterFullscreen();
                aboutBgVid.play();

            });
        },

        init : function() {
            nret.about.embedInstagramPics();
            nret.about.controlPlaybackOnAbout();
        }

    };
}(jQuery));