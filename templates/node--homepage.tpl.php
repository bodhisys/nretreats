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
	<div class="home__hero-wrapper">
		<div class="home__hero hero-el flex v-center h-center" <?php if($home_mobile_background_image){ ?>style="background-image:url('<?php echo $home_mobile_background_image; ?>');"<?php } ?>>
			<div class="home__hero__mobile-header">
				<h1 class="title"><?php echo $hero_main_copy; ?></h1>
				<p><?php echo $hero_sub_copy; ?></p>
			</div>
			<div class="video__bg" data-videourl='<?php echo json_encode($hompeage_video_urls); ?>'>
			</div>
			<section class="start-exploring">
				<div class="video-toggle h-center">
					<h1 class="title"><?php echo $hero_main_copy; ?></h1>
					<p><?php echo $hero_sub_copy; ?></p>
				</div>
			</section>
		</div>
		<div class="video-toggle flex h-center">
        	<p><?php echo $hero_main_copy; ?></p>
			<p><?php echo $hero_sub_copy; ?></p>
      	</div>
      	<div class="btn-wrapper home__hero__mobile-cta">
      		<div class="initMobileSearchDates btn__transparent btn">Book Now</div>
      	</div>
	</div>
	<article class="home__featured-destinations funky-bg hero-el__below">
		<section class="home__retreat-search scroll-to-search">
			<div class="wrapper">
				<!-- Search Dropdowns -->
				<div class="home__retreat-search-container scroll-once">
					<div class="choices choices-search flex show">
						<div class="inner">
							<div class="home__search__location-wrapper home__search__dropdown-title">
								<header>
									<h3 class="title">Find Your Destination</h3>
								</header>
								<h3 class="title initHomeDropdown doNotClose first-dropdown" data-home-search="location"><span class="destination destination-label home__search__choice doNotClose">Select Destination</span><span class="icon icon_carrot-down"></span></h3>
								<h3 class="title initHomeDropdown doNotClose" data-home-search="checkIn"><span class="label checkin-sublabel">Check In</span><p class="checkin-label home__search__choice doNotClose">Check In</p><span class="icon icon_carrot-down"></span></h3>
								<h3 class="title initHomeDropdown doNotClose check-out" data-home-search="checkOut"><span class="label checkout-sublabel">Check Out</span><p class="checkout-label home__search__choice doNotClose">Check Out</p><span class="icon icon_carrot-down"></span></h3>
							    <h3 class="title initHomeDropdown doNotClose home__search__bedrooms-dropdown" data-home-search="bedrooms"><span class="bedrooms bedroom-label home__search__choice doNotClose">Bedrooms</span><span class="icon icon_carrot-down"></span>   									<ul class="list home__search__dropdown doNotClose" data-home-search="bedrooms">
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
								<a href="#0" class="btn btn__blue search initHomeRetreatSearch">Search</a>
                                <a href="#0" class="btn btn__blue reset initHomeRetreatReset">Reset</a>
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
									<span class="underline"></span>
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
									<span class="underline"></span>
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
									<span class="underline"></span>
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
		<?php if($hasFD) { ?>
		<div class="wrapper hide-block">
			<header>
				<h3 class="title">Featured Destination</h3>
			</header>
			<a href="<?php echo url('node/'.$featured_destination->nid->value()); ?>" class="destination-listing__block">
				<div class="destination-listing__image" style="background:url('<?php echo $node->destination_api_data->Image2; ?>') center center no-repeat;background-size:cover;"></div>
				<div class="destination-listing__image" style="background:url('<?php echo $node->destination_api_data->Image1; ?>') center center no-repeat;background-size:cover;">
					<img src="<?php echo $node->destination_api_data->Image1; ?>" alt="">
				</div>
				<div class="destination-listing__copy">
					<div class="wrapper">
						<hgroup>
							<p class="strike"><?php echo $featured_destination->title->value(); ?><span class="strike-through"></span></p>
							<h3 class="title"><?php echo $node->destination_api_data->CategoryCount; ?> Retreats</h3>
						</hgroup>
						<?php if ( !empty($node->destination_api_data->Summary) ) { ?>
						<p><?php echo $node->destination_api_data->Summary; ?></p>
						<?php } ?>
						<span class="destination-listing__copy__price">Starting from <span class="price">
							<?php echo nret_get_currency($node->destination_api_data->RegionId)." ".((!empty($node->destination_api_data->FromPrice) && !is_null($node->destination_api_data->FromPrice))?$node->destination_api_data->FromPrice:$node->destination_api_data->destination_from_price); ?> / night</span></span>
					</div>
				</div>
			</a>
			<a href="/destination" class="btn btn__transparent">View All</a>
		</div>
		<?php } ?>
	</article>
	<section class="home__offers">
		<header class="hide-block">
			<h3 class="title">Special Offers</h3>
		</header>

		<div class="offers-row image-gallery-mobile hide-block">
			<?php foreach($home_offers as $offer) { ?>
			<a href="<?php echo url('node/'.$offer->nid->value()); ?>" class="offers-block">
				<div class="offers-block__bg-image">
					<img src="<?php echo nret_parse_image_url( $offer->field_hero_image->value() ); ?>" alt="">
				</div>
				<div class="offers-block__copy">
					<hgroup>
						<h5 class="title"><?php echo $offer->field_offer_type->value(); ?></h5>
						<h3 class="title"><?php echo $offer->title->value(); ?></h3>
						<p class="subheader"><?php echo $offer->field_offer_cta_text->value(); ?></p>
					</hgroup>
				</div>
			</a>
			<?php } ?>
		</div>
		<a href="/offers" class="btn btn__transparent">View All</a>
	</section>

	<article class="home__list-home funky-bg flex v-center h-center">
		<hgroup>
			<h3 class="title">Sign Up for our Newsletter</h3>
		</hgroup>
		<p><?php echo variable_get('nret_newsletter_copy'); ?></p>
		<form class="newsletter-email" action="" method="POST" accept-charset="utf-8">
			<div class="name-wrapper">
				<input type="text" name="FirstName" value="" placeholder="First Name" required>
				<input type="text" name="LastName" value="" placeholder="Last Name" required>
			</div>
			<input type="email" name="Email" value="" placeholder="Your Email Address" required>
			<input type="hidden" name="MailingListCode" value="<?php echo nret_get_mailinglist_code(); ?>">
			<input class="btn btn__transparent newsletter-submit" value="Submit" type="submit">
		</form>
		<h3 class="title newsletter-thankyou">Thank You for Subscribing</h3>
		<h3 class="title newsletter-error">Sorry, please try again</h3>
	</article>
	<section class="home__featured-retreat">
		<div class="wrapper">
			<header class="hide-block">
				<h3 class="title">Featured Retreats</h3>
			</header>
			<div class="home__featured-retreat__container">
					<div class="funky-bg"></div>

				<?php
				foreach ($home_retreats as $home_retreat)
				{
				     foreach($home_retreat_api[$home_retreat->nid->value()] as $retreat) { ?>

				<div class="retreat-listing__block-small">
					<a href="<?php echo url('node/'.$home_retreat->nid->value()); ?>" class="retreat-listing__block__image" style="background:url('<?php echo nret_parse_image_url($home_retreat->field_hero_image->value()); ?>') center center no-repeat;background-size:cover;"></a>
					<div class="retreat-listing__block__copy">
						<hgroup>
							<h4><a href="<?php echo url('node/'.$home_retreat->nid->value()); ?>" title=""><?php echo $retreat->CategoryName; ?> - <?php echo $home_retreat->field_destination->title->value(); ?></a></h4>
							<h5 class="subheader">Sleeps <?php echo $retreat->Sleeps; ?> <span class="long-dash"></span>Starting from <?php echo nret_get_currency($retreat_destination_regionId[$home_retreat->nid->value()]); echo $retreat->FromPrice; ?>  / night</h5>
						</hgroup>
						<p class="retreat-listing__block__copy-description"><?php echo $retreat->Teaser; ?></p>
						<div class="btn-wrapper qv__mobile">
							<a href="<?php echo url('node/'.$home_retreat->nid->value()); ?>" class="btn btn__transparent">Book Now</a>
							<a href="#0" class="btn btn__transparent nolink quickview" data-quickview-id="<?php echo $home_retreat->nid->value(); ?>">Quick View</a>
						</div>
					</div>
				</div>
				<?php } } ?>
			</div>
		</div>
	</section>
	<article class="home__list-home funky-bg flex v-center h-center">
		<hgroup>
			<h3 class="title">List Your Home</h3>
		</hgroup>
		<p><?php echo variable_get('nret_listyourhome_copy'); ?></p>
		<a href="/list-your-home" class="btn btn__transparent">Learn More</a>
	</article>
	<article class="home__news">
		<div class="wrapper">
			<header class="animated hide-block">
				<h3 class="title">News & Features</h3>
			</header>
			<?php
				foreach($home_articles as $article) {
					if($article->field_is_this_a_featured_journal->value() == 1) { 	?>

					<div class="image-overlay-block">
						<div class="overlay__copy hide-block">
							<hgroup class="animated">
								<h5 class="title"><?php echo str_replace('_',' ', $article->field_journal_type->value() ); ?></h5>
								<h3 class="title"><?php echo $article->title->value(); ?></h3>
							</hgroup>
							<p class="excerpt"><?php echo $article->field_journal_hero_paragraph->value(); ?></p>
							<a href="<?php echo url('node/'.$article->nid->value()); ?>" class="strike">Read Article <span class="side-arrow"></span></a>
						</div>
						<div class="image-on-image right">
							<div class="inner">
								<time class="hide-block" datetime="2015-10-20" pubdate><?php echo date("M d", $article->field_journal_date->value()); ?></time>
								<div class="image__large">
									<a href="<?php echo url('node/'.$article->nid->value()); ?>">
										<img class="hide-block" src="<?php echo nret_parse_image_url($article->field_hero_image->value()); ?>" alt="">
									</a>
								</div>
								<div class="image__small hide-block">
									<img src="<?php echo nret_parse_image_url($article->field_featured_image->value()); ?>" alt="">
								</div>
							</div>
						</div>
					</div>
				<?php break;} } ?>
			<section class="news-row">
				<div class="inner">
					<?php
						$article_count = 1;
						foreach($home_articles as $article) {
							if ($article_count > 2) {
								break;
							}
						if($article->field_is_this_a_featured_journal->value() != 1) { ?>

						<div class="news-block">
							<div class="news-block__image">
								<time class="" datetime="2015-10-20" pubdate><?php echo date("M d", $article->field_journal_date->value()); ?></time>
								<div class="image__large-wrapper">
									<a href="<?php echo url('node/'.$article->nid->value()); ?>">
										<img class="hide-block" src="<?php echo nret_parse_image_url($article->field_hero_image->value()); ?>" alt="">
									</a>
								</div>
							</div>
							<div class="news-block__copy hide-block">
								<hgroup>
									<h5 class="title"><?php echo str_replace('_',' ', $article->field_journal_type->value() ); ?></h5>
									<h3 class="title"><?php echo $article->title->value(); ?></h3>
								</hgroup>
								<a href="<?php echo url('node/'.$article->nid->value()); ?>" class="strike">Read Article <span class="side-arrow"></span></a>
							</div>
						</div>
					<?php $article_count++;} }?>
			</section>
			<a href="/journal" class="btn btn__transparent">View All</a>
		</div>
	</article>


</section>
<h1>Homepage</h1>
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
