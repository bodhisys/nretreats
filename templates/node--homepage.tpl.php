<?php
switch(substr(current_path(), 0,2))
{
    case 'uk':
        $currentcountry = 'uk';
        $journalfield = 'field_featured_ja_uk_ie';
        $prefix = '_uk_ie';
        break;
    case 'ie':
        $currentcountry = 'ie';
        $journalfield = 'field_featured_ja_uk_ie';
        $prefix = '_uk_ie';
        break;
    case 'us':
    default:
        $currentcountry = 'us';
        $journalfield = 'field_featured_jornal_articles';
        $prefix = '';
        break;
}

//This is also applied on nret_page_display.module line 335
//$journalfield = 'field_featured_jornal_articles';
//$prefix = '';

if (isset($node)) {
	// $field_val = $node->field_hero_video[LANGUAGE_NONE][0]['value'];
	$video_array = field_get_items('node', $node, 'field_hero_video'.$prefix);
	$destination_array = field_get_items('node', $node, 'field_featured_destination'.$prefix);
	$hompeage_video_urls = array();

	foreach($video_array as $video){
		$get_video_url = $video['uri'];
		$get_video_url = file_create_url($get_video_url);
		$get_video_url = parse_url($get_video_url);
		$get_video_url = $get_video_url['path'];
		array_push($hompeage_video_urls, $get_video_url);
	}
}

$wrapped_node = entity_metadata_wrapper('node',$node);
$featured_destination = $wrapped_node->{ 'field_featured_destination'.$prefix };
$hasFD = !is_null($featured_destination->value())?tru:false;

// pr($node->destinations);
// This lists the destinations for the filter
// 1 = UK
// 2 = EU
// 3 = US
$home_articles = $wrapped_node->{ $journalfield };
$home_offers = $wrapped_node->{ 'field_featured_offers'.$prefix };
$home_retreats = $wrapped_node->{ 'field_featured_retreat'.$prefix };
$hero_main_copy = $wrapped_node->{ 'field_main_copy'.$prefix }->value();
$hero_sub_copy = $wrapped_node->{ 'field_sub_copy'.$prefix }->value();

$home_mobile_background_image = nret_parse_image_url($wrapped_node->{ 'field_mobile_hero_image'.$prefix }->value());
foreach($home_retreats as $home_retreat)
{
    $home_retreat_api[$home_retreat->nid->value()] = $node->retreat_api_data[$home_retreat->nid->value()]->data;
    $retreat_destination_regionId[$home_retreat->nid->value()] = $home_retreat->field_destination->field_api_region_id->value();
}
$destinations_subnav_list = nret_get_destinations();
?>


