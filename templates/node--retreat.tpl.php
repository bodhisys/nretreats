<?php
$wrapped_node = entity_metadata_wrapper('node', $node);

// JAMAL: Validation on parent to be sure it is available so we can access child elements
// $related_experiences_array = $wrapped_node->field_related_experiences->value();
$title = $wrapped_node->title->value();

// Destination data
$destination_api = $wrapped_node->field_destination->value()->api_data;
$destination_name = $destination_api->DestinationName;
$geo_region = $destination_api->GeographicRegion;
$global_region = $destination_api->GlobalRegion;
$region_id = $destination_api->RegionId;
$destination_id = $destination_api->ResortId;

$blue_bar_destination = null;
$blue_bar_destination_text = '';
 try {
 	if (!empty($wrapped_node->field_destination->field_blue_bar_text_collection)) {
 		$blue_bar_destination = $wrapped_node->field_destination->field_blue_bar_text_collection;
 		$blue_bar_destination_text = $blue_bar_destination->field_free_blue_bar_text->value();
 	}
 } catch (Exception $e) {
 	// do nothing
 }



// Retreat Data
$retreat_api = $node->api_data->data[0];
$hero_image_url = nret_parse_image_url($wrapped_node->field_hero_image->value());
$retreat_id = $wrapped_node->field_api_id->value();
$retreat_headline = $retreat_api->Headline;
$retreat_description = $retreat_api->Description;
$retreat_teaser = $retreat_api->Teaser;
$retreat_summary = $retreat_api->Summary;
$retreat_type = $retreat_api->AccommodationType;
$retreat_tripadvisorId = $retreat_api->TripadvisorId;
$retreat_fromPrice = $retreat_api->FromPrice;
$retreat_sleeps = $retreat_api->Sleeps;
$retreat_latitude = $retreat_api->Latitude;
$retreat_longitude = $retreat_api->Longitude;
$retreats_essentials_array = $retreat_api->Essentials;
$retreats_facilities_array = $retreat_api->Facilities;
$retreats_features_array = $retreat_api->Features;
$retreats_amenities_array = $retreat_api->Amenities;
$retreats_images_array = $retreat_api->Images;

$availabilityRestrictions = nret_api_getpolicies_execute(NRET_Api::getInstance(), $retreat_id);

// Update for the Call to book
$listingonly = isset($node->api_data->data[0]->ListingOnly) && $node->api_data->data[0]->ListingOnly;
if ($listingonly) {
	$calltobookphoneregion = $wrapped_node->field_destination->value()->api_data->SalesOffice;
	switch ($calltobookphoneregion) {
		case 'US West':
			$calltobookphoneregionstring = 'uswest';
			break;
		case 'Europe':
			$calltobookphoneregionstring = 'uk';
			break;
		case 'US East':
		default:
			$calltobookphoneregionstring = 'useast';
			break;
	}
	$calltobookphone = variable_get('nret_contact_'.$calltobookphoneregionstring.'_phone');
	if (is_null($calltobookphone)) {
		$calltobookphone = '';
	}
} else {
	$calltobookphone = '';
}

