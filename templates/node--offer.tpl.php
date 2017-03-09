<?php

$wrapped_node = entity_metadata_wrapper('node',$node);

$title = $node->title;
$offer_type = $node->field_offer_type[LANGUAGE_NONE][0]['value'];
$offer_includes_array = $node->field_includes[LANGUAGE_NONE];
$offer_gallery_array = $node->field_gallery[LANGUAGE_NONE];
$long_paragraph = $wrapped_node->field_long_description->value();
$short_paragraph = $wrapped_node->field_short_description->value();

$offer_api = $node->api_data;


?>


<section class="offer-detail">
	<div class="wrapper">
		<div class="hero" style="background:url('<?php echo nret_parse_image_url($node->field_hero_image[LANGUAGE_NONE][0]) ?>') center center no-repeat;background-size:cover"></div>
		<section class="offer-detail__content">
			<section class="booking-widget stuck-hide">

				<div class="wrapper">
					<div class="booking-widget__above">
						<hgroup>
							<h3 class="title"><?php echo $title; ?></h3>
						</hgroup>
						<div class="booking-widget__anchor-links">
							<ul>
								<li><a class="anchor-link" data-link-source="overview" href="#0">Overview</a></li>
								<li><a class="anchor-link" data-link-source="about-retreat" href="#0">About the Retreat</a></li>
								<li><a class="anchor-link" data-link-source="gallery" href="#0">Gallery</a></li>
							</ul>
						</div>
					</div>
					<div class="booking-widget__below call-to-book">
						<div class="wrapper">
							<?php if ($node->field_offer_type[LANGUAGE_NONE][0]['value'] == 'package') { ?>
							<p class="subheader">Rates from $<?php foreach($offer_api->data as $offer) { echo $offer->BestPricePP;break;} ?> <span class="line"></span> per person </p>
							<?php } ?>
							<h3 class="title"><?php echo $node->field_offer_cta_text[LANGUAGE_NONE][0]['value']; ?></h3>
						</div>
					</div>
				</div>
			</section>
			<p class="intro intro__header" data-anchor="overview"><?php echo $short_paragraph; ?><span class="underline"></span></p>
			<p><?php echo nl2br($long_paragraph); ?></p>
			<?php if(!empty($offer_includes_array)) { ?>
			<section class="listing-map">
				<div class="listing-map__copy">
					<header>
						<h3 class="title">Includes</h3>
						<span class="underline"></span>
					</header>
					<ul>
						<?php foreach(  $offer_includes_array as $offer_include) {
							echo '<li>'.$offer_include['value'].'</li>';
						}?>
					</ul>
				</div>
			</section>
			<?php } ?>
			<?php $offer_api = $node->api_data;

			if( $node->field_offer_type[LANGUAGE_NONE][0]['value'] !== 'package' && !empty($offer_api->data) ) { ?>

			 <section class="package-rates-container" data-anchor="pricing">
				<header>
					<h3 class="title">Destination Rates</h3>
				</header>
			<?php foreach($offer_api->data as $rate) {
				if(!empty($rate->CategoryName)){ ?>
            <!--     <div class="package-breakdown">
                    <div class="package-breakdown__copy">
                        <h6 class="title"><?php echo $rate->CategoryName; ?></h6>
                        <p class="package-breakdown__price">from $<span><?php echo $rate->DiscountRate; ?></span></p>
                    </div>
                </div> -->
                <?php } } ?>

			</section>
			 <?php } ?>
			<?php if(!empty($node->field_about_the_retreat_copy)) { ?>
			 <section class="offer-detail__retreat-summary" data-anchor="about-retreat">
			 	<header>
					<h3 class="title">About the Retreat</h3>
					<span class="underline"></span>
				</header>
				<p><?php echo $node->field_about_the_retreat_copy[LANGUAGE_NONE][0]['value']; ?></p>
				<?php
					$learn_more = $wrapped_node->field_offer_cta_learn_more->value();
				if (!empty($learn_more)) {?>
					<a href="<?php echo $learn_more; ?>" class="btn btn__blue btn__lrn">Learn More</a>
				<?php } ?>
			 </section>
			 <?php } ?>
			<?php if( !empty($node->field_gallery[LANGUAGE_NONE] ) ) { ?>
			<div class="offer-detail__image-gallery" data-anchor="gallery">
				<section class="image-gallery__parent">
					<div class="image-gallery__navigation">
						<div class="image-gallery__navigation-left"></div>
						<div class="image-gallery__navigation-right"></div>
					</div>
					<div class="image-gallery__photographer">
						<div class="inner image-gallery-photographer">
							<?php foreach ($offer_gallery_array as $title) {
								$title = $title['title'];
								echo '<p>'.$title.'</p>';
							}?>
						</div>
					</div>
					<div class="image-gallery">
						<?php
							foreach( $offer_gallery_array as $image ) {
								$alt = $image['alt'];
								$image_url = nret_parse_image_url($image);
								echo '<div class="image-gallery-image-wrapper">';
										echo '<img src="'.$image_url.'" alt="'.$alt.'">';
								echo '</div>';
							}
						?>
					</div>
				</section> <!-- End image Gallery -->
			</div>
			<?php } ?>
		</section> <!-- End Offer detail Content  -->
	</div>
</section>
