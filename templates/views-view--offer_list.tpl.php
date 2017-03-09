<section class="offer-listing">
	<div class="wrapper">
	<?php 
       $heroimage = variable_get('nret_offer_list_hero_image',0);
       if(!$heroimage)
       {
           $url = 'https://images.unsplash.com/photo-1430263326118-b75aa0da770b?ixlib=rb-0.3.5&q=80&fm=jpg&s=ee3ee5b84e339f21e2ba68add9f118cf';
       }else{
           $hero_object = file_load($heroimage);
           $url = nret_parse_image_url($hero_object);
       }
	?>
		<div class="offer-listing__hero"  style="background:url('<?php echo $url; ?>') center center no-repeat;background-size:cover;">
			<div class="offer-listing__hero-copy">
				<hgroup>
					<h1 class="title__caps"><?php echo variable_get('nret_offer_list_headline','Special Offers & Packages'); ?></h1>
					<p class="intro"><?php echo variable_get('nret_offer_list_bodycopy','Our Xplore team is here to help you find the best value for your stay. To find out more about any of our offers and packages <a href="mailto:example@example.com?subject=Hi">contact us</a> today.'); ?></p>
				</hgroup>
			</div>
		</div>
		<section class="offer-listing__content">
			<div class="offers-row">
				<?php foreach ($view->result as $result) {
					$node = $result->_field_data['nid']['entity'];
					$title = $node->title;
					$offer_type = $node->field_offer_type[LANGUAGE_NONE][0]['value'];
					$offer_cta = $node->field_offer_cta_text[LANGUAGE_NONE][0]['value'];
					$offer_image_url = nret_parse_image_url($node->field_hero_image[LANGUAGE_NONE][0]);
					$offer_url = url('node/'.$node->nid);
					$offer_region_id = $node->field_nres_region_id[LANGUAGE_NONE][0]['value'];
			 ?>
				<a href="<?php echo $offer_url; ?>" class="offers-block">
					<div class="offers-block__bg-image">
						<img src="<?php echo $offer_image_url; ?>" alt="">
					</div>
					<div class="offers-block__copy">
					<hgroup>
						<h5 class="title"><?php echo $offer_type; ?> Offer</h5>
						<h3 class="title"><?php echo $title; ?></h3>
						<p class="subheader"><?php echo $offer_cta; ?></p>
					</hgroup>
					</div>
				</a>
				<?php } ?>
				
			</div>
			<!-- <a href="#0" class="btn btn__transparent nolink">View More</a> -->
		</section>
	</div>
</section>