// $thingsToDoListObj = $wrapped_node->field_destination->field_things_list->value();
//$enquiry_location = substr(url(current_path()), 1,2);
$enquiry_location = $wrapped_node->field_destination->field_api_region_url_prefix->value();
?>
<article class="retreat content-start" data-retreat-id="<?php echo $retreat_id; ?>" data-node-id="<?php echo $wrapped_node->nid->value(); ?>" itemscope itemtype="https://schema.org/Product">
	<div class="wrapper">
		<div class="hero" style="background:url('<?php echo $hero_image_url; ?>') center center no-repeat;background-size:cover"></div>
		<div class="booking-anchor" data-anchor="book"></div>
		<section class="booking-widget">
			<?php
			$exclude_retreat = false;
			try{
			    if(!is_null($blue_bar_destination))
			    {
			        $bbtderid = $blue_bar_destination->field_excluding_retreats->value();
			        foreach($bbtderid as $exlude_id)
			        {
			            if ($exlude_id->nid === $node->nid)
			            {
                            $exclude_retreat = true;
			            }
			        }
			    }
			}catch (Exception $e){
			    //just do nothing
			}
			try{
			    $bbtr = $wrapped_node->field_free_blue_bar_text->value();
				if (!empty($bbtr) && !is_null($bbtr))
				{
					echo '<span class="booking-widget__blue-bar blue-bar">';
                    echo $bbtr;
                    echo '</span>';
                } else {
                	if ($exclude_retreat === false && !empty($blue_bar_destination_text)) {
                    	echo '<span class="booking-widget__blue-bar blue-bar">';
                        echo $blue_bar_destination_text;
                        echo '</span>';
                	}
			    } ?>
            <?php
                }catch(Exception $e){
                }
            ?>
			<div class="wrapper">
				<header class="booking-widget__above <?php if ($listingonly) echo 'listing-only-header'; ?>">
					<hgroup>
						<?php if (!is_null($destination_name)) : ?>
						<h5 class="title"><?php echo $destination_name ?>, <?php echo $global_region ?></h5>
						<?php endif; ?>
						<h3 class="title" itemprop="name"><?php echo $title; ?></h3>
					</hgroup>
					<div class="booking-widget__anchor-links">
						<ul>
							<li><a class="anchor-link" data-link-source="overview" href="#0">Overview</a></li>
							<?php if (!empty($retreats_images_array)) : ?>
							<li><a class="anchor-link" data-link-source="gallery" href="#0">Gallery</a></li>
							<?php endif; ?>
							<li><a class="anchor-link" data-link-source="reviews" href="#0">Reviews</a></li>
							<li class="onStuck"><a class="anchor-link" href="#0" data-link-source="book">Book Now</a></li>
						</ul>
					</div>
				</header>
				<div class="booking-widget__below<?php if ($listingonly) echo ' call-to-book'; ?>">
					<div class="wrapper">
						<?php if ($listingonly) : ?>
							<div class="breadcrumb-container listing-only">

								<div class="breadcrumbs"><a href="/destination">Destinations</a> > <a href="<?php echo url('node/'.$wrapped_node->field_destination->nid->value()); ?>"><?php echo $destination_name; ?></a> > <span class="last-crumb"><?php echo $title; ?></span></div>
								<p class="subheader pull-left" id="newBookingWidgetPromoPrice">Sleeps <?php echo $retreat_sleeps; ?> <span class="line"></span> starting at <?php echo nret_get_currency($region_id).$retreat_fromPrice; ?> / night</p>
							</div>
							<h3 class="title listing-only-call">Call <?php echo $calltobookphone; ?> to book</h3>
						<?php else : ?>
							<button class="launch-mobile-booking-widget btn">Book Now</button>
							<div class="breadcrumbs"><a href="/destination">Destinations</a> > <a href="<?php echo url('node/'.$wrapped_node->field_destination->nid->value()); ?>"><?php echo $destination_name; ?></a> > <span class="last-crumb"><?php echo $title; ?></span></div>
							<form id="bookingWidgetForm" action="/booking" method="POST" accept-charset="utf-8">
								<input type="hidden" id="display-price-h" name="display-price-h" value="">
								<button type="button" class="close-mobile-booking-widget btn">Close&nbsp;<span class="icon icon_close"></span></button>
								<div class="filter-block subnav-container">
									<div class="filter__options-wrapper booking-widget__filter__options-wrapper">
										<div class="filter__options-wrapper__filter-option filter-option-check-in">
											<label class="input-label checkin-sublabel" for="check-in">Check In</label>
											<div class="input-container">
												<label for="check-in" class="check-in-overlay input-overlay">Check In</label>
												<input id="check-in" type="text" placeholder="Check In" disabled readonly="true" data-date-format="M dd yy">
												<span class="icon icon_carrot-down"></span>
											</div>
										</div>
										<div class="filter__options-wrapper__filter-option filter-option-check-out">
											<label class="input-label checkout-sublabel" for="check-out">Check Out</label>
											<div class="input-container">
												<label for="check-out" class="check-out-overlay input-overlay">Check Out</label>
												<input id="check-out" type="text" placeholder="Check Out" disabled readonly="true" data-date-format="M dd yy">
												<span class="icon icon_carrot-down"></span>
											</div>
										</div>
										<div class="filter__options-wrapper__filter-option filter__dropdown">
											<div class="input-container">
												<input id="bookingAdultCount" class="initGrow doNotClose" name="Adults" placeholder="Adults" min="1" max="10" readonly>
												<span class="icon icon_carrot-down"></span>
											</div>
											<ul class="filter__option__guests-list growMe filter__options-wrapper__single-choice-list open">
												<li><a class="nolink strike filter-choice-init" href="#0" data-value="1" data-input-target="bookingAdultCount">1 Adult</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-value="2" data-input-target="bookingAdultCount">2 Adults</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-value="3" data-input-target="bookingAdultCount">3 Adults</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-value="4" data-input-target="bookingAdultCount">4 Adults</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-value="5" data-input-target="bookingAdultCount">5 Adults</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-value="6" data-input-target="bookingAdultCount">6 Adults</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-value="7" data-input-target="bookingAdultCount">7 Adults</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-value="8" data-input-target="bookingAdultCount">8 Adults</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-value="9" data-input-target="bookingAdultCount">9 Adults</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-value="10" data-input-target="bookingAdultCount">10+ Adults</a></li>
											</ul>
										</div>
										<div class="filter__options-wrapper__filter-option filter__dropdown">
											<div class="input-container">
												<input id="bookingChildrenCount" class="initGrow doNotClose" name="Children" placeholder="Children" min="0" max="10" readonly>
												<span class="icon icon_carrot-down"></span>
											</div>
											<ul class="filter__option__guests-list growMe filter__options-wrapper__single-choice-list open filter__children-dropdown">
												<li><a class="nolink strike filter-choice-init" href="#0" data-input-target="bookingChildrenCount">1 Child</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-input-target="bookingChildrenCount">2 Children</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-input-target="bookingChildrenCount">3 Children</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-input-target="bookingChildrenCount">4 Children</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-input-target="bookingChildrenCount">5 Children</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-input-target="bookingChildrenCount">6 Children</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-input-target="bookingChildrenCount">7 Children</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-input-target="bookingChildrenCount">8 Children</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-input-target="bookingChildrenCount">9 Children</a></li>
												<li><a class="nolink strike filter-choice-init" href="#0" data-input-target="bookingChildrenCount">10+ Children</a></li>
											</ul>
										</div>
										<div class="disabled filter__options-wrapper__filter-option filter-option-pets">
											<div class="input-container">
												<input id="bookingPetsCheck" class="custom-check-input more-filter-experience" type="checkbox" value="" disabled>
												<label class="custom-check-label" for="bookingPetsCheck">Pets</label>
											</div>
										</div>
										<div class="booking-widget__promo-field">
											<input class="input__promo" type="text" name="DiscountCode" value="" placeholder="Promo Code">
                                            <div id="applyBookingPromo" class="promo-apply">Apply</div>
										</div>
										<button type="submit" class="btn btn__blue">Book</button>
									</div>
								</div>
								<div id="booking-error"></div>
								<input id="bookingGuestsCount" type="hidden" name="Guests" value="">
								<input id="bookingRetreatId" type="hidden" name="retreat_id" value="<?php echo $retreat_id; ?>">
								<input id="bookingRetreatNodeId" type="hidden" name="retreat_node_id" value="<?php echo $wrapped_node->nid->value(); ?>">
								<input id="booking-nights" type="hidden" name="Nights" value="">
								<input id="bookingRegionId" type="hidden" name="Region_id" value="<?php echo $region_id; ?>">
								<input id="bookingDestinationId" type="hidden" name="Destination_id" value="<?php echo $destination_id; ?>">
								<input id="bookingProcess" type="hidden" name="process" value="prepayment">
								<input id="bookingStartDate" type="hidden" name="StartDate" value="">
								<input id="bookingPets" type="hidden" name="Pets" value="0">
								<input id="sleeps" type="hidden" name="sleeps" value="<?php echo $retreat_sleeps; ?>">
							</form>
						</div>
					</div>
					<div class="breadcrumb-container">
						<div class="breadcrumbs"><a href="/destination">Destinations</a> > <a href="<?php echo url('node/'.$wrapped_node->field_destination->nid->value()); ?>"><?php echo $destination_name; ?></a> > <span class="last-crumb"><?php echo $title; ?></span></div>
						<?php if (!empty($availabilityRestrictions) && !$availabilityRestrictions['error'] && !empty($availabilityRestrictions['data'])) : ?>
						<div class="availability-restrictions filter__options-wrapper__filter-option">
							<button class="initGrow doNotClose">Availability Restrictions&nbsp;<span class="icon icon_carrot-down"></span></button>
							<ul class="filter__option__availability growMe filter__options-wrapper__single-choice-list open doNotClose">
								<?php foreach ($availabilityRestrictions['data'] as $restriction) :
									$restriction_start_date = $restriction->startdate;
									$restriction_end_date = $restriction->enddate;
									$restriction_min_stay = $restriction->min_stay;
									$restriction_arrival_retrictions = $restriction->arrival_retrictions;
								?>
									<li>
										<?php if (!empty($restriction_start_date)) :
											$restriction_dates = '';
											$restriction_dates .= date_format(date_create_from_format('d-M-Y', $restriction_start_date), 'F d');
											if (empty($restriction_end_date)) {
												$restriction_dates .= ' onwards';
											} else if ($restriction_end_date === $restriction_start_date) {
												$restriction_dates .= ' only';
											} else {
												$restriction_dates .= ' - ' . date_format(date_create_from_format('d-M-Y', $restriction_end_date), 'F d');
											}
										?>
											<h4><?php echo $restriction_dates; ?></h4>
										<?php endif; ?>
										<?php if (!empty($restriction_min_stay)) : ?>
											<div><?php echo $restriction_min_stay; ?></div>
										<?php endif; ?>
										<?php if (!empty($restriction_arrival_retrictions) && $restriction_arrival_retrictions !== 'No arrival restrictions') : ?>
											<div><?php echo $restriction_arrival_retrictions; ?></div>
										<?php endif; ?>
									</li>
								<?php endforeach; ?>
							</ul>
						</div>
						<?php endif; ?>
						<div class="submit-enquiry">
							<button id="initEnquiry" class="doNotClose">Submit Enquiry <span class="side-arrow side-arrow-white"></span></button>
						</div>
						<p class="subheader" id="newBookingWidgetPromoPrice">Sleeps <?php echo $retreat_sleeps; ?> <span class="line"></span> starting at <?php echo nret_get_currency($region_id).$retreat_fromPrice; ?> / night</p>
					</div>
				<?php endif; ?>
			</div>
		</section>
		<section class="retreat-details" data-anchor="overview">
			<article class="retreat-details__copy">
				<p class="intro intro__header"><?php echo $retreat_headline; ?><span class="underline"></span></p>
			</article>
			<aside class="amenities-row">
				<?php if (!empty($retreats_essentials_array)) : ?>
					<div class="amenities-block">
						<header>
							<h3 class="title">Essentials <span class="icon_carrot-down icon"></span></h3>
							<span class="underline"></span>
						</header>
						<ul>
							<?php foreach ($retreats_essentials_array as $essential) {
								echo '<li><span class="list-dot"></span><p>'.$essential->Name.'</p></li>';
							} ?>
						</ul>
					</div>
				<?php endif; ?>
				<?php if (!empty($retreats_facilities_array)) : ?>
					<div class="amenities-block">
						<header>
							<h3 class="title">Facilities <span class="icon_carrot-down icon"></span></h3>
							<span class="underline"></span>
						</header>
						<ul>
							<?php foreach ($retreats_facilities_array as $facility) {
								echo '<li><span class="list-dot"></span><p>'.$facility->Name.'</p></li>';
							} ?>
						</ul>
					</div>
				<?php endif; ?>
				<?php if (!empty($retreats_features_array)) : ?>
					<div class="amenities-block">
						<header>
							<h3 class="title">Features <span class="icon_carrot-down icon"></span></h3>
							<span class="underline"></span>
						</header>
						<ul>
							<?php foreach ($retreats_features_array as $feature) {
								echo '<li><span class="list-dot"></span><p>'.$feature->Name.'</p></li>';
							} ?>
						</ul>
					</div>
				<?php endif; ?>
			</aside>
			<?php if (!empty($retreats_images_array)) : ?>
			<section class="image-gallery__parent hide-block" data-anchor="gallery">
				<div class="image-gallery__navigation">
					<div class="image-gallery__navigation-left"></div>
					<div class="image-gallery__navigation-right"></div>
				</div>
				<div class="image-gallery__photographer">
					<div class="inner image-gallery-photographer">
						<?php foreach ($retreats_images_array as $image) {
							echo '<p>'.$image->Caption.'</p>';
						} ?>
					</div>
				</div>
				<div class="image-gallery">
					<?php foreach ($retreats_images_array as $image) {
						echo '<div class="image-gallery-image-wrapper">';
						echo '<img src="'.$image->Url.'" alt="">';
						echo '</div>';
					} ?>
				</div>
			</section>
			<article class="retreat-details__copy">
				<div class="paragraph"><?php print nl2br($retreat_description); ?></div>
			</article>
			<?php endif; ?>
			<?php if (!empty($retreat_latitude)) : ?>
				<div class="retreat__details__with-map">
					<div class="map-wrapper">
						<div class="map" data-lat="<?php echo $retreat_latitude; ?>" data-lng="<?php echo $retreat_longitude; ?>" data-markers="[<?php echo $retreat_latitude; ?>, <?php echo $retreat_longitude; ?>]"></div>
					</div>
				</div>
			<?php endif; ?>
			<?php $youtube = $wrapped_node->field_youtube_video->value();
			if (!empty($youtube['video_id'])) :
				// JAMAL:
				// Drupal Video Function, cutomizable on this array keys
				// 	video_id	required
				// 	size		required (responsive, custom or 500x400 format)
				// 	width
				// 	height
				// 	autoplay
				// 	loop
				// 	showinfo
				// 	controls
				// 	autohide
				// 	iv_load_policy
				// This are global module configuration options
				// 	suggest = variable_get('youtube_suggest', TRUE);
				// 	privacy = variable_get('youtube_privacy', FALSE);
				// 	modestbranding = variable_get('youtube_modestbranding', FALSE);
				// 	theme = variable_get('youtube_theme', FALSE);
				// 	color = variable_get('youtube_color', FALSE);
				// 	enablejsapi = variable_get('youtube_enablejsapi', FALSE);
				// 	player_class = variable_get('youtube_player_class', 'youtube-field-player');
				// 	wmode = variable_get('youtube_wmode', TRUE);
				// 	privacy = variable_get('youtube_privacy', FALSE);
				// echo theme_youtube_video(array('video_id'=>$youtube['video_id'],'size'=>'responsive'));

				// JAMAL:
				// This is the drupal function to show the video, array keys are
				// video_id         required
				// image_style      used to pass some drupal style functions
				// entity_title     used for alt
				// image_link       not sure but it's an array with two keys: path and options
				// echo theme_youtube_thumbnail(array('video_id'=>$youtube['video_id']));

				// JAMAL:
				// Propietary function I made based on the HTML found here and some of the data from the other function for integration
				// You can choose which ones plays more accordingly, I think this one is going to be the more suitable, but I just wanted to let
				// you know how it could be done.
				echo nret_youtube_show_player($youtube['video_id'], nret_parse_image_url($wrapped_node->field_youtube_thumbnail->value())); ?>
				<section class="youtube__mobile">
					<iframe width="320" height="315" src="https://www.youtube.com/embed/<?php echo $youtube['video_id']; ?>" frameborder="0" allowfullscreen></iframe>
				</section>
			<?php endif; ?>
			<?php try { if ( !empty($thingsToDoListObj) ) { ?>
			<section class="retreat-detail__activities hide-block" data-anchor="area">
				<div class="flex image-on-image__intro-wrapper">
					<div class="image-on-image__intro-copy">
						<article class="inner list">
							<header>
								<h3 class="title">Top 5 Things To Do</h3>
								<span class="underline"></span>
							</header><!-- /header -->
							<p class="image-on-image__intro-copy__message">Call our Xplore team for more suggestions</p>
						</article>
					</div>
					<div class="image-on-image__map">
						<div class="map-wrapper">
							<div class="map" data-highlightonclickcontainer="thingsToDo-list" data-lat="40.714728" data-lng="-73.998672" data-markers="[<?php echo rtrim($thingsToDoMapArray, ','); ?>]"></div>
						</div>
					</div>
				</div>
			</section>
			<?php } } catch (Exception $e) {
			//just do nothing
			} ?>
			<?php if ($wrapped_node->field_destination->field_retreat_sro->value()) : ?>
				<?php foreach ($wrapped_node->field_destination->field_retreat_sro as $spa) :  ?>
					<section class="content-grid content-grid__event right hide-block theSpa">
						<div class="flex content-grid__event-wrapper">
							<div class="content-grid__event-copy">
								<article class="inner">
									<header class="subtitle">
										<h3 class="title"><?php echo $spa->field_title->value(); ?></h3>
										<span class="underline"></span>
									</header><!-- /header -->
									<p><?php echo $spa->field_long_description->value(); ?></p>
									<?php if ($spa->field_learn_more_cta->value()) : ?>
									<div class="btn-wrapper">
										<a target="_blank" href='<?php echo nret_parse_image_url($spa->field_learn_more_cta->value()); ?>' class="btn btn__transparent">Learn More</a>
									</div>
									<?php endif; ?>
								</article>
							</div>
							<div class="content-listing__image">
								<img src="<?php echo nret_parse_image_url( $spa->field_image->value()); ?>" alt="">
							</div>
						</div>
					</section>
				<?php endforeach; ?>
			<?php endif; ?>
			<section class="product__reviews" data-anchor="reviews">
				<script type="text/javascript">
					$BV.configure('global', { productId : '<?php echo $retreat_id; ?>' });
				</script>
				<!-- Reviews Container goes below product description -->
				<div id="BVRRContainer"></div>
				<script type="text/javascript">
					$BV.ui('rr', 'show_reviews', {
						doShowContent: function() {
							// If the container is hidden (such as behind a tab), put code here to make it visible
							//(open the tab).
						}
					});
				</script>
			</section>
			<?php
				if (function_exists('nret_bvseo_get')) {
					$bvseo_string = nret_bvseo_get($retreat_id,'reviews','content');
					if ($bvseo_string) {
						echo '<div style="display: none;">'.$bvseo_string.'</div>';
					}
				}
			?>
		</section>
	</div>