<section id="home" class="home-page content-start">
    <div class="show-on-mobile-only">

    </div>
    <div class="home__hero-wrapper">
        <div class="home__hero hero-el flex v-center h-center" <?php if($home_mobile_background_image){ ?>style="background-image:url('<?php echo $home_mobile_background_image; ?>');"<?php } ?>>
            <div class="video__bg" data-videourl='<?php echo json_encode($hompeage_video_urls); ?>'>
            </div>
        </div>
        <!--      	<div class="btn-wrapper home__hero__mobile-cta">-->
        <!--      		<div class="initMobileSearchDates btn__transparent btn">Book Now</div>-->
        <!--      	</div>-->
    </div>
    <div class="hide-on-mobile">

        <!--Major Changes for Hero Search Starts-->
        <article class="home__featured-destinations funky-bg hero-el__below">
            <section class="home__retreat-search scroll-to-search">
                <div class="wrapper">
                    <header>
                        <h3 class="title search-section-header">FIND <em>your</em> PERFECT VACATION</h3>
                    </header>
                    <div class="home__retreat-search-container scroll-once">
                        <div class="choices choices-search flex show">

                            <div class="inner">

                                <div class="home__search__location-wrapper home__search__dropdown-title">

                                    <h3 class="title initHomeDropdown doNotClose first-dropdown" data-home-search="location">
                                        <span class="icon icon_search"></span>
                                        <span class="destination destination-label home__search__choice doNotClose">FIND YOUR PERFECT VACATION RENTAL</span>
                                    </h3>

                                    <h3 class="title initHomeDropdown doNotClose check-in" data-home-search="checkIn">
                                        <span class="home__search__choice doNotClose icon icon_calendar"></span>
                                    </h3>
                                    <h3 class="title initHomeDropdown doNotClose home__search__bedrooms-dropdown" data-home-search="bedrooms">
                                        <span class="home__search__choice doNotClose icon icon_user"></span>
                                        <ul class="list home__search__dropdown doNotClose" data-home-search="bedrooms">
                                            <li><div class="arrow-up-destination-list"></div><a href="#0" data-home-bedrooms="1" class="strike nolink doNotClose">1</a></li>
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
                                    <h3 class="search-btn-wrapper">
                                        <a href="#0" class="btn search initHomeRetreatSearch">Search</a>
                                        <!--                                    <a href="#0" class="btn btn__blue reset initHomeRetreatReset">Reset</a>-->
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="global-nav__destinations home__search__dropdown doNotClose" data-home-search="location">
                        <div class="global-nav__destinations__destination-list-wrapper">
                            <div class="arrow-up-destination-list"></div>
                            <div class="wrapper">
                                <div class="global-nav__destination-list east <?php if ( $currentcountry !== 'uk' && $currentcountry !== 'ie' ) { echo 'current'; } ?>">
                                    <header>
                                        <h6 class="title">US EAST</h6>
                                    </header><!-- /header -->
                                    <ul class="sort-list  <?php if ($currentcountry == 'us') {echo 'current';} ?> group<?php echo (count($node->destinations["east"]) < 5 ? ' centralized' : ''); ?>">
                                        <?php foreach($destinations_subnav_list['us'] as $destination) {
                                            if ($destination['region'] == 'east')  {  ?>
                                                <li>
                                                    <input id="retreat-<?php echo $destination['api_id']; ?>" class="custom-check-input more-filter-experience" type="checkbox" value="<?php echo $destination['name']; ?>" data-home-location="<?php echo $destination['api_id']; ?>">
                                                    <label class="custom-check-label" for="retreat-<?php echo $destination['api_id']; ?>"><?php echo $destination['name']; ?></label>
                                                </li>
                                            <?php } }  ?>
                                    </ul>
                                </div>
                                <div class="global-nav__destination-list west">
                                    <header>
                                        <h6 class="title">US WEST</h6>
                                    </header><!-- /header -->
                                    <ul class="sort-list group<?php echo (count($node->destinations["west"]) < 5 ? ' centralized' : ''); ?>">
                                        <?php foreach($destinations_subnav_list['us'] as $destination) {
                                            if ($destination['region'] == 'west')  {?>
                                                <li>
                                                    <input id="retreat-<?php echo $destination['api_id']; ?>" class="custom-check-input more-filter-experience" type="checkbox" value="<?php echo $destination['name']; ?>" data-home-location="<?php echo $destination['api_id']; ?>">
                                                    <label class="custom-check-label" for="retreat-<?php echo $destination['api_id']; ?>"><?php echo $destination['name']; ?></label>
                                                </li>
                                            <?php } } ?>
                                    </ul>
                                </div>
                                <div class="global-nav__destination-list uk <?php if ( $currentcountry == 'uk' || $currentcountry == 'ie' ) { echo 'current'; } ?>" >
                                    <header>
                                        <h6 class="title">UK / EUROPE</h6>
                                    </header><!-- /header -->
                                    <ul class="sort-list <?php if ($currentcountry == 'uk' || $currentcountry == 'ie') {echo 'current';} ?> group<?php echo (count($node->destinations["notus"]) < 5 ? ' centralized' : ''); ?>">
                                        <?php foreach($destinations_subnav_list['uk'] as $destination) { ?>
                                            <li>
                                                <input id="retreat-<?php echo $destination['api_id']; ?>" class="custom-check-input more-filter-experience" type="checkbox" value="<?php echo $destination['name']; ?>" data-home-location="<?php echo $destination['api_id']; ?>">
                                                <label class="custom-check-label" for="retreat-<?php echo $destination['api_id']; ?>"><?php echo $destination['name']; ?></label>
                                            </li>
                                        <?php } ?>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="home__search__dropdown doNotClose home__search__check-in-wrapper" data-home-search="checkIn">
                        <div class="home__search__calendar home__search__calendar-in" id="bookingCheckIn">
                            <div class="arrow-up-destination-list"></div>
                        </div>
                    </div>
                    <div class="home__search__dropdown doNotClose  home__search__check-out-wrapper" data-home-search="checkOut">
                        <div class="home__search__calendar home__search__calendar-out" id="bookingCheckOut">
                            <div class="arrow-up-destination-list"></div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
        <!--Major Changes for Hero Search Ends-->
        <!--Major Changes for Logo Bar Starts-->
        <div class="hero-bottom">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <ul class="list-inline partners-bar">
                            <li>
                                <img src="/themes/nretreats/assets/img/logos/condo-nast-logo.png"/>
                            </li>
                            <li>
                                <img src="/themes/nretreats/assets/img/logos/cbs-logo.png"/>
                            </li>
                            <li>
                                <img src="/themes/nretreats/assets/img/logos/southern-living-logo.png"/>
                            </li>
                            <li>
                                <img src="/themes/nretreats/assets/img/logos/travel-leisure-logo.png"/>
                            </li>
                            <li>
                                <img src="/themes/nretreats/assets/img/logos/new-york-post-logo.png"/>
                            </li>
                            <li>
                                <img src="/themes/nretreats/assets/img/logos/garden-gun-logo.png"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--Major Changes for Logo Bar Ends-->
        <!---->
        <div class="section our-services">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 text-center">
                        <span class="icon icon_calendar"></span>
                        <h4>Experimental Vacations</h4>
                        <p class="text-summary">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
                    </div>
                    <div class="col-md-4 text-center">
                        <span class="icon icon_calendar"></span>
                        <h4>Concierge Services</h4>
                        <p class="text-summary">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
                    </div>
                    <div class="col-md-4 text-center">
                        <span class="icon icon_calendar"></span>
                        <h4>Over 500 Homes</h4>
                        <p class="text-summary">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
                    </div>
                </div>
            </div>
        </div>
        <!---->

        <!---->
        <div class="section destination-carousel">
            <div class="nopadding container-fluid">
                <!-- Place somewhere in the <body> of your page -->
                <div class="flexslider destination-slider">
                    <ul class="slides">
                        <?php
                        foreach ($home_retreats as $home_retreat)
                        {
                            foreach($home_retreat_api[$home_retreat->nid->value()] as $retreat) { ?>
                                <li>
                                    <div class="inner">
                                        <a href="<?php echo url('node/'.$home_retreat->nid->value()); ?>" class="retreat-listing__block__image">
                                            <img src="<?php echo nret_parse_image_url($home_retreat->field_hero_image->value()); ?>"/>
                                        </a>
                                        <p class="flex-caption">
                                            <a href="<?php echo url('node/'.$home_retreat->nid->value()); ?>" title=""><?php echo $retreat->CategoryName; ?> - <?php echo $home_retreat->field_destination->title->value(); ?></a>
                                        </p>
                                    </div>
                                </li>

                            <?php } } ?>
                        <?php
                        foreach ($home_retreats as $home_retreat)
                        {
                            foreach($home_retreat_api[$home_retreat->nid->value()] as $retreat) { ?>
                                <li>
                                    <div class="inner">
                                        <a href="<?php echo url('node/'.$home_retreat->nid->value()); ?>" class="retreat-listing__block__image">
                                            <img src="<?php echo nret_parse_image_url($home_retreat->field_hero_image->value()); ?>"/>
                                        </a>
                                        <p class="flex-caption">
                                            <a href="<?php echo url('node/'.$home_retreat->nid->value()); ?>" title=""><?php echo $retreat->CategoryName; ?> - <?php echo $home_retreat->field_destination->title->value(); ?></a>
                                        </p>
                                    </div>
                                </li>

                            <?php } } ?>
                    </ul>
                </div>
            </div>
        </div>
        <!---->

        <!---->
        <div class="section guest-reviews-carousel">
            <div class="container">
                <!-- Place somewhere in the <body> of your page -->
                <div class="flexslider guest-reviews-slider">
                    <ul class="slides">
                        <li>
                            <div class="row">
                                <div class="col-md-5">
                                    <h2>GUEST REVIEWS</h2>
                                    <p class="flex-caption">Adventurer Cheesecake Brownie</p>
                                    <a class="btn btn-default">STAY HERE</a>
                                </div>
                                <div class="col-md-7">
                                    <img src="/themes/nretreats/assets/img/image-placeholder-900x600.jpg" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-md-5">
                                    <h2>GUEST REVIEWS</h2>
                                    <p class="flex-caption">Adventurer Cheesecake Brownie</p>
                                    <a class="btn btn-default">STAY HERE</a>
                                </div>
                                <div class="col-md-7">
                                    <img src="/themes/nretreats/assets/img/image-placeholder-900x600.jpg" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-md-5">
                                    <h2>GUEST REVIEWS</h2>
                                    <p class="flex-caption">Adventurer Cheesecake Brownie</p>
                                    <a class="btn btn-default">STAY HERE</a>
                                </div>
                                <div class="col-md-7">
                                    <img src="/themes/nretreats/assets/img/image-placeholder-900x600.jpg" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-md-5">
                                    <h2>GUEST REVIEWS</h2>
                                    <p class="flex-caption">Adventurer Cheesecake Brownie</p>
                                    <a class="btn btn-default">STAY HERE</a>
                                </div>
                                <div class="col-md-7">
                                    <img src="/themes/nretreats/assets/img/image-placeholder-900x600.jpg" />
                                </div>
                            </div>
                        </li>
                        <!-- items mirrored twice, total of 12 -->
                    </ul>
                </div>
            </div>
        </div>
        <!---->
    </div>
    <div class="show-on-mobile-only">
        <div>
            <header>
                <h3 class="title search-section-header">FIND <em>your</em> PERFECT VACATION</h3>
            </header>
        </div>
        <div>
            <div class="us-east destination-display-block">
                <h4>US East</h4>
                <p><em>Escape the cold this winter</em></p>
            </div>
            <div class="us-west destination-display-block">
                <h4>US West</h4>
                <p><em>Venture off into the Mountains</em></p>
            </div>
            <div class="uk-europe destination-display-block">
                <h4>UK / Europe</h4>
                <p><em>Cozy up next to a fire</em></p>
            </div>
            <div class="view-all-destination-link">
                <span class="fa fa-windows"></span><a href="/destination" class="">VIEW ALL DESTINATIONS</a>
            </div>
        </div>
    </div>
    <section class="home__offers">
        <header class="hide-block hide-on-mobile">
            <h3 class="title">Special Offers</h3>
        </header>

        <div class="section special-offer-carousel">
            <div class="container">
                <!-- Place somewhere in the <body> of your page -->
                <div class="flexslider special-offer-slider">
                    <ul class="slides">
                        <?php foreach($home_offers as $offer) { ?>
                            <li>
                                <div class="image-wrap">
                                    <a href="<?php echo url('node/'.$offer->nid->value()); ?>" class="offers-block">
                                        <img src="<?php echo nret_parse_image_url( $offer->field_hero_image->value() ); ?>" alt="">
                                    </a>
                                    <p class="special-offer-tag"><span class="show-on-mobile-only">Special</span> Offer</p>
                                </div>

                                <div class="row">
                                    <div class="col-xs-6 col-sm-6">
                                        <div class="flex-caption">
                                            <h4><?php echo $offer->title->value(); ?></h4>
                                            <p class="text">
                                                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-6">
                                        <a href="<?php echo url('node/'.$offer->nid->value()); ?>" class="btn btn__transparent">
                                            View Offer
                                        </a>
                                    </div>
                                </div>

                            </li>

                        <?php } ?>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <article class="home__list-home funky-bg flex v-center h-center">
        <div class="container">
            <div class="text-center">
                <h4>STAY UP TO DATE</h4>
                <p>Sign up and receive news and updates.</p>
            </div>
            <form class="newsletter-email" action="" method="POST" accept-charset="utf-8">
                <div class="name-wrapper">
                    <input type="text" name="FirstName" value="" placeholder="First Name" required>
                    <input type="text" name="LastName" value="" placeholder="Last Name" required>
                </div>
                <input type="email" name="Email" value="" placeholder="Your Email Address" required>
                <input type="hidden" name="MailingListCode" value="<?php echo nret_get_mailinglist_code(); ?>">
                <input class="btn btn__transparent newsletter-submit" value="SIGN UP" type="submit">
            </form>
            <h3 class="title newsletter-thankyou">Thank You for Subscribing</h3>
            <h3 class="title newsletter-error">Sorry, please try again</h3>
        </div>
    </article>
