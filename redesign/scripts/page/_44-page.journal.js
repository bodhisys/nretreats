/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 31*/
var nret = nret || {};
(function($) {


    nret.journal = {

        setFeaturedArticleToTop : function() {
            var el = $('.journal-listing__featured-article').eq(0);
            $('#journalArticleContainer').prepend(el);
        },

        setJournalCookeis : function() {
            $('a[data-journal-type]').on('click', function() {
                var type = $(this).attr('data-journal-type');
                Cookies.set('journal_list[type]', type);
                $('a[data-journal-type]').removeClass('filter-selected');
                $(this).toggleClass('filter-selected');
            });

            $('a[data-journal-location]').on('click', function() {
                var location = $(this).attr('data-journal-location');
                Cookies.set('journal_list[location]', location);
                $('a[data-journal-location]').removeClass('filter-selected');
                $(this).toggleClass('filter-selected');
            });

            $('a[data-journal-environment]').on('click', function() {
                var environment = $(this).attr('data-journal-environment');
                Cookies.set('journal_list[environment]', environment);
                $('a[data-journal-environment]').removeClass('filter-selected');
                $(this).toggleClass('filter-selected');
            });

            $('a[data-journal-experience]').on('click', function() {
                var experience = $(this).attr('data-journal-experience');
                Cookies.set('journal_list[experience]', experience);
                $('a[data-journal-experience]').removeClass('filter-selected');
                $(this).toggleClass('filter-selected');
            });

        },

        removeJournalCookies : function() {
            $('.filter__clear').on('click', function() {
                Cookies.remove('journal_list[type]');
                Cookies.remove('journal_list[location]');
                Cookies.remove('journal_list[environment]');
                Cookies.remove('journal_list[experience]');
                window.location.reload();
            });
        },

        deleteForeignCookies: function() {
            $.each(document.cookie.split(/; */), function()  {
                var splitCookie = this.split('=');
                // name is splitCookie[0], value is splitCookie[1]
                var foreignPrefixes = [
                    'destination',
                    'retreat_list'
                ];

                foreignPrefixes.forEach(function(prefix) {
                    if(splitCookie[0].indexOf(prefix) !== -1) {
                        Cookies.remove(decodeURIComponent(splitCookie[0]));
                    }
                });
            });
        },

        loadMoreJournalArticles : function() {
            var page = 1,
                el,
                loading = false,
                loader = $('#journalLoader');
            $(window).scroll(function() {
                if( $(window).scrollTop() + $(window).height() > $(document).height() - 800 ) {

                    if ( loading == false ) {
                        loading = true;
                        loader.fadeIn();
                        $.ajax({
                            url: Drupal.settings.basePath + 'views/ajax',
                            type: 'post',
                            data: {
                                view_name: 'journal_list',
                                view_display_id: 'page',
                                page: page
                            },
                            dataType: 'json',
                            success: function (response) {
                                if (response[1] !== undefined) {
                                    var viewHtml = response[1].data;
                                    el = $( '<div></div>' );
                                    el.html(viewHtml);
                                    var newsBlock = $('.news-block, .journal-listing__featured-article', el); // All the journal article elements
                                    var journalContainer = $('#journalArticleContainer');
                                    loader.fadeOut();
                                    journalContainer.append(newsBlock)
                                    Drupal.attachBehaviors();
                                    page++;
                                    el = undefined;
                                    loading = false;
                                    if ( newsBlock.length < 8 ) {
                                        loading = true;
                                    }
                                }
                            }
                        });
                    }
                }
            });
        },

        init : function() {
            nret.journal.setFeaturedArticleToTop();
            nret.journal.deleteForeignCookies();
            nret.journal.setJournalCookeis();
            nret.journal.removeJournalCookies();
            nret.journal.loadMoreJournalArticles();
        }

    };


}(jQuery));