</article>

<aside class="retreat-detail__enquiry-window open">
	<div class="wrapper">
		<div class="enquiry__container doNotClose">
			<header>
				<h3 class="title">Submit an Enquiry</h3>
			</header>
			<div class="enquiry__close btn__close"><span class="text">Close&nbsp;</span><span class="icon icon_close"></span></div>
			<form id="retreatEnquiryForm" class="retreat-detail__enquiry-form" action="retreat-enquiry.php">
				<div class="input-row">
					<div class="cal-wrapper enquiry-check-in">
						<input id="retreatEnquiryCheckIn" class="calendarInit" type="text" name="CHECK_IN" value="" placeholder="Check-In" readonly="true"> <span class="icon icon_carrot-down"></span>
					</div>
					<div class="cal-wrapper enquiry-check-out">
						<input id="retreatEnquiryCheckOut" class="calendarInit" type="text" name="CHECK_OUT" value="" placeholder="Check-Out" readonly="true"> <span class="icon icon_carrot-down"></span>
					</div>
				</div>
				<div class="input-row">
					<input type="text" id="enquiry_firstName" name="FIRST_NAME" value="" title="First Name" maxlength="255"  placeholder="FIRST NAME" required>
					<input type="text" id="enquiry_lastName" name="LAST_NAME" value="" title="Last Name" maxlength="255"  placeholder="LAST NAME" required>
				</div>
				<div class="input-row">
					<input type="tel" id="enquiry_phone" name="TEL" value="" title="Phone Number" maxlength="255"  placeholder="PHONE NUMBER" required>
					<input class="email-validation" type="email"  name="EMAIL" value="" title="Email" maxlength="255"  placeholder="EMAIL" required>
				</div>
				<div class="input-row">
					<textarea name="MESSAGE" placeholder="MESSAGE (OPTIONAL)" ></textarea>
				</div>
				<input type="hidden" name="DESTINATION_NAME" value="<?php echo $destination_name; ?>">
				<input type="hidden" name="RETREAT_NAME" value="<?php echo $title; ?>">
				<input type="hidden" name="toemail" value="<?php echo $enquiry_location; ?>">
				<input class="btn btn__blue" type="submit" name="contact__submit" value="Submit">
			</form>
		</div>
	</div>
</aside>

<?php drupal_add_js('jQuery(document).ready(function () { nret.retreatDetail.init(); });', 'inline'); ?>
