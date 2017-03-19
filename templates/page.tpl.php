<?php
$userglobalposition = nret_get_usergloballocation(isset($node)?$node:null);
$livechat_planecode = variable_get('nret_contact_'.$userglobalposition.'_livechat_plancode');
$livechat_siteid = variable_get('nret_contact_'.$userglobalposition.'_livechat_siteid');
$contact_name = variable_get('nret_contact_'.$userglobalposition.'_name');
$contact_phone = variable_get('nret_contact_'.$userglobalposition.'_phone');
$contact_image_fid = variable_get('nret_contact_'.$userglobalposition.'_profile_image');
$search_quick_links_destinations = variable_get('nret_search_featured_destinations');
$search_quick_links_retreats = variable_get('nret_search_featured_retreats');
$search_quick_links_offers = variable_get('nret_search_featured_offers');

if ( isset($node) ) {
    if ( $node->nid == 2984 || (isset($node->field_destination) && isset($node->field_destination[LANGUAGE_NONE]) && isset($node->field_destination[LANGUAGE_NONE][0]['target_id']) && $node->field_destination[LANGUAGE_NONE][0]['target_id'] == 2984)) {
        $contact_phone = '877-318-2090';
    }
}

if (isset($node) && isset($node->api_data) && isset($node->api_data->RegionId)) {
    $region_id = $node->api_data->RegionId;
} else {
    $region_id = 3;  //to not have undefined variable $region_id errors
}

if (!empty($contact_image_fid) && !is_null($contact_image_fid)) {
    $contact_image_file = file_load($contact_image_fid);
    $contact_image_url = nret_parse_image_url($contact_image_file);
} else {
    $contact_image_url = '';
}

switch(substr(current_path(), 0, 2)) {
    case 'uk':
        $currentcountry = 'United Kingdom';
        break;
    case 'ie':
        $currentcountry = 'Ireland';
        break;
    case 'us':
    default:
        $currentcountry = 'United States';
        break;
}


$destinations_subnav_list = nret_get_destinations();

?>