</section>


<?php
    foreach ($home_retreats as $home_retreat)
    {
        foreach($home_retreat_api[$home_retreat->nid->value()] as $retreat)
        {
?>
<script type="text/template" id="quickview-modal-<?php echo $home_retreat->nid->value(); ?>">
<section class="quickview-modal quickview-modal-<?php echo $home_retreat->nid->value(); ?>">
    <div class="wrapper">
        <div class="quickview__copy-block">
            <hgroup>
                <h3 class="title"><?php echo $retreat->CategoryName; ?></h3>
               <h5 class="subheader">Sleeps <?php echo $retreat->Sleeps; ?> <span class="long-dash"></span> from <?php echo nret_get_currency($retreat_destination_regionId[$home_retreat->nid->value()]); echo $retreat->FromPrice; ?></h5>
            </hgroup>
            <p><?php echo $retreat->Teaser; ?></p>
            <a href="<?php echo url('node/'.$home_retreat->nid->value()); ?>" class="btn btn__transparent">Book Now</a>
            <?php if($retreat->Latitude) { ?>

	            <div class="quickview__copy-block__map">
	                <div class="quickview__copy-block__map-inner">
	                    <div style="width:300px;height:300px;"id="quickview-map-<?php echo $retreat_destination_regionId[$home_retreat->nid->value()]; ?>" class="quickview-map map" data-lat="<?php echo $retreat->Latitude; ?>" data-lng="<?php echo $retreat->Longitude; ?>" data-markers="[<?php echo $retreat->Latitude; ?>, <?php echo $retreat->Longitude; ?>]"></div>
	                </div>
	            </div>
            <?php }  ?>
        </div>
        <div class="quickview__gallery-wrapper image-gallery__parent">
            <div class="quickview-modal__close"><span class="icon icon_close"></span></div>
            <div class="image-gallery__navigation">
                <div class="image-gallery__navigation-left"></div>
                <div class="image-gallery__navigation-right"></div>
            </div>
            <div class="image-gallery">
                <?php
                if(isset($retreat->Images)){
                	$count = 0;
                	foreach($retreat->Images as $image) {
                		if ($count < 6) { ?>
			                <div class="quickview__image">
			                    <img src="<?php echo  $image->Url; ?>" alt="">
			                </div>
			            <?php  $count++;
	        			}
        			}
            	 } ?>
            	<?php if(!is_null($home_retreat->field_quote_image->value())) {?>
            	<div class="quickview__image">
                    <img src="<?php echo nret_parse_image_url($home_retreat->field_quote_image->value()); ?>" alt="">
                </div>
                <?php } ?>
            </div>
        </div>
    </div>
</section>
</script>
<?php }} ?>
<?php
//	drupal_add_js('jQuery(document).ready(function () { nret.helpers.phoneHelperOpen();nret.quickView.init(); });', 'inline');
drupal_add_js('jQuery(document).ready(function () { nret.quickView.init(); });', 'inline');
?>
