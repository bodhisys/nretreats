/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 25*/
(function($) {
    var player;
    var videoId;
    var iframe;
    var open = true;
    var flip = false;
    var pause = "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28";
    var play = "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26";
    var $animation = $('#animation');

    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    $('#initVideoPlayer').on('click', function(){
        $('.video__player').addClass('open');
        $('.video__player').velocity(
            {opacity:1 }, {display:'block'}
        );
        videoId = $(this).attr('data-videoId');
        onYouTubeIframeAPIReady(videoId);
        $('.page-body').addClass('quickview-blur');
        $('.video__player').scrollLock();
    });

    function onYouTubeIframeAPIReady(videoId) {
        player = new YT.Player('ytVideo', {
            width: 600,
            height: 400,
            videoId: videoId,
            playerVars: {
                'controls': 0,
                'modestbranding' :0,
                'autoplay' : 1,
                'showinfo' : 0
            },
            events: {
                onReady: initialize,
                'onStateChange' : function(event) {
                    if (event.data == YT.PlayerState.PLAYING) {
                        animatePlayPauseBtn();
                    } else if (event.data == YT.PlayerState.PAUSED){
                        animatePlayPauseBtn();
                    }

                }
            }
        });
    }

    function initialize(){
        var time_update_interval;

        // Update the controls on load
        // Work in Progress
        updateProgressBar();

        // Clear any old interval.
        clearInterval(time_update_interval);

        // Start interval to update elapsed time display and
        // the elapsed part of the progress bar every second.
        time_update_interval = setInterval(function () {
            updateProgressBar();
        }, 1000)
    }

    // Scroll and scrub
    $('#progressBar').on('click touchend', function (e) {
        var totalWidth = $('#progressBar').width();
        // innerWidth = $('')

        // Calculate the new time for the video.
        // new time in seconds = total duration in seconds * ( value of range input / 100 )
        var newTime = player.getDuration() * (e.clientX / 100)

        // Skip video to new time.
        player.seekTo(newTime);

    });

    // Open Sharing module
    $('.video__control__share').on('click', function() {
        var share = $(this).find('.video__control__share__list');
        open = !open;

        if ( open === true ) {
            share.velocity({
                height: 0
            }, {duration:200});
        } else {
            share.velocity({
                height:80
            }, {duration:200});

        }
    });

    // Fullscreen video
    $('.video__control__fullscreen').on('click', function() {
        iframe = document.getElementById('ytVideo');
        playFullscreen(iframe);
    });

    // Close and Destroy Video element
    $('.video__control__close').on('click', function() {
        destroyVideo();
        $('.page-body').removeClass('quickview-blur');
        $('.video__player').scrollRelease();
    });

    $(".ytp-play-button").on('click', function() {
        if (flip === false) {
            player.playVideo();
        } else {
            player.pauseVideo();
        }
    });

    function escapeClose() {
        $(document).keyup(function(e) {
            if (e.keyCode == 27) { // escape key maps to keycode `27`
                if ( $('.video__player').hasClass('open') ) {
                    destroyVideo();
                }
            }
        });
    };

    function playFullscreen (){
        var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
        if (requestFullScreen) {
            requestFullScreen.bind(iframe)();
        }
    }

    function updateProgressBar(){
        // Update the value of our progress bar accordingly.
        var duration = (player.getCurrentTime() / player.getDuration()) * 100;
        var durationToPercent = duration + '%';
        $('#progressBar').find('div').velocity({
            width: durationToPercent
        });
    }

    function destroyVideo() {
        $('.video__player').velocity(
            {opacity:0 }, {display:'none'}
        );
        player.destroy();
        $('.video__player').removeClass('open');
    }

    function animatePlayPauseBtn() {
        flip = !flip;
        $animation.attr({
            "from": flip ? pause : play,
            "to": flip ? play : pause
        }).get(0).beginElement();
    };

}(jQuery));