<nav class="global-nav">
    <div class="inner">
        <div class="search__quick-links">
            <?php if(!empty($search_quick_links_destinations)) { ?>
                <div class="search__quick-links__container">
                    <h2>Featured Destinations</h2>
                    <ul>
                        <?php
                        foreach($search_quick_links_destinations as $destination_link) {
                            $destination_node = entity_metadata_wrapper('node',$destination_link);
                            $title = $destination_node->title->value();
                            $memcache_data = nret_get_destination_from_memcache_api(new MemWrapper(), $destination_node->field_api_id->value());
                            $state = isset($memcache_data->GeographicRegion)?$memcache_data->GeographicRegion:'';
                            if(!empty($state))
                            {
                                $title .= ' ('.$state.", ".strtoupper($destination_node->field_api_region_url_prefix->value()).")";
                            }else{
                                $title .= ' ('.strtoupper($destination_node->field_api_region_url_prefix->value()).")";
                            }
                            ?>
                            <li><a href="<?php echo url('node/'.$destination_link); ?>"><?php echo $title; ?></a></li>
                        <?php }?>
                    </ul>
                </div>
            <?php } ?>
            <?php if(!empty($search_quick_links_retreats)) { ?>
                <div class="search__quick-links__container">
                    <h2>Featured Retreats</h2>
                    <ul>
                        <?php
                        foreach($search_quick_links_retreats as $retreat_link) {
                            $retreat_node = entity_metadata_wrapper('node',$retreat_link);
                            $title = $retreat_node->title->value()." - ".$retreat_node->field_destination->title->value();
                            $memcache_data = nret_get_destination_from_memcache_api(new MemWrapper(), $retreat_node->field_destination->field_api_id->value());
                            $state = isset($memcache_data->GeographicRegion)?$memcache_data->GeographicRegion:'';
                            if(!empty($state))
                            {
                                $title .= ' ('.$state.", ".strtoupper($retreat_node->field_destination->field_api_region_url_prefix->value()).")";
                            }else{
                                $title .= ' ('.strtoupper($retreat_node->field_destination->field_api_region_url_prefix->value()).")";
                            }
                            ?>
                            <li><a href="<?php echo url('node/'.$retreat_link); ?>"><?php echo $title; ?></a></li>
                        <?php }?>
                    </ul>
                </div>
            <?php } ?>
            <?php if(!empty($search_quick_links_offers)) { ?>
                <div class="search__quick-links__container">
                    <h2>Top Offers</h2>
                    <ul>
                        <?php
                        foreach($search_quick_links_offers as $offer_link) {
                            $offer_node = entity_metadata_wrapper('node',$offer_link);
                            $title = $offer_node->title->value();
                            try {
                                $title .= ' ('.strtoupper($offer_node->field_destination->field_api_region_url_prefix->value()).")";
                            }catch (Exception $e){
                                //Since there is nothing in the DB related we attempt to gt from the cache
                                $memcache_data = nret_get_offer_from_memcache_api(new MemWrapper(), $offer_node);
                                if(!empty($memcache_data))
                                {
                                    if(isset($memcache_data->data[0]->RegionId))
                                    {
                                        $title .= ' (';
                                        switch ($memcache_data->data[0]->RegionId)
                                        {
                                            case 1:
                                                $title .= 'UK';
                                                break;
                                            case 2:
                                                $title .= 'IE';
                                                break;
                                            case 3:
                                                $title .= 'US';
                                                break;
                                        }
                                        $title .= ')';
                                    }
                                }
                            }
                            ?>
                            <li><a href="<?php echo url('node/'.$offer_link); ?>"><?php echo $title; ?></a></li>
                        <?php }?>
                    </ul>
                </div>
            <?php } ?>
        </div>
        <div class="global-nav__search-wrapper">
            <form id="globalSearch" action="/search" method="get" accept-charset="utf-8">
                <input id="globalSearchInput" type="search" name="search" value="" placeholder="Search">
            </form>
            <div id="closeSearchInNav" class="btn btn__square"><span class="icon_close icon"></span></div>
        </div>
        <div class="global-nav__retreat_search">
            <section class="home__retreat-search">
                <div class="wrapper">
                    <!-- Search Dropdowns -->
                    <div class="home__retreat-search-container">
                        <div class="choices choices-search flex show">
                            <div class="inner">
                                <div class="home__search__location-wrapper home__search__dropdown-title">
                                    <header>
                                        <h3 class="title">Find Your Destination</h3>
                                        <span class="underline"></span>
                                    </header>
                                    <h3 class="title initHomeDropdown doNotClose first-dropdown" data-home-search="location"><span class="destination home__search__choice doNotClose">Select Destination</span><span class="icon icon_carrot-down"></span></h3>
                                    <h3 class="title initHomeDropdown doNotClose" data-home-search="checkIn"><span class="label checkin-sublabel">Check In</span><span class="checkin-label home__search__choice doNotClose">Check In</span><span class="icon icon_carrot-down"></span></h3>
                                    <h3 class="title initHomeDropdown doNotClose check-out" data-home-search="checkOut"><span class="label checkout-sublabel">Check Out</span><span class="checkout-label home__search__choice doNotClose">Check Out</span><span class="icon icon_carrot-down"></span></h3>
                                    <h3 class="title initHomeDropdown doNotClose home__search__bedrooms-dropdown" data-home-search="bedrooms"><span class="bedrooms home__search__choice doNotClose">No. of Bedrooms</span><span class="icon icon_carrot-down"></span>
                                        <ul class="list home__search__dropdown doNotClose" data-home-search="bedrooms">
                                            <li><a href="#0" data-home-bedrooms="1" class="strike nolink doNotClose">1</a><div class="arrow-up-destination-list"></div></li>
                                            <li><a href="#0" data-home-bedrooms="2" class="strike nolink doNotClose">2</a></li>
                                            <li><a href="#0" data-home-bedrooms="3" class="strike nolink doNotClose">3</a></li>
                                            <li><a href="#0" data-home-bedrooms="4" class="strike nolink doNotClose">4</a></li>
                                            <li><a href="#0" data-home-bedrooms="5" class="strike nolink doNotClose">5</a></li>
                                            <li><a href="#0" data-home-bedrooms="6" class="strike nolink doNotClose">6</a></li>
                                            <li><a href="#0" data-home-bedrooms="7" class="strike nolink doNotClose">7</a></li>
                                            <li><a href="#0" data-home-bedrooms="8" class="strike nolink doNotClose">8</a></li>
                                            <li><a href="#0" data-home-bedrooms="9" class="strike nolink doNotClose">9</a></li>
                                            <li><a href="#0" data-home-bedrooms="10" class="strike nolink doNotClose">10+</a></li>
                                        </ul>
                                    </h3>
                                    <a  href="/destination" class="btn btn__blue search initHomeRetreatSearch">Search</a>
                                    <a href="#0" class="btn btn__blue reset initHomeRetreatReset">Reset</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="global-nav__destinations home__search__dropdown doNotClose" data-home-search="location">
                        <div class="global-nav__destinations__destination-list-wrapper">
                            <div class="arrow-up-destination-list"></div>
                            <div class="wrapper">
                                <div class="global-nav__destination-list east <?php if ( $userglobalposition !== 'uk' && $userglobalposition !== 'ie' ) { echo 'current'; } ?>">
                                    <header>
                                        <h6 class="title">US EAST</h6>
                                        <span class="underline"></span>
                                    </header><!-- /header -->
                                    <ul class="sort-list  <?php if ($userglobalposition == 'useast') {echo 'current';} ?> group<?php echo ( (isset($node) && count($node->destinations["east"]) < 5) ? ' centralized' : '') ?>">
                                        <?php foreach($destinations_subnav_list['us'] as $destination) {
                                            if ($destination['region'] == 'east')  {  ?>
                                                <li>
                                                    <input id="nav-retreat-<?php echo $destination['api_id']; ?>" class="custom-check-input more-filter-experience destination-check-in-nav" type="checkbox" value="<?php echo $destination['name']; ?>" data-home-location="<?php echo $destination['api_id']; ?>">
                                                    <label class="custom-check-label" for="nav-retreat-<?php echo $destination['api_id']; ?>"><?php echo $destination['name']; ?></label>
                                                </li>
                                            <?php } }  ?>
                                    </ul>
                                </div>
                                <div class="global-nav__destination-list west">
                                    <header>
                                        <h6 class="title">US WEST</h6>
                                        <span class="underline"></span>
                                    </header><!-- /header -->
                                    <ul class="sort-list group<?php echo (count($node->destinations["west"]) < 5 ? ' centralized' : ''); ?>">
                                        <?php foreach($destinations_subnav_list['us'] as $destination) {
                                            if ($destination['region'] == 'west')  {?>
                                                <li>
                                                    <input id="nav-retreat-<?php echo $destination['api_id']; ?>" class="custom-check-input more-filter-experience destination-check-in-nav" type="checkbox" value="<?php echo $destination['name']; ?>" data-home-location="<?php echo $destination['api_id']; ?>">
                                                    <label class="custom-check-label" for="nav-retreat-<?php echo $destination['api_id']; ?>"><?php echo $destination['name']; ?></label>
                                                </li>
                                            <?php } } ?>
                                    </ul>
                                </div>
                                <div class="global-nav__destination-list uk <?php if ( $userglobalposition == 'uk' || $userglobalposition == 'ie' ) { echo 'current'; } ?>" >
                                    <header>
                                        <h6 class="title">UK / EUROPE</h6>
                                        <span class="underline"></span>
                                    </header><!-- /header -->
                                    <ul class="sort-list <?php if ($userglobalposition == 'uk' || $userglobalposition == 'ie') {echo 'current';} ?> group<?php echo (count($node->destinations["notus"]) < 5 ? ' centralized' : ''); ?>">
                                        <?php foreach($destinations_subnav_list['uk'] as $destination) { ?>
                                            <li>
                                                <input id="nav-retreat-<?php echo $destination['api_id']; ?>" class="custom-check-input more-filter-experience destination-check-in-nav" type="checkbox" value="<?php echo $destination['name']; ?>" data-home-location="<?php echo $destination['api_id']; ?>">
                                                <label class="custom-check-label" for="nav-retreat-<?php echo $destination['api_id']; ?>"><?php echo $destination['name']; ?></label>
                                            </li>
                                        <?php } ?>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="home__search__dropdown doNotClose home__search__check-in-wrapper" data-home-search="checkIn">
                        <div class="arrow-up-destination-list"></div>
                        <div class="home__search__calendar home__search__calendar-in" id="bookingCheckInNav"></div>
                    </div>
                    <div class="home__search__dropdown doNotClose  home__search__check-out-wrapper" data-home-search="checkOut">
                        <div class="arrow-up-destination-list"></div>
                        <div class="home__search__calendar home__search__calendar-out" id="bookingCheckOutNav"></div>
                    </div>

                </div>
                <div id="closeBookInNav" class="btn btn__square global-nav__book-now-close"><span class="icon_close icon"></span></div>
            </section>
        </div>
        <div class="mobile-view">
            <a href="" class="mbl-btn-nav">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </a>
            <!--            <a href="/" class="logo">-->
            <!--                --><?php
            //                if (theme_get_setting('toggle_logo')) {
            //                    $image = array(
            //                        'path' => theme_get_setting('logo'),
            //                        'alt' => 'Natural Retreats logo'
            //                    );
            //                    print theme('image', $image);
            //                }
            //                ?>
            <!--            </a>-->
            <a class="logo text-center" href="/">
                        <span class="logo-text">
						<!--NATURAL RETREATS-->
                            <?php
                            if (theme_get_setting('toggle_logo')) {
                                $image = array(
                                    'path' => theme_get_setting('logo'),
                                    'alt' => 'Natural Retreats logo'
                                );
                                print theme('image', $image);
                            }
                            ?>
						</span>
                <span class="logo-text-small visible-lg">Go Somewhere to Remember</span>
            </a>
            <a href="" class="mbl-btn-search icon icon_search">
                <span></span>
                <span></span>
                <span></span>
            </a>
            <div class="mbl-search-background">
                <form id="globalSearchMbl" action="/search" method="get" accept-charset="utf-8">
                    <input id="globalSearchInput" type="search" name="search" value="" placeholder="Search">
                </form>
            </div>
            <a href="/" class="logo logo-stuck"></a>

            <div class="mobile-destination_subnav">
                <div class="destination_subnav_block">
                    <h3 class="title">US EAST <span class="icon icon_carrot-down"></span> </h3>
                    <div class="mobile-destination_subnav_list">
                        <ul>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                        </ul>
                    </div>
                </div>
                <div class="destination_subnav_block">
                    <h3 class="title">US West <span class="icon icon_carrot-down"></span> </h3>
                    <div class="mobile-destination_subnav_list">
                        <ul>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                        </ul>
                    </div>
                </div>
                <div class="destination_subnav_block">
                    <h3 class="title">UK/EU <span class="icon icon_carrot-down"></span> </h3>
                    <div class="mobile-destination_subnav_list">
                        <ul>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                            <li><a href="#0" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--Main Desktop Navigation Display Starts-->
        <div class="global-nav__right clearfix">
            <div id="openSearchInNav" class="icon icon_search"></div>
            <!--?php print theme('links__system_main_menu', array('links' => $main_menu, 'attributes' => array('id' => 'main-menu', 'class' => array('flex main-menu__link-list')))); ?-->
            <?php
            $menu_main_left_nav = menu_navigation_links('menu-main-left-nav');
            print theme('links__menu_main_left_nav', array('links' => $menu_main_left_nav, 'attributes' => array('id' => 'main-left-menu', 'class' => array('navbar-left main-menu__link-list'))));
            ?>
            <div class="arrow_box top global-nav__destinations open doNotClose">
                <!--New Redesign: Subash Maharjan-->
                <div class=" global-nav__destinations__destination-list-wrapper">

                    <div class="wrapper">
                        <div class="global-nav__destination-list east <?php if ( $userglobalposition !== 'uk' && $userglobalposition !== 'ie' ) { echo 'current'; } ?>">
                            <header>
                                <h6 class="title">US EAST</h6>
                                <!--                            <span class="underline"></span>-->
                            </header><!-- /header -->
                            <ul class="sort-list  <?php if ($userglobalposition == 'useast') {echo 'current';} ?> group<?php echo ( (isset($node) && count($node->destinations["east"]) < 5) ? ' centralized' : '') ?>">
                                <?php foreach($destinations_subnav_list['us'] as $destination) {
                                    if ($destination['region'] == 'east')  {  ?>
                                        <li class="destination-list-link"><a href="<?php echo $destination['url']; ?>" class="strike"><?php echo $destination['name']; ?><?php if (!empty($destination['state']) ) { echo ', '.$destination['state']; } ?></a></li>
                                    <?php } }  ?>
                            </ul>
                        </div>
                        <div class="global-nav__destination-list west">
                            <header>
                                <h6 class="title">US WEST</h6>
                                <!--                            <span class="underline"></span>-->
                            </header><!-- /header -->
                            <ul class="sort-list group<?php echo (count($node->destinations["west"]) < 5 ? ' centralized' : ''); ?>">
                                <?php foreach($destinations_subnav_list['us'] as $destination) {
                                    if ($destination['region'] == 'west')  {?>
                                        <li class="destination-list-link"><a href="<?php echo $destination['url']; ?>" class="strike"><?php echo $destination['name']; ?><?php if (!empty($destination['state']) ) { echo ', '.$destination['state']; } ?></a></li>
                                    <?php } } ?>
                            </ul>
                        </div>
                        <div class="global-nav__destination-list uk <?php if ( $userglobalposition == 'uk' || $userglobalposition == 'ie' ) { echo 'current'; } ?>" >
                            <header>
                                <h6 class="title">UK / EUROPE</h6>
                                <!--                            <span class="underline"></span>-->
                            </header><!-- /header -->
                            <ul class="sort-list <?php if ($userglobalposition == 'uk' || $userglobalposition == 'ie') {echo 'current';} ?> group<?php echo (count($node->destinations["notus"]) < 5 ? ' centralized' : ''); ?>">
                                <?php foreach($destinations_subnav_list['uk'] as $destination) { ?>
                                    <li class="destination-list-link"><a href="<?php echo $destination['url']; ?>" class="strike"><?php echo $destination['name']; ?><?php if (!empty($destination['state']) ) { echo ', '.$destination['state']; } ?></a></li>
                                <?php } ?>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            $menu_main_right_nav = menu_navigation_links('menu-main-right-nav');
            print theme('links__menu_main_right_nav', array('links' => $menu_main_right_nav, 'attributes' => array('id' => 'main-right-menu', 'class' => array('navbar-right main-menu__link-list'))));
            ?>
            <!--			<div class="btn__blue btn initMobileSearchDates">BOOK NOW</div>-->

            <!--			<div id="openBookNowSearch" class="btn btn__blue book-now-btn">Book Now</div>-->

            <div class="explorer__help-modal">
                <div class="wrapper">
                    <div class="explorer__phone animate">
                        <div class="inner fresh">
                            <span class="icon icon_phone"></span>
                            <div class="text">Contact</div>
                        </div>
                    </div>
                    <div class="explorer__help-modal-inner">
                        <div class="explore-team-block__avatar">
                            <div class="inner" style="background: url('<?php echo $contact_image_url; ?>') center center no-repeat; background-size: cover;"></div>
                        </div>
                        <div class="explorer__help-modal-inner__copy">
                            <div class="css_triangle-up"></div>
                            <!--                            <p>-->
                            <!--                                Contact Xplore Expert <span class="long-dash"></span>-->
                            <!--                                <span class="italic">--><?php //echo $contact_name; ?><!--</span>-->
                            <!--                            </p>-->
                            <!--                            <p class="avatar-block__copy__contact">-->
                            <!--                                <a href="tel:--><?php //echo str_replace(".", "", $contact_phone); ?><!--">--><?php //echo $contact_phone; ?><!--</a> or <span id="comm100-button---><?php //echo $livechat_planecode; ?><!--" class="avatar-block__copy__contact__chat" ></span>-->
                            <!--                            </p>-->
                            <p>
                                <strong>CONTACT OUR TRAVEL EXPERTS</strong>

                            </p>
                            <form action="/contact-2/#wpcf7-f3284-p3285-o1" method="post" class="wpcf7-form" novalidate="novalidate">
                                <div style="display: none;">
                                    <input type="hidden" name="_wpcf7" value="3284">
                                    <input type="hidden" name="_wpcf7_version" value="4.3.1">
                                    <input type="hidden" name="_wpcf7_locale" value="en_US">
                                    <input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f3284-p3285-o1">
                                    <input type="hidden" name="_wpnonce" value="4b9e29a4c4">
                                </div>
                                <div class="form-row">
                                    <div class="control">
                                        <label for="first-name">First name *</label><span class="wpcf7-form-control-wrap first-name"><input type="text" name="first-name" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false"></span>
                                    </div>
                                    <div class="control">
                                        <label for="last-name">Last name *</label><span class="wpcf7-form-control-wrap last-name"><input type="text" name="last-name" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false"></span>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="control">
                                        <label for="email">Email *</label><span class="wpcf7-form-control-wrap email"><input type="text" name="email" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false"></span>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="control">
                                        <label for="tel">Phone number</label><span class="wpcf7-form-control-wrap tel"><input type="text" name="tel" value="" size="40" class="wpcf7-form-control wpcf7-text" aria-invalid="false"></span>
                                    </div>
                                    <div class="control">
                                        <label for="subject">Subject *</label><span class="wpcf7-form-control-wrap subject"><div class="selector fixedWidth"><span style="user-select: none;">Select</span><select name="subject" class="wpcf7-form-control wpcf7-select wpcf7-validates-as-required" aria-required="true" aria-invalid="false"><option value="">Select</option><option value="Press inquiries">Press inquiries</option><option value="Join our team">Join our team</option><option value="Feedback on this website">Feedback on this website</option><option value="Other">Other</option></select></div></span>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="control full">
                                        <label for="message">Message *</label><span class="wpcf7-form-control-wrap message"><textarea name="message" cols="40" rows="10" class="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required" aria-required="true" aria-invalid="false"></textarea></span>
                                    </div>
                                </div>
                                <div class="form-row btn-wrap">
                                    <div class="control">
                                        <input type="submit" value="CONTACT OUR XPLORE EXPERT" class="wpcf7-form-control wpcf7-submit">
                                    </div>
                                </div>
                                <div class="wpcf7-response-output wpcf7-display-none"></div>
                            </form>
                            <div>
                                <div class="col col-left">
                                    <span class="header">CALL TO BOOK</span>
                                    <span>US EAST: <strong>877 805 7794</strong></span>
                                    <span>US WEST: <strong>888 451 0156</strong></span>
                                    <span>EU/UK: <strong>020 3807 4668</strong></span>
                                </div>
                                <div class="col col-right">
                                    <span class="header">CONTACT HOURS</span>
                                    <span><em>Monday - Friday: 8am - 6pm</em></span>
                                    <span><em>Saturday - Sunday: 9am - 5pm</em></span>
                                    <span><em>Eastern Standard Time</em></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a class="sign-in-link" target="_blank" href="https://nres.naturalretreats.com/pls/apex/nres.owner_portal">SIGN IN</a>
        </div>
        <!--Main Desktop Navigation Display Ends-->
        <div class="global-nav__banner">
            <div class="inner">
                <div class="global-nav__banner__country-select">
                    <h5 class="title">
                        You are currently viewing our
                        <span id="initCountrySelect">
							<span class="country-select__dropdown-value"><?php echo $currentcountry; ?></span>
							<span class="icon_carrot-down icon"></span>
							<ul class="global-nav__banner__country-dropdown">
								<li><a href="/us" class="strike" data-country-selection="us">US<span class="strike-through"></span></a></li>
								<li><a href="/uk" class="strike" data-country-selection="uk">UK<span class="strike-through"></span></a></li>
								<li><a href="/ie" class="strike" data-country-selection="ie">Ireland<span class="strike-through"></span></a></li>
							</ul>
						</span> website
                    </h5>
                </div>
                <div class="global-nav__banner__cookies"></div>
                <span id="navBannerClose" class="icon_close icon"></span>
            </div>
        </div>


    </div>
