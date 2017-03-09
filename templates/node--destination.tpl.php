<?php
$destination_api = $node->api_data;
$instagram_tag = $node->field_instagram_hashtag[LANGUAGE_NONE][0]['value'];
$wrapped_node = entity_metadata_wrapper('node', $node);
if (isset($destination_api->Subareas)) $subarea = $destination_api->Subareas;

$isLodge = isset($destination_api->IsLodge) && $destination_api->IsLodge == 'Y';

$explorer_array = $wrapped_node->field_xplore_team_members;

$amenities = $node->nres_filters;
$amenities = $amenities->data;
$amenities = $amenities->Amenities;

$sro_array = $wrapped_node->field_retreat_sro->value();
$thingsToDo = $wrapped_node->field_things_list->value();
$blue_bar_destination = null;
$blue_bar_destination_text = '';
try {
	if (!empty($wrapped_node->field_blue_bar_text_collection)) {
		$blue_bar_destination = $wrapped_node->field_blue_bar_text_collection;
		$blue_bar_destination_text = $blue_bar_destination->field_free_blue_bar_text->value();
	}
} catch (Exception $e) {
	// do nothing
}

$related_guide = $wrapped_node->field_related_guide->value();

?>

<section class="retreat-listing content-start"<?php if (isset($_GET['filterApplied'])) : ?> data-scrollTop="0"<?php endif; ?>>
	<div class="wrapper">
		<div class="retreat-listing__hero" style="background:url('<?php echo $destination_api->Image1; ?>') center center no-repeat;background-size:cover;">
			<div class="retreat-listing__hero-copy">
				<hgroup>
					<h1 class="title"><?php echo $node->title; ?></h1>
				</hgroup>
			</div>
		</div>
		<section class="retreat-grid__multi content-grid__multi">
			<div class="flex content-grid__multi-wrapper">
				<?php try { if( !is_null($blue_bar_destination )){ if(!empty($blue_bar_destination_text)) {
					?>
					<div class="blue-bar destination"><?php echo $blue_bar_destination_text; ?></div>
				<?php } } } catch (exception $e) {

				}  ?>

				<div class="content-grid__multi-copy">
					<article class="inner">
						<p class="<?php if (strlen($destination_api->Description) > 700) echo 'fade-overflow'; ?>"><?php echo nl2br($destination_api->Description); ?><span class="fade"></span></p>
						<ul class="retreat-listing__icons">
							<?php if (!$node->truezero) : ?>
							<li class="anchor-link" data-link-source="retreat-listing">
								<div class="icon retreats"></div>
								<span>View Retreats</span>
							</li>
							<?php endif; ?>
							<?php try { if(!empty($related_guide)) {?>
							<li class="anchor-link" data-link-source="guide">
								<div class="icon guides"></div>
								<span>Destination Guide</span>
							</li>
							<?php } } catch (Exception $e) {
								// Error catching
							} ?>
							<?php try {
								if(!empty($thingsToDo)) {?>
							<li class="anchor-link" data-link-source="activities">
								<div class="icon activities"></div>
								<span>Activities & Experiences</span>
							</li>
							<?php } } catch (Exception $e) {
								// Error catching
							} ?>
							<?php try {
								if(!empty($node->field_journal_articles)) {?>
							<li class="anchor-link" data-link-source="news">
								<div class="icon news"></div>
								<span>News & Features</span>
							</li>
							<?php } } catch (Exception $e) {
								// Error catching
							} ?>
						</ul>
					</article>
					<div class="content-grid__intro">
						<?php try { $offersfromdestinations = $wrapped_node->field_related_offers;
							if ( count($offersfromdestinations->value()) > 0) {
						?>
						<aside class="content-grid__offer-row js-carousel-parent">
							<h2 class="title">Special offers<span class="underline"></span></h2>
							<div class="wrapper js-carousel">
								<?php 	foreach($offersfromdestinations as $offer ) {
									$title = $offer->title->value();
									$type = $offer->field_offer_type->value();
									?>
								<a href="<?php echo url('node/'.$offer->nid->value()); ?>" class="content-grid__offer">
									<h6 class="title"><?php echo $type; ?></h6>
									<h2 class="title"><?php echo $title; ?></h2>
									<h4><?php echo $offer->field_offer_cta_text->value(); ?></h4>
								</a>
								<?php } ?>
							</div>
							<div class="js-carousel-controls left js-carousel-prev"><span class="icon icon_arrow-left"></span></div>
							<div class="js-carousel-controls right js-carousel-next"><span class="icon icon_arrow-right"></span></div>
						</aside>
						<?php } ?>
						<?php } catch (Exception $e) {
							//just casue it must be a catch in a try
						} ?>
						<?php if ($destination_api->Latitude) { ?>
						<div class="content-listing__map">
							<div class="map" data-lat="<?php echo $destination_api->Latitude; ?>" data-lng="<?php echo $destination_api->Longitude; ?>" data-markers="[<?php echo $destination_api->Latitude; ?>, <?php echo $destination_api->Longitude; ?>]"></div>
						</div>
						<?php } ?>
					</div>
				</div>
			</div>
		</section>

		<?php if (!$node->truezero ) { ?>
		<script type="text/template" id="mbl-search">
			<div class="mbl-search-menu-title">EXPLORE DESTINATIONS</div>
			<div class="mbl-search-menu">
				<div class="options">
					<a class="navigate" href='/destination'><span>EXPLORE</span></a> <a class='date active' href=''><span>Filter Retreats</span></a>
				</div>
				<section class='date active'>
					<div class="select-box cal checkIn">
						<span class="intro">Check-In <span class="entry"></span></span><span class="icon icon_carrot-down"></span>
						<div class="calendar checkIn"></div>
					</div>
					<div class="select-box cal checkOut">
						<span class="intro">Check-Out <span class="entry"></span></span><span class="icon icon_carrot-down"></span>
						<div class="calendar checkOut"></div>
					</div>
					<div class="select-box guests">
						<span class="intro">Guests <span class="entry"></span></span><select class="guests" name="iama">
							<option></option>
							<option value="1">1 Guest</option>
							<option value="2">2 Guests</option>
							<option value="3">3 Guests</option>
							<option value="4">4 Guests</option>
							<option value="5">5 Guests</option>
							<option value="6">6 Guests</option>
							<option value="7">7 Guests</option>
							<option value="8">8 Guests</option>
							<option value="9">9 Guests</option>
							<option value="10">10+ Guests</option>
						</select><span class="icon icon_carrot-down"></span>
					</div>
					<div class="select-box bedrooms">
						<span class="intro">Bedrooms <span class="entry"></span></span><select class="bedrooms" name="iama">
						<option></option>
						<option value="1">1+</option>
						<option value="2">2+</option>
						<option value="3">3+</option>
						</select><span class="icon icon_carrot-down"></span>
					</div>
					<div class="select-box beds">
						<span class="intro">No. of Beds <span class="entry"></span></span><select class="beds" name="iama">
							<option></option>
							<option value="1">1+</option>
							<option value="2">2+</option>
							<option value="3">3+</option>
							<option value="4">4+</option>
							<option value="5">5+</option>
							<option value="6">6+</option>
							<option value="7">7+</option>
							<option value="8">8+</option>
							<option value="9">9+</option>
							<option value="10">10+</option>
						</select><span class="icon icon_carrot-down"></span>
					</div>
					<div class="select-box bathrooms">
						<span class="intro">Bathrooms <span class="entry"></span></span><select class="bathrooms" name="iama">
						<option></option>
						<option value="1">1+</option>
						<option value="2">2+</option>
						<option value="3">3+</option>
						</select><span class="icon icon_carrot-down"></span>
					</div>
					<?php if (isset($destination_api->Subareas) && !empty($destination_api->Subareas)) : ?>
					<div class="select-box subarea">
						<span class="intro">Area <span class="entry"></span></span><select class="subarea" name="iama">
							<option></option>
							<?php foreach($subarea as $key => $value) : ?>
							<option value="<?php echo $key; ?>"><?php echo $value; ?></option>
							<?php endforeach; ?>
						</select><span class="icon icon_carrot-down"></span>
					</div>
					<?php endif; ?>
					<?php if (isset($amenities) && !empty($amenities)) : ?>
					<div class="select-box amenities">
						<span class="intro">Amenities <span class="entry"></span></span><select class="amenities" name="iama">
							<option></option>
							<?php foreach ($amenities as $amenity) : $amenity_id = str_replace(' ', '_', str_replace('/', '_', strtolower($amenity))); ?>
							<option value="<?php echo $amenity_id; ?>"><?php echo $amenity; ?></option>
							<?php endforeach; ?>
						</select><span class="icon icon_carrot-down"></span>
					</div>
					<?php endif; ?>
					<a class="start-exploring explore destinationFilterRefresh" href="#">Filter Retreats</a>
					<a class="start-exploring explore destinationFilterClear" href="#">Clear Filter</a>
				</section>
			</div>
		</script>
		<?php
		if ($isLodge) {
			$retreats_available = 0;
			foreach ($node->related_retreats as $retreat) {
				$wrapped_retreat = entity_metadata_wrapper('node',$retreat);
				$retreats_available += isset($node->availableforlodge[$wrapped_retreat->field_api_id->value()])?$node->availableforlodge[$wrapped_retreat->field_api_id->value()]:(isset($wrapped_retreat->value()->api_data->data[0]->TotalUnits)?$wrapped_retreat->value()->api_data->data[0]->TotalUnits:0);
			}
		} else {
			$retreats_available = count($node->related_retreats);
		}
		?>
		<div class="filter-block subnav-container" data-anchor="retreat-listing">
			<div class="filter-block__wrapper">
				<div class="filter__results-data">
					<hgroup>
						<h5><a href="/destination">Destinations</a> > <?php echo $node->title; ?></h5>
						<h3 class="title"><span><?php echo $retreats_available; ?></span> retreats available</h3>
						<span class="underline"></span>
					</hgroup>
					<div class="btn__transparent initMobileSearchDates btn">Filter Retreats</div>
				</div>
				<div class="filter__options-wrapper">
					<div class="filter__options-wrapper__filter-option filter-option-check-in doNotClose">
						<label for="destination-check-in-label" class="input-label checkin-sublabel">Check In</label>
						<div class="input-container ">
							<label for="destination-check-in-label" class="check-in-overlay input-overlay">Check In</label>
							<input id="destination-check-in-label" type="text" placeholder="Check In" readonly="true" data-date-format="M dd yy">
							<span class="icon icon_carrot-down"></span>
						</div>
					</div>
					<div class="filter__options-wrapper__filter-option filter-option-check-out doNotClose">
						<label for="destination-check-out-label" class="input-label checkout-sublabel">Check Out</label>
						<div class="input-container ">
							<label for="destination-check-out-label" class="check-out-overlay input-overlay">Check Out</label>
							<input id="destination-check-out-label" type="text" placeholder="Check Out" disabled readonly="true" data-date-format="M dd yy">
							<span class="icon icon_carrot-down"></span>
						</div>
					</div>
					<div class="filter__options-wrapper__filter-option">
						<p id="bedroom-label" class="bedroom-label initGrow">Bedrooms</p>
						<span class="icon icon_carrot-down"></span>
						<ul class="guest-list filter__option__guests-list open growMe single-choice-list filter-choice-one-wrapper">
							<li><a class="strike nolink filter-choice-one" data-more-filter-bedrooms="1" href="#0">1</a><div class="arrow-up-destination-list"></div></li>
							<li><a class="strike nolink filter-choice-one" data-more-filter-bedrooms="2" href="#0">2</a></li>
							<li><a class="strike nolink filter-choice-one" data-more-filter-bedrooms="3" href="#0">3</a></li>
							<li><a class="strike nolink filter-choice-one" data-more-filter-bedrooms="4" href="#0">4</a></li>
							<li><a class="strike nolink filter-choice-one" data-more-filter-bedrooms="5" href="#0">5</a></li>
							<li><a class="strike nolink filter-choice-one" data-more-filter-bedrooms="6" href="#0">6</a></li>
							<li><a class="strike nolink filter-choice-one" data-more-filter-bedrooms="7" href="#0">7</a></li>
							<li><a class="strike nolink filter-choice-one" data-more-filter-bedrooms="8" href="#0">8</a></li>
							<li><a class="strike nolink filter-choice-one" data-more-filter-bedrooms="9" href="#0">9</a></li>
							<li><a class="strike nolink filter-choice-one" data-more-filter-bedrooms="10" href="#0">10+</a></li>

						</ul>
					</div>
					<div class="filter__options-wrapper__filter-option">
						<p id="more-label" class="initGrowMore">More Filters</p>
						<span class="icon icon_carrot-down"></span>
					</div>
				</div>
				<div class="filter__cal-wrapper filter__cal-wrapper-in doNotClose open">
					<div class="filter__cal-wrapper__check-in" id="destination-check-in">
						<div class="arrow-up-destination-list"></div>
					</div>
				</div>
				<div class="filter__cal-wrapper filter__cal-wrapper-out doNotClose open">
					<div class="filter__cal-wrapper__check-out" id="destination-check-out">
						<div class="arrow-up-destination-list"></div>
					</div>
				</div>
				<div class="filter__more-options-wrapper open growMeMore doNotClose open">
					<div class="arrow-up-destination-list"></div>
					<div class="filter__more-options">
						<div id="moreFiltersWrapper" class="wrapper">
							<div class="filter__more__block">
								<header>
									<h6 class="title">Guests</h6>
								</header>
								<ul class="filter-choice-one-wrapper single-choice-list">
									 <li class="custom-check">
										<input id="filterGuest1" class="custom-check-input" data-more-filter-guest="1" type="radio" name="filter-guest-choice" value="1">
										<label class="custom-check-label label-radio" for="filterGuest1">1 Guest</label>
									</li>
									 <li class="custom-check">
										<input id="filterGuest2" class="custom-check-input" data-more-filter-guest="2" type="radio" name="filter-guest-choice" value="2">
										<label class="custom-check-label label-radio" for="filterGuest2">2 Guests</label>
									</li>
									 <li class="custom-check">
										<input id="filterGuest3" class="custom-check-input" data-more-filter-guest="3" type="radio" name="filter-guest-choice" value="3">
										<label class="custom-check-label label-radio" for="filterGuest3">3 Guests</label>
									</li>
									<li class="custom-check">
										<input id="filterGuest4" class="custom-check-input" data-more-filter-guest="4" type="radio" name="filter-guest-choice" value="4">
										<label class="custom-check-label label-radio" for="filterGuest4">4 Guests</label>
									</li>
									<li class="custom-check">
										<input id="filterGuest5" class="custom-check-input" data-more-filter-guest="5" type="radio" name="filter-guest-choice" value="5">
										<label class="custom-check-label label-radio" for="filterGuest5">5 Guests</label>
									</li>
									<li class="custom-check">
										<input id="filterGuest6" class="custom-check-input" data-more-filter-guest="6" type="radio" name="filter-guest-choice" value="6">
										<label class="custom-check-label label-radio" for="filterGuest6">6 Guests</label>
									</li>
									<li class="custom-check">
										<input id="filterGuest7" class="custom-check-input" data-more-filter-guest="7" type="radio" name="filter-guest-choice" value="7">
										<label class="custom-check-label label-radio" for="filterGuest7">7 Guests</label>
									</li>
									<li class="custom-check">
										<input id="filterGuest8" class="custom-check-input" data-more-filter-guest="8" type="radio" name="filter-guest-choice" value="8">
										<label class="custom-check-label label-radio" for="filterGuest8">8 Guests</label>
									</li>
									<li class="custom-check">
										<input id="filterGuest9" class="custom-check-input" data-more-filter-guest="9" type="radio" name="filter-guest-choice" value="9">
										<label class="custom-check-label label-radio" for="filterGuest9">9 Guests</label>
									</li>
									<li class="custom-check">
										<input id="filterGuest10" class="custom-check-input" data-more-filter-guest="10" type="radio" name="filter-guest-choice" value="10">
										<label class="custom-check-label label-radio" for="filterGuest10">10+ Guests</label>
									</li>
								</ul>
							</div>
							<div class="filter__more__block">
								<header>
									<h6 class="title">No. of Beds</h6>
								</header>
								<ul class="filter-choice-one-wrapper single-choice-list">
									<li class="custom-check">
										<input id="filterBed1" class="custom-check-input" data-more-filter-bed="1" type="radio" name="filter-bed-choice" value="1">
										<label class="custom-check-label label-radio" for="filterBed1">1+ Beds</label>
									</li>
									 <li class="custom-check">
										<input id="filterBed2" class="custom-check-input" data-more-filter-bed="2" type="radio" name="filter-bed-choice" value="2">
										<label class="custom-check-label label-radio" for="filterBed2">2+ Beds</label>
									</li>
									 <li class="custom-check">
										<input id="filterBed3" class="custom-check-input" data-more-filter-bed="3" type="radio" name="filter-bed-choice" value="3">
										<label class="custom-check-label label-radio" for="filterBed3">3+ Beds</label>
									</li>
									 <li class="custom-check">
										<input id="filterBed4" class="custom-check-input" data-more-filter-bed="4" type="radio" name="filter-bed-choice" value="4">
										<label class="custom-check-label label-radio" for="filterBed4">4+ Beds</label>
									</li>
									 <li class="custom-check">
										<input id="filterBed5" class="custom-check-input" data-more-filter-bed="5" type="radio" name="filter-bed-choice" value="5">
										<label class="custom-check-label label-radio" for="filterBed5">5+ Beds</label>
									</li>
									 <li class="custom-check">
										<input id="filterBed6" class="custom-check-input" data-more-filter-bed="6" type="radio" name="filter-bed-choice" value="6">
										<label class="custom-check-label label-radio" for="filterBed6">6+ Beds</label>
									</li>
									 <li class="custom-check">
										<input id="filterBed7" class="custom-check-input" data-more-filter-bed="7" type="radio" name="filter-bed-choice" value="7">
										<label class="custom-check-label label-radio" for="filterBed7">7+ Beds</label>
									</li>
									 <li class="custom-check">
										<input id="filterBed8" class="custom-check-input" data-more-filter-bed="8" type="radio" name="filter-bed-choice" value="8">
										<label class="custom-check-label label-radio" for="filterBed8">8+ Beds</label>
									</li>
									 <li class="custom-check">
										<input id="filterBed9" class="custom-check-input" data-more-filter-bed="9" type="radio" name="filter-bed-choice" value="9">
										<label class="custom-check-label label-radio" for="filterBed9">9+ Beds</label>
									</li>
									 <li class="custom-check">
										<input id="filterBed10" class="custom-check-input" data-more-filter-bed="10" type="radio" name="filter-bed-choice" value="10">
										<label class="custom-check-label label-radio" for="filterBed10">10+ Beds</label>
									</li>
								</ul>
							</div>
							<div class="filter__more__block">
								<header>
									<h6 class="title">Bathrooms</h6>
								</header>
								<ul class="filter-choice-one-wrapper single-choice-list">
									<li class="custom-check">
										<input id="filterBathroom1" class="custom-check-input" data-more-filter-bathroom="1" type="radio" name="filter-bathroom-choice" value="1">
										<label class="custom-check-label label-radio" for="filterBathroom1">1+ Bathrooms</label>
									</li>
									<li class="custom-check">
										<input id="filterBathroom2" class="custom-check-input" data-more-filter-bathroom="2" type="radio" name="filter-bathroom-choice" value="2">
										<label class="custom-check-label label-radio" for="filterBathroom2">2+ Bathrooms</label>
									</li>
									<li class="custom-check">
										<input id="filterBathroom3" class="custom-check-input" data-more-filter-bathroom="3" type="radio" name="filter-bathroom-choice" value="3">
										<label class="custom-check-label label-radio" for="filterBathroom3">3+ Bathrooms</label>
									</li>
								</ul>
							</div>
							<div class="filter__more__block">
								<header>
									<h6 class="title">Amenities</h6>
								</header>
								<ul>
								  <?php foreach($amenities as $amenity) { ?>
									<?php $amenity_id = str_replace(' ','_',str_replace('/','_',strtolower($amenity))); ?>
									<li class="custom-check">
										<input id="<?php echo $amenity_id; ?>" class="custom-check-input" data-more-filter-amenities="<?php echo $amenity_id; ?>" type="checkbox" name="<?php echo $amenity_id; ?>" value="">
										<label class="custom-check-label" for="<?php echo $amenity_id; ?>"><?php echo $amenity; ?></label>
									</li>
								  <?php } ?>
								</ul>
							</div>
							<?php if ( isset($destination_api->Subareas) && !empty($destination_api->Subareas)) { ?>
							<div class="filter__more__block">
								<header>
									<h6 class="title">Area</h6>
								</header>
								<ul class="filter-choice-one-wrapper">
								   <?php foreach($subarea as $key => $value) { ?>
									<li class="custom-check">
										<input id="<?php echo $key; ?>" class="custom-check-input" data-more-filter-area="<?php echo $key; ?>" type="checkbox" name="<?php echo $key; ?>" value="">
										<label class="custom-check-label" for="<?php echo $key; ?>"><?php echo $value; ?></label>
									</li>
									<?php } ?>
								</ul>
							</div>
							<?php } ?>
						</div>
						<div class="btn-wrapper">
							<div id="clearMoreFilters" class="btn btn__transparent">Clear</div>
							<div id="destinationMoreFilterRefresh" class="btn btn__blue">Apply</div>
						</div>
					</div>
				</div>
				 <div class="filter__more__block filter__apply-filter">
					<div id="destinationFilterRefresh" class="btn btn__blue">Apply</div>
					<div id="destinationFilterClear" class="btn btn__transparent">Reset</div>
				</div>
			</div>
		</div>
		<?php
			$bArray = array();
			foreach ($node->related_retreats as $retreat) {
				foreach($retreat->api_data->data as $data) {
					$retreat_id = $data->CategoryId;
					array_push($bArray, $retreat_id);
				}
			}
		?>
		<script type="text/javascript">
		var arr = <?php echo json_encode($bArray) ?>;
		$BV.ui( 'rr', 'inline_ratings', {
		 productIds : arr,
		 containerPrefix : 'BVRRInlineRating',
		});
		</script>

		<section class="retreat-listing__list">
			<div class="retreat-listing__list-bg funky-bg">
				<div class="empty">Unfortunately, no retreats are available for your selected filters. Please <a href="#" class="reset">reset</a> the filters or browse one of our other amazing <a href="/destination">destinations</a>.</div>
			</div>
			<div class="wrapper">
				<div class="retreat-listing__container">
					<?php
					$count = 1;
					foreach ($node->related_retreats as $retreat) {
						$wrapped_retreat = entity_metadata_wrapper('node',$retreat);
						$totalUnits = isset($node->availableforlodge[$wrapped_retreat->field_api_id->value()])?$node->availableforlodge[$wrapped_retreat->field_api_id->value()]:(isset($wrapped_retreat->value()->api_data->data[0]->TotalUnits)?$wrapped_retreat->value()->api_data->data[0]->TotalUnits:0);
						$exclude_retreat = false;
						try{
						    if(!is_null($blue_bar_destination))
						    {
						        $bbtderid = $blue_bar_destination->field_excluding_retreats->value();
        						foreach($bbtderid as $exlude_id)
        						{
        							if ($exlude_id->nid === $retreat->nid)
        							{
        								$exclude_retreat = true;
        							}
        						}
						    }
						}catch (Exception $e){
						  //just do nothing
						}
					if($count > 57) { ?>
					<div class="retreat-listing__block-small hide-block retreat-listing__show-all">
					<?php } elseif($count > 9 && $count <= 57) { ?>
					<div class="retreat-listing__block-small hide-block retreat-listing__show-next">
					<?php } else { ?>
					<div class="retreat-listing__block-small hide-block">
					<?php } ?>
						<a href="<?php echo url('node/'.$retreat->nid); ?>" class="retreat-listing__block__image lazy" data-original="<?php echo nret_parse_image_url( $wrapped_retreat->field_hero_image->value() ); ?>" style="background:center center no-repeat;background-size:cover;"></a>
						<div class="retreat-listing__block__copy">
							<hgroup>
								<a href="<?php echo url('node/'.$retreat->nid); ?>"><?php echo $wrapped_retreat->title->value(); ?></a>
								<?php foreach($retreat->api_data->data as $data) { ?>
									<h5 class="subheader">Sleeps <?php echo $data->Sleeps; ?> <span class="long-dash"></span>Starting from <?php echo nret_get_currency($wrapped_node->field_api_region_id->value()).$data->FromPrice; ?> / night</h5>
									<?php if ($isLodge) { ?>
										<h5 class="subheader">Total No. of units: <?php echo $totalUnits; ?></h5>
									<?php } ?>
								<?php } ?>
							</hgroup>
							<?php foreach ($retreat->api_data->data as $data) { ?>
							<div class="retreat-listing__block__bvrr-stars" id="BVRRInlineRating-<?php echo $data->CategoryId; ?>"></div>
							<p class="retreat-listing__block__copy-description"><?php echo $data->Teaser; ?></p>
							<?php }?>
							<div class="btn-wrapper qv__mobile">
								<a href="<?php echo url('node/'.$retreat->nid); ?>" class="btn btn__transparent">Book Now</a>
								<a href="#0" class="btn btn__transparent nolink quickview" data-quickview-id="<?php echo $retreat->nid; ?>">Quick View</a>
							</div>
						</div>
						<?php
						try{
						    $bbtr = $wrapped_retreat->field_free_blue_bar_text->value();
							if (!empty($bbtr) && !is_null($bbtr))
							{
								echo '<span class="retreat-listing__block__blue-bar blue-bar">';
                                echo $bbtr;
                                echo '</span>';
                            } else {
                            	if ($exclude_retreat === false && !empty($blue_bar_destination_text)) {
	                            	echo '<span class="retreat-listing__block__blue-bar blue-bar">';
	                                echo $blue_bar_destination_text;
	                                echo '</span>';
                            	}
						    } ?>
						    <?php
						}catch(Exception $e){
						}
						    ?>
					</div>
					<?php $count++; }  ?>
				</div>
				<?php if($count > 9) {?>
				<div id="showMoreRetreats" class="btn btn__transparent retreat-listing__view-more <?php if ($count < 57) {echo 'retreat-listing__view-last';}?>">View More</div>
				<?php } ?>
			</div>
		</section>
		<?php } ?>
	</div>
	<!-- End retreat list -->
	<!-- Start Guide Elements -->
	<?php try {
	if(count($related_guide) > 0 ) {
		$related_guide = $wrapped_node->field_related_guide;
		?>
		<section class="guides-row js-carousel-parent" data-anchor="guide">
			<header class="subtitle content-listing__desktop-header">
				<h2 class="title heading heading-3">Your guide to <?php echo $node->title; ?></h2>
				<span class="underline"></span>
			</header>
			<?php if (count($related_guide) > 1 ) {?>
			<div class="guides-row__controls left js-carousel-prev"><span class="icon icon_arrow-left"></span></div>
			<div class="guides-row__controls right js-carousel-next"><span class="icon icon_arrow-right"></span></div>
			<?php } ?>
			<div class="wrapper js-carousel">
				<?php foreach($related_guide as $guide) {
						$title = $guide->title->value();
						$hero_image = nret_parse_image_url($guide->field_hero_image->value());
						$copy = $guide->field_guide_short_intro->value();
						$author = $guide->field_xplore_team_member;
						try {
							$author_name = $author->title->value();
							$author_img = nret_parse_image_url($author->field_member_photo->value());

						} catch (exception $e) {
							$author_name = '';
							$author_img = '';
						}
					?>
					<div class="guide-block">
						<div class="guide-block__inner">
							<div class="guide-block__copy">
								<div class="guide-block__avatar-wrapper">
									<div class="explore-team-block__avatar">
										<div class="inner" style="background:url('<?php echo file_create_url($author_img) ?>') center center no-repeat;background-size:cover;"></div>
									</div>
									<p class="guide-block__avatar-copy">Xplore Team<span> - <?php echo $author_name; ?></span></p>
								</div>
								<h4><?php echo $title; ?></h4>
								<p><?php echo $copy; ?></p>
								<a href="<?php echo url('node/'.$guide->nid); ?>" class="strike">View Guide<span class="side-arrow"></span></a>
							</div>
							<div class="guide-block__image" style="background:url('<?php echo $hero_image; ?>') center center no-repeat;background-size:cover;"></div>
						</div>
					</div>
				<?php } ?>
			</div>
			<!-- END JS CAROUSEL WRAPPER -->
		</section>
		<?php } } catch (Exception $e) {
				// Error catching
			} ?>
			<!-- ANOTHER -->
	<?php if (!empty($thingsToDo)) : ?>
	<section class="retreat-listing__activities" data-anchor="activities">
		<header class="subtitle content-listing__desktop-header">
			<h2 class="title heading heading-3">Activities & Experiences</h2>
			<span class="underline"></span>
		</header>
		<div class="flex image-on-image__intro-wrapper hide-block">
			<div class="image-on-image__intro-copy">
				<article class="inner list">
					<header>
						<h2 class="title heading heading-3">Top 5 Things To Do</h2>
						<span class="underline"></span>
					</header>
					<ul class="thingsToDo-list">
						<?php
						$thingsToDoMapArray = '';
						foreach ($wrapped_node->field_things_list as $todo) :
							$latitude = $todo->field_retreat_ttd_latitude->value();
							$longitude = $todo->field_retreat_ttd_longitude->value();
							$thingsToDoMapArray .= $latitude.','.$longitude.',';
						?>
							<li class="image-on-image__intro-copy__list-item">
								<h4><span class="long-dash"></span><?php echo $todo->field_things_to_do_title->value(); ?></h4>
								<p class="image-on-image__list-copy"><?php echo $todo->field_things_to_do_description->value(); ?></p>
							</li>
						<?php endforeach; ?>
					</ul>
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
	<?php endif; ?>
	<div class="flex content-grid__secondary quote">
		<?php foreach ($explorer_array as $explorer) : ?>
		<div class="content-grid__secondary__quote no-instagram">
			<aside class="quote-block">
				<div class="avatar-block">
					<div class="avatar-block__image">
						<div class="inner" style="background:url('<?php echo nret_parse_image_url($explorer->field_member_photo->value()); ?>') center center no-repeat;background-size:cover;"></div>
					</div>
					<div class="avatar-block__copy">
						<p class="avatar-block__copy__name">Xplore Team<span class="subheader">-<?php echo $explorer->title->value(); ?></span></p>
					</div>
				</div>
				<blockquote>
					<p class="quote"><?php echo $explorer->field_member_quote->value(); ?></p>
				</blockquote>
			</aside>
		</div>
		<?php endforeach; ?>
	</div>


		<?php if ( !empty($node->field_related_weddings_and_event) || !empty($sro_array) ) :
			if(count($wrapped_node->field_related_weddings_and_event) + count($wrapped_node->field_retreat_sro) > 1){
				$show_arrows = 'show-arrows';
			} else {
				$show_arrows = 'hide-arrows';
			}
			?>
		<div class="weddings-events__container js-carousel-parent" data-anchor="events">
			<div class="js-carousel-controls left js-carousel-prev <?php echo $show_arrows; ?>"><span class="icon icon_arrow-left"></span></div>
			<div class="js-carousel-controls right js-carousel-next <?php echo $show_arrows; ?>"><span class="icon icon_arrow-right"></span></div>
			<?php $contentEventCount = 1; ?>
			<?php if (!empty($node->field_related_weddings_and_event)) : ?>
			<div class="js-carousel">
				<?php foreach ($wrapped_node->field_related_weddings_and_event as $wedding_event) : ?>
					<div class="slick-wrapper">
						<section class="content-grid content-grid__event content-grid__event-<?php echo $contentEventCount; ?>">
							<div class="flex content-grid__event-wrapper">
								<div class="content-grid__event-copy">
									<article class="inner">
										<header class="subtitle content-listing__desktop-header">
											<h2 class="title heading heading-3"><?php echo $wedding_event->field_title->value(); ?></h2>
											<span class="underline"></span>
										</header>
										<header class="subtitle content-listing__mobile-header">
											<h2 class="title heading heading-3"><?php echo $wedding_event->field_title->value(); ?></h2>
											<span class="underline"></span>
										</header>
										<p><?php echo $wedding_event->field_copy->value(); ?></p>
										<div class="btn-wrapper">
											<a href="/weddings" class="btn btn__transparent">Learn More</a>
										</div>
									</article>
								</div>
								<div class="content-listing__image" style="background:url(<?php echo nret_parse_image_url($wedding_event->field_image->value()); ?>) center center no-repeat;background-size:cover;">
									<img src="<?php echo nret_parse_image_url($wedding_event->field_image->value()); ?>" alt="">
								</div>
							</div>
						</section>
					</div>
					<?php $contentEventCount++; ?>
				<?php endforeach; ?>
				<?php endif; ?>
				<?php if (!empty($sro_array)) : ?>
				<?php foreach ($wrapped_node->field_retreat_sro as $sro) : ?>
				<div class="slick-wrapper">
					<section class="content-grid content-grid__event content-grid__event-<?php echo $contentEventCount; ?>">
						<div class="flex content-grid__event-wrapper">
							<div class="content-grid__event-copy">
								<article class="inner">
									<header class="subtitle">
										<h2 class="title heading heading-3"><?php echo $sro->field_title->value(); ?></h2>
										<span class="underline"></span>
									</header>
									<p><?php echo $sro->field_long_description->value(); ?></p>
									<p><?php echo $sro->field_learn_more_cta->value(); ?></p>
								</article>
							</div>
							<div class="content-listing__image" style="background:url(<?php echo nret_parse_image_url( $sro->field_image->value()); ?>) center center no-repeat;background-size:cover;">
								<img src="<?php echo nret_parse_image_url( $sro->field_image->value()); ?>" alt="">
							</div>
						</div>
					</section>
				</div>
				<?php endforeach; ?>
				<?php endif; ?>
				</div>
		</div>
		<?php endif; ?>
		<?php
		try {
			$experiencesfromdestinations = $wrapped_node->field_related_experiences->value();
			if (!empty($experiencesfromdestinations)) : ?>
			<section class="retreat-listing__offers">
				<header class="hide-block">
					<h2 class="heading heading-3">Experiences</h2>
					<span class="underline"></span>
				</header>
				<div class="offers-row image-gallery-mobile hide-block">
					<?php foreach ($wrapped_node->field_related_experiences as $related_experience) : ?>
					<a href="<?php echo url('node/'.$related_experience->nid->value()); ?>" class="offers-block">
						<div class="offers-block__bg-image">
							<img src="<?php echo nret_parse_image_url($related_experience->field_image->value()); ?>" alt="">
						</div>
						<div class="offers-block__copy">
							<hgroup>
								<h3 class="title"><?php echo $related_experience->title->value(); ?></h3>
								<p class="subheader"><?php echo $related_experience->field_exp_from_price->value() ?> Per Person</p>
							</hgroup>
						</div>
					</a>
					<?php endforeach; ?>
				</div>
			</section>
		<?php endif; ?>
		<?php } catch (Exception $e) {
			//just casue it must be a catch in a try
		} ?>

		<?php
		$youtube = $wrapped_node->field_youtube_video->value();
		if (!empty( $youtube['video_id'])) :
			echo nret_youtube_show_player($youtube['video_id'],nret_parse_image_url($wrapped_node->field_youtube_thumbnail->value())); ?>
		<section class="youtube__mobile">
				<iframe width="320" height="315" src="https://www.youtube.com/embed/<?php echo $youtube['video_id']; ?>" frameborder="0" allowfullscreen></iframe>
		</section>
		<?php endif; ?>
		<!-- News BEGIN -->
		<?php if (!empty($node->field_journal_articles)) : ?>
		<section class="news-row" data-anchor="news">
			<header class="subtitle content-listing__mobile-header">
				<h2 class="title heading heading-3">News &amp; Features</h2>
				<span class="underline"></span>
			</header>
			<div class="inner hide-block">
				<?php foreach ($wrapped_node->field_journal_articles as  $journal_article) : ?>
				<div class="news-block">
					<div class="news-block__image">
						<time ><?php  echo date("M d", $journal_article->field_journal_date->value()); ?></time>
						<div class="image__large-wrapper">
						<a href="<?php echo  url('node/'.$journal_article->nid->value())?>">
							<img src="<?php echo  nret_parse_image_url($journal_article->field_hero_image->value()) ?>" alt="">
						</a>
						</div>
					</div>
					<div class="news-block__copy">
						<hgroup>
							<h5 class="title"><?php echo str_replace('_', ' ', $journal_article->field_journal_type->value()); ?></h5>
							<h3 class="title"><?php echo $journal_article->title->value(); ?></h3>
						</hgroup>
						<a href="<?php echo  url('node/'.$journal_article->nid->value())?>" class="strike">Read Article <span class="side-arrow"></span></a>
					</div>
				</div>
			<?php endforeach; ?>
			</div>
		</section>
		<?php endif; ?>

