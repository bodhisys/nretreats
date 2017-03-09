<?php

// foreach ($view->result as $result) {
// 	// DESTINATION
//     foreach ($result->retreats as $retreat) {
//     	echo "<br>-------------------------BREAK------------------------------<br>";
//         $wrapped_retreat = $retreat->drupalData;
//     	pr($retreat->CategoryId);
//     	pr($retreat);
//         echo "<li>&nbsp;-&nbsp;".$retreat->CategoryName."<li>";
//         pr(nret_parse_image_url( $wrapped_retreat->field_hero_image->value() ));
//         die();
//     }
// }
// in case you need to see the whole info in the array, you can as always do:
// pr($view->result);
// nret_get_currency($retreat_destination_regionId[$home_retreat->nid->value()]);

$userglobalposition = nret_get_usergloballocation(isset($node)?$node:null);

if ($view->resultfound === true) {
	$retreat_count = 0;
	foreach ($view->result as $result) {
		foreach($result->retreats as $retreat) {
			$retreat_count++;
		}
	}
} else {
	$retreat_count = 'No';
}

$amenities = $view->nres_filters;
$amenities = $amenities->data;
$amenities = $amenities->Amenities;

$areas = $view->SubAreas;


$destinations_subnav_list = nret_get_destinations();
?>