</nav>
<script type="text/template" id="mbl-search">
    <div class="mbl-search-menu-title">EXPLORE DESTINATIONS</div>
    <div class="mbl-search-menu">
        <div class="options">
            <a class="navigate" href='/destination'><span>EXPLORE</span></a> <a class='date active' href=''><span>SEARCH DATES</span></a>
        </div>
        <section class='date active'>
            <div class="select-box loc">
                <span class="intro">Locations: <span class="entry"></span></span>
                <select class="location" name="iama" multiple='multiple'>
                    <!-- <option></option> -->
                    <optgroup label="US East">
                        <?php foreach($destinations_subnav_list['us'] as $destination) {
                            if ($destination['region'] == 'east')  {  ?>
                                <option value="<?php echo $destination['api_id']; ?>" data-home-location="<?php echo $destination['api_id']; ?>"><?php echo $destination['name']; ?></option>
                            <?php } }  ?>
                    </optgroup>
                    <optgroup label="US West">
                        <?php foreach($destinations_subnav_list['us'] as $destination) {
                            if ($destination['region'] == 'west')  {  ?>
                                <option value="<?php echo $destination['api_id']; ?>" data-home-location="<?php echo $destination['api_id']; ?>"><?php echo $destination['name']; ?></option>
                            <?php } }  ?>
                    </optgroup>
                    <optgroup label="UK">
                        <?php foreach($destinations_subnav_list['uk'] as $destination) { ?>
                            <option value="<?php echo $destination['api_id']; ?>" data-home-location="<?php echo $destination['api_id']; ?>"><?php echo $destination['name']; ?></option>
                        <?php }  ?>
                    </optgroup>
                </select><span class="icon icon_carrot-down"></span>
            </div>
            <div class="select-box cal checkIn">
                <span class="intro">Check In: <span class="entry"></span></span><span class="icon icon_carrot-down"></span>
                <div class="calendar checkIn"></div>
            </div>
            <div class="select-box cal checkOut">
                <span class="intro">Check Out: <span class="entry"></span></span><span class="icon icon_carrot-down"></span>
                <div class="calendar checkOut"></div>
            </div>
            <div class="select-box">
                <span class="intro">No. of Bedrooms: <span class="entry"></span></span>
                <select class="guests" name="iama">
                    <option></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10+</option>
                </select><span class="icon icon_carrot-down"></span>
            </div>
            <a class='start-exploring initHomeRetreatSearch' href='#0'>START EXPLORING</a>
        </section>
    </div>
