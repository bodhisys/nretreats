<?php
$wrapped_node = entity_metadata_wrapper('node',$node);
$related_experiences_array = $wrapped_node->field_exp_related_experiences;
$pricing_table = $wrapped_node->field_pricing_table->value();
$gallery_obj = $wrapped_node->field_image_gallery->value();
?>
<section class="experience content-start">
	<div class="wrapper">
		<div class="hero" style="background:url('<?php echo nret_parse_image_url($wrapped_node->field_image->value()); ?>') center center no-repeat;background-size:cover"></div>
		<section class="booking-widget stuck-hide">
				<div class="wrapper">
					<div class="booking-widget__above">
						<hgroup>
							<h3 class="title"><?php echo $wrapped_node->title->value(); ?></h3>
						</hgroup>
						<div class="booking-widget__anchor-links">
							<ul>
								<li><a class="anchor-link" data-link-source="overview" href="#0">Overview</a></li>
								<?php  if (!empty($pricing_table ) ) { ?>
								<li><a class="anchor-link" data-link-source="pricing" href="#0">Pricing</a></li>
								<?php } ?>
								<?php if (!empty($gallery_obj)) { ?>
								<li><a class="anchor-link" data-link-source="gallery" href="#0">Gallery</a></li>
								<?php } ?>
							</ul>
						</div>
					</div>
					<div class="booking-widget__below call-to-book">
						<div class="wrapper">
							<p class="subheader">Starting from <?php echo $wrapped_node->field_exp_from_price->value(); ?><span class="line"></span> per person </p>
							<h3 class="title"><?php echo $wrapped_node->field_retreat_call_to_book_copy->value(); ?></h3>
						</div>
					</div>
				</div>
			</section>
			<section class="experience-details" data-anchor="overview">
				<article class="experience-details__copy">
					<p class="intro"><?php echo $wrapped_node->field_short_description->value(); ?></p>
					<?php if(!is_null( $wrapped_node->field_long_description->value() ) ) { ?>
					<div class="paragraph"><?php echo $wrapped_node->field_long_description->value(); ?></div>
					<?php } ?>
				</article>




				<?php  if (!empty($pricing_table ) ) { ?>
				<section class="pricing-container" data-anchor="pricing">
					<header>
						<h3 class="title">Pricing</h3>
					</header>
					<?php foreach( $wrapped_node->field_pricing_table as $pricing) { ?>
						<div class="price-breakdown"><h6 class="title"><?php echo $pricing->field_exp_pricing_item->value(); ?></h6><span class="price">$<?php echo $pricing->field_exp_pricing_price->value(); ?></span></div>
					<?php } ?>
				</section>
				<?php } ?>
				<?php

					if (!empty($gallery_obj)) { ?>
				<section class="image-gallery__parent hide-block" data-anchor="gallery">
				<div class="image-gallery__navigation">
					<div class="image-gallery__navigation-left"></div>
					<div class="image-gallery__navigation-right"></div>
				</div>
				<div class="image-gallery__photographer">
					<div class="inner image-gallery-photographer">
					<?php  foreach ($wrapped_node->field_image_gallery as $image) { ?>
							<p><?php echo $image->field_image_caption->value() ; ?></p>
					<?php } ?>
					</div>
				</div>

				<div class="image-gallery">
					<?php  foreach ($wrapped_node->field_image_gallery as $image) { ?>
							<div class="image-gallery-image-wrapper">
								<img src="<?php echo nret_parse_image_url($image->field_image->value()); ?>" alt="">
							</div>
					<?php } ?>
				</div>
			</section>
			<?php } ?>

			<?php
				$youtube = $wrapped_node->field_youtube_video->value();
			if ( !empty( $youtube['video_id']) ) {
				echo nret_youtube_show_player($youtube['video_id'],nret_parse_image_url($wrapped_node->field_youtube_thumbnail->value())); ?>

			 <section class="youtube__mobile">
					<iframe width="320" height="315" src="https://www.youtube.com/embed/<?php echo $youtube['video_id']; ?>" frameborder="0" allowfullscreen></iframe>
			</section>

		<?php      }  ?>

			<?php if(!is_null($related_experiences_array->value() )) { ?>
			<section class="experience__related-experiences">
				<header class="animated hide-block">
					<h3 class="title">Related Experiences</h3>
					<span class="underline"></span>
				</header>

				<div class="related-row hide-block image-gallery-mobile">
					<?php foreach( $related_experiences_array as $related ) { ?>
					<div class="related-block">
						<a href="<?php echo url('node/'.$related->nid->value()); ?>" class="related-block__image">
							<img src="<?php echo nret_parse_image_url($related->field_image->value()); ?>" alt="">
						</a>
						<div class="related-block__copy">
							<p><?php echo $related->title->value(); ?></p>
						</div>
					</div>
					<?php } ?>
				</div>
			</section>
			<?php } ?>
		</section>
	</div>
</section>
<?php try{
foreach ($wrapped_node->field_exp_locations->field_xplore_team_members as $member) { ?>
	<section class="about__explorer-modal about__explorer-modal-<?php echo $member->nid->value(); ?>" >
		<div class="wrapper">
			<div class="inner">
				<div class="about__explorer-modal__close icon icon_close"></div>
				<div class="about__explorer-modal__introduction">
					<div class="explore-team-block__avatar">
						<div class="inner" style="background:url('<?php echo nret_parse_image_url( $member->field_member_photo->value() ); ?>') center center no-repeat;background-size:cover;"></div>
					</div>
					<div class="about__explorer-modal__introduction__title">
						<header>
							<h3 class="title"><?php echo $member->title->value(); ?></h3>
						</header>
						<h6 class="title"><?php try {echo $member->field_destination->title->value().' <span class="long-dash"></span>';}catch(EntityMetadataWrapperException $emwe) {echo "";} ?> <?php echo $member->field_member_title->value(); ?></h6>
					</div>
				</div>
				<div class="about__explorer-modal__copy">
					<div class="about__explorer-modal__copy__quote">
						<p><?php echo $member->field_member_quote->value(); ?></p>
					</div>
					<p class="about__explorer-modal__copy__bio"><?php echo $member->field_member_text_for_meet_link->value(); ?></p>
				</div>
			</div>
		</div>
	</section>

				<?php    }
				}catch (Exception $e){} ?>