<section id="retreat-search">
	<div class="wrapper">
		<div class="bg"></div>
        <div class="btn__transparent initMobileSearchDates btn">Filter Retreats</div>
		<h2 class="title mobile-results"><?php echo $retreat_count;?> Results</h2>
        <?php
        if (!$node->truezero ) { ?>
		<script type="text/template" id="mbl-search">
			<div class="mbl-search-menu-title">EXPLORE DESTINATIONS</div>
			<div class="mbl-search-menu">
				<div class="options">
					<a class="navigate" href='/destination'><span>EXPLORE</span></a> <a class='date active' href=''><span>Filter Retreats</span></a>
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
						<span class="intro">Check-In: <span class="entry"></span></span><span class="icon icon_carrot-down"></span>
						<div class="calendar checkIn"></div>
					</div>
					<div class="select-box cal checkOut">
						<span class="intro">Check-Out: <span class="entry"></span></span><span class="icon icon_carrot-down"></span>
						<div class="calendar checkOut"></div>
					</div>
					<div class="select-box guests">
						<span class="intro">Guests: <span class="entry"></span></span><select class="guests" name="iama">
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
						<span class="intro">Bedrooms: <span class="entry"></span></span><select class="bedrooms" name="iama">
						<option></option>
						<option value="1">1+</option>
						<option value="2">2+</option>
						<option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                        <option value="6">6+</option>
						</select><span class="icon icon_carrot-down"></span>
					</div>
					<a class="start-exploring explore destinationFilterRefresh" href="#">Filter Retreats</a>
					<a class="start-exploring explore destinationFilterClear" href="#">Clear Filter</a>
				</section>
			</div>
		</script>
        <?php } ?>

		<div class="filter-block subnav-container scroll-to-search">
			<div class="filter-block__wrapper">
				<div class="filter__results-data">
					<hgroup>
						<h2 class="title"><?php echo $retreat_count; ?> Results</h2>
					</hgroup>
                    <div class="btn__transparent initMobileSearchDates btn">Filter Retreats</div>
				</div>
				<div class="filter__options-wrapper">
					<div class="filter__options-wrapper__filter-option">
						<p id="destination-label" class="doNotClose" >Destination</p>
						<span class="icon icon_carrot-down"></span>
					</div>
					<div class="filter__options-wrapper__filter-option cal">
						<span class="label checkin-sublabel">CHECK IN</span>
						<p for="check-in" class="checkin-label input-label doNotClose">Check In</p>
						<span class="icon icon_carrot-down"></span>
						<div class="input-container open doNotClose">
							<div class="arrow-up-destination-list"></div>
							<div class="home__search__calendar home__search__calendar-in" id="bookingCheckIn"></div>
						</div>
					</div>
					<div class="filter__options-wrapper__filter-option cal">
						<span class="label checkout-sublabel">CHECK OUT</span>
						<p for="check-out" class="checkout-label input-label doNotClose">Check Out</p>
						<span class="icon icon_carrot-down"></span>
						<div class="input-container open doNotClose">
							<div class="arrow-up-destination-list"></div>
							<div class="home__search__calendar home__search__calendar-in" id="bookingCheckOut"></div>
						</div>
					</div>
					<div class="filter__options-wrapper__filter-option">
						<p id="bedroom-label" class="bedroom-label initGrow">Bedrooms</p>
						<span class="icon icon_carrot-down"></span>
						<ul class="guest-list filter__option__guests-list open growMe single-choice-list filter-choice-one-wrapper">
							<li><a class="strike nolink filter-choice-one" data-more-filter-bedrooms="1" href="#0">1</a>
								<div class="arrow-up-destination-list"></div>
							</li>
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
				<div class="global-nav__destinations__destination-list-wrapper growMe doNotClose open">
					<div class="arrow-up-destination-list"></div>
					<div class="wrapper">
						<div class="global-nav__destination-list east <?php if ( $userglobalposition !== 'uk' && $userglobalposition !== 'ie' ) { echo 'current'; } ?>">
							<header>
								<h6 class="title">US EAST</h6>
								<span class="underline"></span>
							</header><!-- /header -->
							<ul class="sort-list  <?php if ($userglobalposition == 'useast') {echo 'current';} ?> group<?php echo (count($node->destinations["east"]) < 5 ? ' centralized' : ''); ?>">
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
						<div class="global-nav__destination-list uk <?php if ( $userglobalposition == 'uk' || $userglobalposition == 'ie' ) { echo 'current'; } ?>" >
							<header>
								<h6 class="title">UK / EUROPE</h6>
								<span class="underline"></span>
							</header><!-- /header -->
							<ul class="sort-list <?php if ($userglobalposition == 'uk' || $userglobalposition == 'ie') {echo 'current';} ?> group<?php echo (count($node->destinations["notus"]) < 5 ? ' centralized' : ''); ?>">
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
				<div class="filter__more-options-wrapper open growMeMore doNotClose">
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
							<?php if ( isset($areas) && !empty($areas)) { ?>
							<div class="filter__more__block">
								<header>
									<h6 class="title">Area</h6>
								</header>
								<ul class="filter-choice-one-wrapper">
								   <?php foreach($areas as $key => $value) { ?>
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
							<div class="btn btn__blue initHomeRetreatSearch">Apply</div>
						</div>
					</div>
				</div>
				 <div class="filter__more__block filter__apply-filter">
					<div class="btn btn__blue initHomeRetreatSearch">Apply</div>
				</div>
			</div>
		</div>

		<div class="retreat-search__result-wrapper">
			<div class="funky-bg"></div>
			<?php
			if ( $view->resultfound === true ) {
                $sorted_retreats_by_bedrooms = array();
    			foreach ($view->result as $result) {$wrapped_retreat = $retreat->drupalData;
                    //create new results object with all retreats so it can be sorted, and insert the destination name with each result
                    foreach($result->retreats as $retreat) {
                        $retreat_obj = array("DestinationName" => $result->DestinationName, "RegionId" => $result->RegionId, "retreat" => $retreat);
                        array_push($sorted_retreats_by_bedrooms, $retreat_obj);
                    }
                }

                //array sorted by increasing bedrooms
                function bedroom_sort($a, $b) {
                    $a_retreat = $a['retreat'];
                    $b_retreat = $b['retreat'];
                    if($a == $b) {
                        return 0;
                    }
                    return ($a_retreat->Bedrooms < $b_retreat->Bedrooms) ? -1 : 1;
                }

                usort($sorted_retreats_by_bedrooms, 'bedroom_sort');
                //display the sorted list
                ?>
                <div class="container">
                    <div class="too-many-results hide">
                        <h3>Too many retreats?</h3>
                        <p>
                            Try using the filters above to refine your search.
                        </p>
                    </div>
                    <div class="retreats-search-results results-container">
                        <?php foreach ($sorted_retreats_by_bedrooms as $retreat_data) {
                            $retreat = $retreat_data['retreat'];
                            $destination_detail = $retreat_data['DestinationName'];
							$region_id = $retreat_data['RegionId'];
                            $wrapped_retreat = $retreat->drupalData;
                            ?>
                            <div class="retreat-listing__block-small hide">
                                <a href="<?php echo url('node/'.$wrapped_retreat->nid->value()); ?>" class="retreat-listing__block__image" style="background:url('<?php echo nret_parse_image_url( $wrapped_retreat->field_hero_image->value() ); ?> ') center center no-repeat;background-size:cover;"></a>
                                <div class="destination-detail"><?php echo $destination_detail; ?></div>
                                <div class="retreat-listing__block__copy">
                                    <hgroup>
                                        <h4><a href="#0" title=""><?php echo $retreat->CategoryName; ?></a></h4>
                                        <h5 class="subheader">Sleeps <?php echo $retreat->Sleeps;?> <span class="long-dash"></span>Starting from <?php echo nret_get_currency($region_id) . $retreat->FromPrice; ?> / night</h5>
                                    </hgroup>
                                    <p class="retreat-listing__block__copy-description"><?php echo $retreat->Teaser; ?></p>
                                    <div class="btn-wrapper qv__mobile">
                                        <a href="<?php echo url('node/'.$wrapped_retreat->nid->value()); ?>" class="btn btn__transparent">Book Now</a>
                                        <a href="<?php echo url('node/'.$wrapped_retreat->nid->value()); ?>" class="btn btn__transparent nolink quickview" data-quickview-id="<?php echo $retreat->CategoryId; ?>">Quick View</a>
                                    </div>
                                </div>
                            </div>
                            <?php }?>
                        </div>

                        <a href="#0" class="retreat-view-more btn btn__blue">View More</a>
                </div>

            <?php } else {
			//in case you need to see the whole info in the array, you can as always do:
			//pr($view->result);

			?>
			<div class="container">
				 <div class="retreat-search__no-results">
	            	<h3>Are Your Dates Flexible?</h3>
	            	<h4>Explore one of these popular homes below.</h4>
	            	<div class="no-results-link">
	            		<a href="/destination">See All Destinations<span class="side-arrow"></span></a>
	            		<a id="initEnquiry" class="doNotClose" href="#0">Submit Enquiry<span class="side-arrow"></span></a>
	            	</div>
					 <div class="results-container image-gallery-mobile">
		                <?php foreach ($view->result as $result) {
		                	foreach ($result->retreats as $retreat) {
				        $wrapped_retreat = $retreat->drupalData; ?>
			        		<div class="retreat-listing__block-small">
								<a href="<?php echo url('node/'.$wrapped_retreat->nid->value()); ?>" class="retreat-listing__block__image" style="background:url('<?php echo nret_parse_image_url( $wrapped_retreat->field_hero_image->value() ); ?> ') center center no-repeat;background-size:cover;"></a>
								<div class="retreat-listing__block__copy">
									<hgroup>
										<h4><a href="#0" title=""><?php echo $retreat->CategoryName; ?></a></h4>
										<h5 class="subheader">Sleeps <?php echo $retreat->Sleeps;?> <span class="long-dash"></span>Starting from $<?php echo $retreat->FromPrice; ?> / night</h5>
									</hgroup>
									<p class="retreat-listing__block__copy-description"><?php echo $retreat->Teaser; ?></p>
									<div class="btn-wrapper qv__mobile">
										<a href="<?php echo url('node/'.$wrapped_retreat->nid->value()); ?>" class="btn btn__transparent">Book Now</a>
										<a href="<?php echo url('node/'.$wrapped_retreat->nid->value()); ?>" class="btn btn__transparent nolink quickview" data-quickview-id="<?php echo $retreat->CategoryId; ?>">Quick View</a>
									</div>
								</div>
							</div>
					    <?php } }?>
				    </div>
			</div>
			<?php } ?>
			<!-- <div class="retreat-search__more">
		        <h3>Want to see more destinations?</h3>
		        <p>Explore our destinations and start planning your next trip today.</p>
		        <a href="/destination" class="btn btn__blue">See Destinations</a>
			</div> -->
	</div>
</section>
<aside class="retreat-detail__enquiry-window open">
	<div class="wrapper">
		<div class="enquiry__container doNotClose">
			<header>
				<h3 class="title">Submit an Enquiry</h3>
			</header>
			<div class="enquiry__close btn__close"><span class="text">Close&nbsp;</span><span class="icon icon_close"></span></div>
			<form id="retreatEnquiryForm" class="retreat-detail__enquiry-form" action="retreat-enquiry.php">
				<div class="input-row">
					<div class="cal-wrapper">
						<input id="retreatEnquiryCheckIn" class="calendarInit" type="text" name="CHECK_IN" value="" placeholder="Check-In" readonly="true"> <span class="icon icon_carrot-down"></span>
					</div>
					<div class="cal-wrapper">
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
<?php

foreach ($view->result as $result) {
	// DESTINATION
    foreach ($result->retreats as $retreat) {
    	$wrapped_retreat = $retreat->drupalData;

?>
<script type="text/template" id="quickview-modal-<?php echo $retreat->CategoryId; ?>">
<section class="quickview-modal quickview-modal-<?php echo $retreat->CategoryId; ?>">
    <div class="wrapper">
        <div class="quickview__copy-block">
            <hgroup>
                <h3 class="title"><?php echo $retreat->CategoryName; ?></h3>
               <h5 class="subheader">Sleeps <?php echo $retreat->Sleeps; ?> <span class="long-dash"></span> from <?php echo $retreat->FromPrice; ?></h5>
            </hgroup>
            <p><?php echo $retreat->Teaser; ?></p>
            <a href="<?php echo url('node/'.$wrapped_retreat->nid->value()); ?>" class="btn btn__transparent">Book Now</a>
            <?php if($retreat->Latitude) { ?>

	            <div class="quickview__copy-block__map">
	                <div class="quickview__copy-block__map-inner">
	                    <div style="width:300px;height:300px;"id="quickview-map-<?php echo $retreat_destination_regionId[$retreat->CategoryId]; ?>" class="quickview-map map" data-lat="<?php echo $retreat->Latitude; ?>" data-lng="<?php echo $retreat->Longitude; ?>" data-markers="[<?php echo $retreat->Latitude; ?>, <?php echo $retreat->Longitude; ?>]"></div>
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
            	<?php if(!is_null($wrapped_retreat->field_quote_image->value())) {?>
            	<div class="quickview__image">
                    <img src="<?php echo nret_parse_image_url($wrapped_retreat->field_quote_image->value()); ?>" alt="">
                </div>
                <?php } ?>
            </div>
        </div>
    </div>
</section>
</script>
<?php }} ?>


<?php drupal_add_js('jQuery(document).ready(function () { nret.quickView.init();nret.destinationDetail.init(); nret.page_retreatSearch.init();});', 'inline'); ?>