</script>
<div class="page-body">
    <?php print render($page['content']); ?>
</div>
<section class="video__player">
    <div class="video__wrapper">
        <div class="video__control__close icon icon_close"></div>
        <div class="video__wrapper-inner">
            <div id="ytVideo" class="video__modal"></div>
        </div>
        <div class="video__control-bar">
            <div class="video__control__play-pause">
                <button class="ytp-play-button ytp-button" aria-live="assertive" tabindex="32" aria-label="Pause">
                    <svg width="20" height="20" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <path id="ytp-12" d="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26">
                                <animate id="animation" begin="indefinite" attributeType="XML" attributeName="d" fill="freeze" from="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26" to="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28" dur="0.1s" keySplines=".4 0 1 1"
                                         repeatCount="1"></animate>
                            </path>
                        </defs>
                        <use xlink:href="#ytp-12" class="ytp-svg-shadow"></use>
                        <use xlink:href="#ytp-12" class="ytp-svg-fill"></use>
                    </svg>
                </button>
            </div>
            <div class="video__control__scrubber-wrapper">
                <div id="progressBar"><div></div></div>
            </div>
            <div class="video__control__fullscreen"></div>
            <div class="video__control__share">
                <p>Share</p>
                <ul class="video__control__share__list">
                    <li class="icon icon_fb"></li>
                    <li class="icon icon_twitter"></li>
                </ul>
            </div>
        </div>
    </div>