</section>

<?php foreach ($explorer_array as $xploremember) : ?>
<section class="about__explorer-modal about__explorer-modal-<?php echo $xploremember->nid->value(); ?>" >
	<div class="wrapper">
		<div class="inner">
		<div class="about__explorer-modal__close icon icon_close"></div>
			<div class="about__explorer-modal__introduction">
				<div class="explore-team-block__avatar">
					<div class="inner" style="background:url('<?php echo nret_parse_image_url($xploremember->field_member_photo->value()); ?>') center center no-repeat;background-size:cover;"></div>
				</div>
				<div class="about__explorer-modal__introduction__title">
					<header>
						<h3 class="title"><?php echo $xploremember->title->value(); ?></h3>
					</header>
					<h6 class="title"><?php try {echo $xploremember->field_destination->title->value().' <span class="long-dash"></span>';}catch(EntityMetadataWrapperException $emwe) {echo "";} ?> <?php echo $xploremember->field_member_title->value(); ?></h6>
				</div>
			</div>
			<div class="about__explorer-modal__copy">
				<div class="about__explorer-modal__copy__quote">
					<p><?php echo $xploremember->field_member_quote->value(); ?></p>
				</div>
				<p class="about__explorer-modal__copy__bio"><?php echo $xploremember->field_member_text_for_meet_link->value(); ?></p>
			</div>
		</div>
	</div>
</section>
<?php endforeach; ?>

<?php drupal_add_js('jQuery(document).ready(function () { nret.quickView.init();nret.destinationDetail.init(); });', 'inline'); ?>
