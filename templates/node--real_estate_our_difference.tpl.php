<?php
$wrapped_node = entity_metadata_wrapper('node', $node);
?>
<article class="real-estate-our-differences" data-node-id="<?php echo $wrapped_node->nid->value(); ?>">
	<?php
	$field_re_header = $wrapped_node->field_re_header->value();
	$field_re_text_color = $wrapped_node->field_re_text_color->value();
	$field_re_image_url = nret_parse_image_url($wrapped_node->field_re_image->value());
	?>
	<header
		class="real-estate-hero<?php if ($field_re_text_color) echo ' real-estate-hero--' . $field_re_text_color; ?>"
		style="background-image: url('<?php echo $field_re_image_url; ?>');"
	>
		<div class="real-estate-hero__text">
			<h1 class="title__caps"><?php echo $field_re_header; ?></h1>
		</div>
	</header>
	<div class="real-estate-content">
		<?php
		$field_reod_os_paragraph_1 = $wrapped_node->field_reod_os_paragraph_1->value();
		$field_reod_os_pull_quote = $wrapped_node->field_reod_os_pull_quote->value();
		$field_reod_os_paragraph_2 = $wrapped_node->field_reod_os_paragraph_2->value();
		?>
		<section class="real-estate-our-differences-summary">
			<header>
				<h2 class="heading">Our Story</h2>
			</header>
			<div class="content">
				<p class="p1"><?php echo $field_reod_os_paragraph_1; ?></p>
				<blockquote><?php echo $field_reod_os_pull_quote; ?></blockquote>
				<p class="p2"><?php echo $field_reod_os_paragraph_2; ?></p>
			</div>
		</section>

		<?php
		$field_reod_oa_subcopy = $wrapped_node->field_reod_oa_subcopy->value();
		$field_rep_ig_gallery = $wrapped_node->field_rep_ig_gallery;
		if (!empty($field_rep_ig_gallery)) :
		?>
		<section class="real-estate-our-differences-approach">
			<header>
				<h2 class="heading">Our Approach</h2>
				<p><?php echo $field_reod_oa_subcopy; ?></p>
			</header>
			<div class="content real-estate-carousel real-estate-carousel--a">
				<div class="real-estate-carousel__container">
					<?php
					foreach ($field_rep_ig_gallery as $index => $our_difference_gallery_image) :
						$field_rep_fc_ga_title = $our_difference_gallery_image->field_rep_fc_ga_title->value();
						$field_rep_fc_ga_caption = $our_difference_gallery_image->field_rep_fc_ga_caption->value();
						$field_rep_fc_ga_image_url = nret_parse_image_url($our_difference_gallery_image->field_rep_fc_ga_image->value());
					?>
						<div class="real-estate-carousel__item<?php if ($index === 0) echo ' active'; ?>">
							<div class="image">
								<img
								src="<?php echo $field_rep_fc_ga_image_url; ?>"
								alt="<?php echo $field_rep_fc_ga_title; ?>"
								>
							</div>
							<div class="text">
								<h2 class="heading"><?php echo $field_rep_fc_ga_title; ?></h2>
								<p><?php echo $field_rep_fc_ga_caption; ?></p>
							</div>
						</div>
					<?php endforeach; ?>
				</div>
				<?php if (count($field_rep_ig_gallery) > 1) : ?>
				<div class="real-estate-carousel__controls">
					<button type="button" class="real-estate-carousel__previous"><div class="icon icon--arrow-left"></div></button>
					<div class="real-estate-carousel__pagination">
						<?php foreach ($field_rep_ig_gallery as $index => $our_difference_gallery_image) : ?>
							<button type="button" <?php if ($index === 0) echo 'class="active"'; ?>><div class="icon icon--arrow-left"></div></button>
						<?php endforeach; ?>
					</div>
					<button type="button" class="real-estate-carousel__next"><div class="icon icon--arrow-right"></div></button>
				</div>
				<?php endif; ?>
			</div>
		</section>
		<?php endif; ?>

		<?php
		$field_reod_ol_subcopy = $wrapped_node->field_reod_ol_subcopy->value();
		$field_reod_ol_points = $wrapped_node->field_reod_ol_points->value();
		if (!empty($field_reod_ol_points)) :
		?>
		<section class="real-estate-our-differences-locations">
			<header>
				<h2 class="heading">Our Locations</h2>
				<p><?php echo $field_reod_ol_subcopy; ?></p>
			</header>
			<div class="content">
				<div id="our-differences-map"></div>
				<ul class="our-differences-map-locations">
					<?php
					foreach ($wrapped_node->field_reod_ol_points as $our_differences_location_index => $our_differences_location) :
						$field_rec_fc_mp_map_lattitude = $our_differences_location->field_rec_fc_mp_map_lattitude->value();
						$field_rec_fc_mp_map_longitude = $our_differences_location->field_rec_fc_mp_map_longitude->value();
						$field_reod_fc_ol_points_title = $our_differences_location->field_reod_fc_ol_points_title->value();
						$field_reod_fc_ol_points_image_url = nret_parse_image_url($our_differences_location->field_reod_fc_ol_points_image->value());
						$field_reod_fc_ol_comunity_page = $our_differences_location->field_reod_fc_ol_comunity_page;
						$field_reod_fc_ol_destination = $our_differences_location->field_reod_fc_ol_destination;
					?>
						<li class="our-differences-map-locations-item<?php if ($our_differences_location_index === 0) echo ' active'; ?>"
							data-latitude="<?php echo $field_rec_fc_mp_map_lattitude; ?>"
							data-longitude="<?php echo $field_rec_fc_mp_map_longitude; ?>"
						>
							<div class="text">
								<img src="/themes/nretreats/images/real-estate/google-maps-marker-active.png" class="marker-icon" alt="Natural Retreats Real Estate" />
								<h3><?php echo $field_reod_fc_ol_points_title; ?></h3>
								<?php if (!empty($field_reod_fc_ol_comunity_page) || !empty($field_reod_fc_ol_destination)) : ?>
									<div class="label-view">View</div>
									<?php
									if ($field_reod_fc_ol_comunity_page->value()) :
										$field_reod_fc_ol_comunity_page_title = $field_reod_fc_ol_comunity_page->title->value();
										$field_reod_fc_ol_comunity_page_url = url('node/' . $field_reod_fc_ol_comunity_page->nid->value());
									?>
										<a href="<?php echo $field_reod_fc_ol_comunity_page_url; ?>" target="_blank" class="strike">
											Real Estate Community <span class="side-arrow"></span>
										</a>
									<?php endif; ?>
									<?php
									if ($field_reod_fc_ol_destination->value()) :
										$field_reod_fc_ol_destination_title = $field_reod_fc_ol_destination->title->value();
										$field_reod_fc_ol_destination_url = url('node/' . $field_reod_fc_ol_destination->nid->value());
									?>
										<a href="<?php echo $field_reod_fc_ol_destination_url; ?>" target="_blank" class="strike">
											Vacation Rental <span class="side-arrow"></span>
										</a>
									<?php endif; ?>
								<?php endif; ?>
							</div>
							<div class="image">
								<img
									src="<?php echo $field_reod_fc_ol_points_image_url; ?>"
									alt="<?php echo $field_reod_fc_ol_points_title; ?>"
								/>
							</div>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
		</section>
		<?php endif; ?>
	</div>
</article>
<?php drupal_add_js('jQuery(document).ready(function () { nret.realEstateOurDifferences.init(); });', 'inline'); ?>