</section>
<?php
if (isset($node->related_retreats) && !empty($node->related_retreats) && is_array($node->related_retreats)) {
    foreach ($node->related_retreats as $retreat) {
        ?>
        <script type="text/template" id="quickview-modal-<?php echo $retreat->nid; ?>">
            <section class="quickview-modal quickview-modal-<?php echo $retreat->nid; ?>">
                <div class="wrapper">
                    <div class="quickview__copy-block">
                        <hgroup>
                            <h3 class="title"><?php echo $retreat->title; ?></h3>
                            <?php if(isset($retreat->api_data->data)){foreach($retreat->api_data->data as $data) {?>
                                <h6 class="subheader">Sleeps <?php echo $data->Sleeps; ?> <span class="long-dash"></span> from <?php echo nret_get_currency($region_id).$data->FromPrice; ?></h6>
                            <?php }} ?>
                        </hgroup>
                        <?php if(isset($retreat->api_data->data)){foreach($retreat->api_data->data as $data) {?>
                            <p><?php echo $data->Teaser; ?></p>
                        <?php }} ?>
                        <a href="<?php echo url('node/'.$retreat->nid); ?>" class="btn btn__transparent">Book Now</a>
                        <?php if(isset($retreat->api_data->data)){foreach($retreat->api_data->data as $data) {
                            if($data->Latitude) { ?>
                                <div class="quickview__copy-block__map">
                                    <div class="quickview__copy-block__map-inner">
                                        <div id="quickview-map-<?php echo $retreat->nid; ?>" class="quickview-map map" data-lat="<?php echo $data->Latitude; ?>" data-lng="<?php echo $data->Longitude; ?>" data-markers="[<?php echo $data->Latitude; ?>, <?php echo $data->Longitude; ?>]"></div>
                                    </div>
                                </div>
                            <?php } } } ?>
                    </div>
                    <div class="quickview__gallery-wrapper image-gallery__parent">
                        <div class="quickview-modal__close"><span class="icon icon_close"></span></div>
                        <div class="image-gallery__navigation">
                            <div class="image-gallery__navigation-left"></div>
                            <div class="image-gallery__navigation-right"></div>
                        </div>
                        <div class="image-gallery">
                            <?php
                            if(isset($retreat->api_data->data)){
                                foreach($retreat->api_data->data as $data) {
                                    $count = 0;
                                    foreach($data->Images as $image) {
                                        if ($count < 6) { ?>
                                            <div class="quickview__image">
                                                <img src="<?php echo  $image->Url; ?>" alt="">
                                            </div>
                                            <?php  $count++;
                                        }
                                    }
                                } } ?>
                            <?php if( !empty($retreat->field_quote_image) ) { ?>
                                <div class="quickview__image">
                                    <img src="<?php echo nret_parse_image_url($retreat->field_quote_image[LANGUAGE_NONE][0]); ?>" alt="">
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </section>
        </script>
    <?php } } ?>
<?php include 'components/global-footer.php'; ?>
<script type="text/javascript">
    var Comm100API = Comm100API || new Object;
    Comm100API.chat_buttons = Comm100API.chat_buttons || [];
    var comm100_chatButton = new Object;
    comm100_chatButton.code_plan = <?php echo $livechat_planecode; ?>;
    comm100_chatButton.div_id = 'comm100-button-<?php echo $livechat_planecode; ?>';
    Comm100API.chat_buttons.push(comm100_chatButton);
    Comm100API.site_id = <?php echo $livechat_siteid; ?>;
    Comm100API.main_code_plan = <?php echo $livechat_planecode; ?>;
    var comm100_lc = document.createElement('script');
    comm100_lc.type = 'text/javascript';
    comm100_lc.async = true;
    comm100_lc.src = 'https://chatserver.comm100.com/livechat.ashx?siteId=' + Comm100API.site_id;
    var comm100_s = document.getElementsByTagName('script')[0];
    comm100_s.parentNode.insertBefore(comm100_lc, comm100_s);
    setTimeout(function () {
        if (!Comm100API.loaded) {
            var lc = document.createElement('script');
            lc.type = 'text/javascript';
            lc.async = true;
            lc.src = 'https://hostedmax.comm100.com/chatserver/livechat.ashx?siteId=' + Comm100API.site_id;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(lc, s);
        }
    }, 5000)
</script>
