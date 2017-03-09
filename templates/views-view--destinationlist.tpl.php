<?php 
$page_title = variable_get('nret_destination_list_headline');
$retreat_count = $view->total_rows;

$heroimage = variable_get('nret_destination_list_hero_image',0);
if(!$heroimage)
{
    $url = 'https://images.unsplash.com/photo-1430263326118-b75aa0da770b?ixlib=rb-0.3.5&q=80&fm=jpg&s=ee3ee5b84e339f21e2ba68add9f118cf';
}else{
    $hero_object = file_load($heroimage);
    $url = nret_parse_image_url($hero_object);
}
?>

<section class="destination-listing">
	<div class="wrapper">
		<div class="destination-listing__hero-copy" style="background:url('<?php echo $url; ?>') center center no-repeat;background-size:cover;">
			<h1 class="title__caps"><?php echo $page_title; ?></h1>
		</div>
		<div class="filter-block subnav-container">
				<div class="filter__results-data">
					<hgroup>
						<h5>Showing</h5>
						<h3 class="title"><span id="filterResultsCount"></span> Results</h3>
						<span class="underline"></span>
					</hgroup>
				</div>
				<div class="filter__options-wrapper">
					<div class="filter__options-wrapper__filter-option">
						<p id="region-label" class="initGrow doNotClose">Region</p>
						<span class="icon icon_carrot-down"></span>
						<ul class="region-list filter__option__guests-list growMe open doNotClose">
							<li><a class="nolink strike filter-choice-init" href="#0" data-filter-choice="east">US East<span class="strike-through"></span></a><div class="arrow-up-destination-list"></div></li>
							<li><a class="nolink strike filter-choice-init" href="#0" data-filter-choice="west">US West<span class="strike-through"></span></a></li>
							<li><a class="nolink strike filter-choice-init" href="#0" data-filter-choice="coastal">US Coastal<span class="strike-through"></span></a></li>
							<li><a class="nolink strike filter-choice-init" href="#0" data-filter-choice="ukeu">UK/EU<span class="strike-through"></span></a></li>
						</ul>
					</div>
					<span class="filter-link-container">
						<div class="btn btn__transparent nolink strike filter__clear destination-listing__filter-clear">Reset</div>
					</span>
				</div>
			</div>
		<div class="destination-listing__toggle">
			<div class="btn-wrapper">
				<div id="destinationListingMapToggle" class="btn btn__blue destination-listing__toggle-btn">Map View</div>
				<div id="destinationListingListToggle" class="btn btn__transparent destination-listing__toggle-btn">List View</div>
			</div>
		</div>
		<section class="destination-listing__map">
			<?php 
				$thingsToDoMapArray = '';
				$firstMapCard = true;
				foreach ($view->result as $result) {
					$node = $result->_field_data['nid']['entity'];
					$title = $node->title;
					$region = $node->field_api_url_us_region[LANGUAGE_NONE][0]['value'];
					$description = $node->api_data->Summary;
					if($region == '') {$region = 'ukeu';}
					$g_region = $node->api_data->GeographicRegion;
					$lat = $node->api_data->Latitude;
					$lng = $node->api_data->Longitude;
					$id = $result->nid;
					$bg_image = $node->api_data->Image1;
					$thingsToDoMapArray .= $lat.','.$lng.','.$id.','.$region.',';
					$destinationUrl = url('node/'.$node->nid);
			?>
			<div class="map-card__container <?php if ($firstMapCard == true) {echo 'show';} ?>" data-destinationcard="<?php echo $id; ?>">
				<a href="<?php echo $destinationUrl; ?>" class="map-card">
					<div class="wrapper">
						<div class="map-card__close">
							<div class="map-card__close-container">
								<span class="icon icon_close"></span>
							</div>	
						</div>	
						<div  class="map-card__image" style="background:url('<?php echo $bg_image; ?>') center center no-repeat;background-size:cover;"></div>
						<div class="map-card__copy">
							<h2 class="title"><?php echo $title.', '.$g_region ?></h2>
							<?php if(isset($node->api_data->IsLodge) && $node->api_data->IsLodge == 'Y' && isset($node->api_data->RetreatsTotalUnits) && $node->api_data->RetreatsTotalUnits > 0){?>
							 <h4><?php echo $node->api_data->RetreatsTotalUnits; ?> 
                            	<?php if ( $node->api_data->RetreatsTotalUnits == 1) { echo 'Retreat'; } else {echo 'Retreats';} ?>
                            </h4>
                            <?php }else{ ?>
					   		<?php if ( !$propertyCount == 0 ) { ?>
                            <h4><?php echo $propertyCount; ?> 
                            	<?php if ( $propertyCount == 1) { echo 'Retreat'; } else {echo 'Retreats';} ?>
                            </h4>
                            <?php } }?>
							<p><?php echo nl2br($description); ?></p>
							<span>Explore Destination <span class="icon icon_arrow-right"></span></span>

						</div>
					</div>
				</a>	
			</div>	
			<?php $firstMapCard=false;} ?>
			<div class="destination-listing__map-wrapper">
				<div id="destinationListMap" class="map" data-lat="38.069417" data-lng="-116.566030" data-zoom="2" data-markers="[<?php echo rtrim($thingsToDoMapArray, ','); ?>]"></div>
			</div>
		</section>
		<section class="destination-listing__row">
			<?php 
				foreach ($view->result as $result) {
				    $node = $result->_field_data['nid']['entity'];
				    $title = $node->title;
				    // ACCESS FILTERS IN THIS SAME WAY
				    // 'Sleeps' $node->api_data->Sleeps;
				    // Environment $node->api_data->View; ARRAY
				    // Experiences $node->api_data->Experiences This is an array Each item has 1 key, 'Name';
					$region = $node->field_api_url_us_region[LANGUAGE_NONE][0]['value'];
					if($region == '') {
						$region = 'ukeu';
					}
				    $description = $node->api_data->Summary;
				    $fromPrice = (!empty($node->api_data->FromPrice) && !is_null($node->api_data->FromPrice))?$node->api_data->FromPrice:$node->api_data->destination_from_price;
				    $g_region = $node->api_data->GeographicRegion;
				    $propertyCount = $node->api_data->CategoryCount;
				    $image_1 = $node->api_data->Image1;
				    $image_2 = $node->api_data->Image2;
                    $experiences = implode(" ", array_map(function ($p) {return str_replace(" ", "-", $p); }, array_map('strtolower', $node->api_data->Experiences)));
                    $environments = implode(" ", array_map(function ($p) {return str_replace(" ", "-", $p); }, array_map('strtolower', $node->api_data->View)));
				    $destinationUrl = url('node/'.$node->nid);
            ?>
			<a href="<?php echo $destinationUrl; ?>" class="destination-listing__block hide-block filter-me <?php echo 'nid-'.$node->nid." "; $sleeps = ((isset($node->api_data->Sleeps) && is_numeric($node->api_data->Sleeps))?$node->api_data->Sleeps:0); for($i=1;$i<=$sleeps;$i++){ echo "sleeps-".$i." "; }; echo $experiences." "; echo $environments." ";echo $region; ?> ">
                <div class="destination-listing__copy">
				    <div class="wrapper">
                        <hgroup>
					   		<p  class="strike"><?php echo $title.', '.$g_region ?><span class="strike-through"></span></p>
					   		<?php if(isset($node->api_data->IsLodge) && $node->api_data->IsLodge == 'Y' && isset($node->api_data->RetreatsTotalUnits) && $node->api_data->RetreatsTotalUnits > 0){?>
                            <h3 class="title"><?php echo $node->api_data->RetreatsTotalUnits; ?> 
                            	<?php if ( $node->api_data->RetreatsTotalUnits == 1) { echo 'Retreat'; } else {echo 'Retreats';} ?>
                            </h3>
                            <?php }else{ ?>
					   		<?php if ( !$propertyCount == 0 ) { ?>
                            <h3 class="title"><?php echo $propertyCount; ?> 
                            	<?php if ( $propertyCount == 1) { echo 'Retreat'; } else {echo 'Retreats';} ?>
                            </h3>
                            <?php } }?>
		   				</hgroup>
		   				<p class="<?php if ( strlen($description) > 300 ) {echo 'fade-overflow '; echo strlen($description);} ?>"><?php echo nl2br($description); ?><span class="fade"></span></p>
		   				<?php if(!empty($fromPrice)) { ?>
		   				<span class="destination-listing__copy__price">Starting from <?php echo nret_get_currency($node->api_data->RegionId); ?><span class="price"><?php echo $fromPrice; ?></span>  / night</span>
		   				<?php } ?>
   					</div>
   				</div>
				<div class="destination-listing__image" style="background:url('<?php echo $image_2; ?>') center center no-repeat;background-size:cover;">
					<img src="<?php echo $image_1; ?>" alt="">
				</div>
				<div class="destination-listing__image" style="background:url('<?php echo $image_1; ?>') center center no-repeat;background-size:cover;"></div>
		    </a>
		    <?php 
					 }
			?>
			

		</section>
	</div>
</section>


<?php
	drupal_add_js('jQuery(document).ready(function () { nret.destinationListing.init(); });', 'inline');
?>