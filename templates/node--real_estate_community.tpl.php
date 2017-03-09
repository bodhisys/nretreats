<?php
$wrapped_node = entity_metadata_wrapper('node', $node);

$query = new EntityFieldQuery();
$query->entityCondition('entity_type', 'node')
	->entityCondition('bundle', 'real_estate_property')
	->propertyCondition('status', 1);
$result = $query->execute();
$real_estate_community_properties = array();
if (!empty($result['node'])) {
	$real_estate_properties_nids = array_keys($result['node']);
	foreach ($real_estate_properties_nids as $nid) {
		$property_node = node_load($nid, NULL, TRUE);
		$wrapped_property_node = entity_metadata_wrapper('node', $property_node);
		$field_rep_communities = $wrapped_property_node->field_rep_communities->value();
		if ($node->nid === $field_rep_communities->nid) {
			array_push($real_estate_community_properties, $property_node);
		}
	}
}

$field_rec_boo_carousel = $wrapped_node->field_rec_boo_carousel->value();
$field_rec_mp_map = $wrapped_node->field_rec_mp_map->value();
$field_rec_ov_carousel = $wrapped_node->field_rec_ov_carousel->value();
$has_rec_video = !is_null($wrapped_node->field_youtube_video->value());
$field_rec_fg_featured_guide = $wrapped_node->field_rec_fg_featured_guide->value();
$field_rec_fj_featured_journal = $wrapped_node->field_rec_fj_featured_journal->value();
?>
<article class="real-estate-community" data-node-id="<?php echo $wrapped_node->nid->value(); ?>">
	<?php
	$field_re_header = $wrapped_node->field_re_header->value();
	$field_re_subheader = $wrapped_node->field_re_subheader->value();
	$field_re_text_color = $wrapped_node->field_re_text_color->value();
	$field_re_image_url = nret_parse_image_url($wrapped_node->field_re_image->value());
	?>
	<header
		class="real-estate-hero<?php if ($field_re_text_color) echo ' real-estate-hero--' . $field_re_text_color; ?>"
		style="background-image: url('<?php echo $field_re_image_url; ?>');"
	>
		<div class="real-estate-hero__text">
			<h1 class="title__caps"><?php echo $field_re_header; ?></h1>
			<?php if ($field_re_subheader) : ?>
				<p class="intro"><?php echo $field_re_subheader; ?></p>
			<?php endif; ?>
		</div>
	</header>
	<div class="real-estate-content">
		<nav class="real-estate-community-nav">
			<ul>
				<?php if (!empty($real_estate_community_properties)) : ?><li><a href="#listings">Listings</a></li><?php endif; ?>
				<?php if (!empty($field_rec_boo_carousel)) : ?><li><a href="#ownership">Benefits of Ownership</a></li><?php endif; ?>
				<?php if (!empty($field_rec_mp_map)) : ?><li><a href="#design">Our Design</a></li><?php endif; ?>
				<?php if (!empty($field_rec_ov_carousel)) : ?><li><a href="#vision">Our Vision</a></li><?php endif; ?>
				<?php if ($has_rec_video) : ?><li><a href="#tour">Tour</a></li><?php endif; ?>
				<?php if (!empty($field_rec_fj_featured_journal) || !empty($field_rec_fg_featured_guide)) : ?><li><a href="#explore">Explore</a></li><?php endif; ?>
			</ul>
		</nav>

		<?php if (!empty($real_estate_community_properties)) : ?>
		<div id="listings" class="anchor"></div>
		<section class="real-estate-community-listings">
			<header class="real-estate-community-listings__header">
				<h2 class="heading"><?php echo count($real_estate_community_properties); ?> Listings Available</h2>
				<div class="sort-by-container">
					<label>Sort By:</label>
					<select>
						<option value="1" selected>Bedrooms: low to high</option>
						<option value="2">Bedrooms: high to low</option>
						<option value="3">Price: low to high</option>
						<option value="4">Price: high to low</option>
					</select>
				</div>
			</header>
			<div class="real-estate-community-listings__teasers">
				<?php foreach ($real_estate_community_properties as $property_teaser) : ?>
					<?php include 'components/real-estate-property-teaser.php'; ?>
				<?php endforeach; ?>
			</div>
			<?php if (count($real_estate_community_properties) > 6) : ?>
			<button type="button" class="real-estate-community-listings__see-all">See all Listings</button>
			<?php endif; ?>
		</section>
		<?php endif; ?>

		<?php if (!empty($field_rec_boo_carousel)) : ?>
		<div id="ownership" class="anchor"></div>
		<section class="real-estate-community-benefits">
			<header>
				<h2 class="heading">Benefits of Ownership</h2>
			</header>
			<div class="benefits-carousel real-estate-carousel">
				<div class="real-estate-carousel__container">
					<?php
					foreach ($wrapped_node->field_rec_boo_carousel as $index => $community_benefit) :
						$field_rec_fc_ov_car_title = $community_benefit->field_rec_fc_ov_car_title->value();
						$field_rec_fc_ov_car_copy = $community_benefit->field_rec_fc_ov_car_copy->value();
						$field_rec_fc_ov_car_image_url = nret_parse_image_url($community_benefit->field_rec_fc_ov_car_image->value());
					?>
						<div class="real-estate-carousel__item<?php if ($index === 0) echo ' active'; ?>">
							<div class="image">
								<img
								src="<?php echo $field_rec_fc_ov_car_image_url; ?>"
								alt="<?php echo $field_rec_fc_ov_car_title; ?>"
								>
							</div>
								<div class="text">
									<h3 class="heading"><?php echo $field_rec_fc_ov_car_title; ?></h3>
									<p><?php echo $field_rec_fc_ov_car_copy; ?></p>
								</div>
							</div>
					<?php endforeach; ?>
				</div>
				<?php if (count($wrapped_node->field_rec_boo_carousel) > 1) : ?>
				<div class="real-estate-carousel__controls">
					<button type="button" class="real-estate-carousel__previous"><div class="icon icon--arrow-left"></div></button>
					<div class="real-estate-carousel__pagination">
						<?php foreach ($wrapped_node->field_rec_boo_carousel as $index => $service_carousel_item) : ?>
							<button type="button" <?php if ($index === 0) echo 'class="active"'; ?>><div class="icon icon--arrow-left"></div></button>
						<?php endforeach; ?>
					</div>
					<button type="button" class="real-estate-carousel__next"><div class="icon icon--arrow-right"></div></button>
				</div>
				<?php endif; ?>
			</div>
		</section>
		<?php endif; ?>

		<?php if (!empty($field_rec_mp_map)) : ?>
		<div id="design" class="anchor"></div>
		<section class="real-estate-community-design">
			<div class="design-copy">
				<header>
					<hgroup>
						<h3 class="subheading">Location</h3>
						<h2 class="heading">Masterplan</h2>
					</hgroup>
				</header>
				<ul class="community-map-locations">
					<?php
					foreach ($wrapped_node->field_rec_mp_map as $community_location_index => $community_location) :
						$field_rec_fc_mp_map_title = $community_location->field_rec_fc_mp_map_title->value();
						$field_rec_fc_mp_map_lattitude = $community_location->field_rec_fc_mp_map_lattitude->value();
						$field_rec_fc_mp_map_longitude = $community_location->field_rec_fc_mp_map_longitude->value();
					?>
						<li
							class="community-map-locations-item<?php if ($community_location_index === 0) echo ' active'; ?>"
							data-latitude="<?php echo $field_rec_fc_mp_map_lattitude ; ?>"
							data-longitude="<?php echo $field_rec_fc_mp_map_longitude ; ?>">
							<button><span><?php echo str_pad($community_location_index + 1, 2, '0', STR_PAD_LEFT); ?>.</span> <?php echo $field_rec_fc_mp_map_title; ?></button>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
			<div class="design-map">
				<div class="map-overlay"></div>
				<div id="community-map"></div>
			</div>
		</section>
		<?php endif; ?>

		<?php if (!empty($field_rec_ov_carousel)) : ?>
		<div id="vision" class="anchor"></div>
		<section class="real-estate-community-vision">
			<header>
				<h2 class="heading">Our Vision</h2>
			</header>
			<div class="vision-carousel real-estate-carousel">
				<div class="real-estate-carousel__container">
					<?php
					foreach ($wrapped_node->field_rec_ov_carousel as $index => $community_vision) :
						$field_rec_fc_ov_car_title = $community_vision->field_rec_fc_ov_car_title->value();
						$field_rec_fc_ov_car_copy = $community_vision->field_rec_fc_ov_car_copy->value();
						$field_rec_fc_ov_car_image_url = nret_parse_image_url($community_vision->field_rec_fc_ov_car_image->value());
					?>
						<div class="real-estate-carousel__item<?php if ($index === 0) echo ' active'; ?>">
							<div class="image">
								<img
								src="<?php echo $field_rec_fc_ov_car_image_url; ?>"
								alt="<?php echo $field_rec_fc_ov_car_title; ?>"
								>
							</div>
							<div class="text">
								<h3 class="heading"><?php echo $field_rec_fc_ov_car_title; ?></h3>
								<p><?php echo $field_rec_fc_ov_car_copy; ?></p>
							</div>
						</div>
					<?php endforeach; ?>
				</div>
				<?php if (count($wrapped_node->field_rec_ov_carousel) > 1) : ?>
				<div class="real-estate-carousel__controls">
					<button type="button" class="real-estate-carousel__previous"><div class="icon icon--arrow-left"></div></button>
					<div class="real-estate-carousel__pagination">
						<?php foreach ($wrapped_node->field_rec_ov_carousel as $index => $community_vision) : ?>
							<button type="button" <?php if ($index === 0) echo 'class="active"'; ?>><div class="icon icon--arrow-left"></div></button>
						<?php endforeach; ?>
					</div>
					<button type="button" class="real-estate-carousel__next"><div class="icon icon--arrow-right"></div></button>
				</div>
				<?php endif; ?>
			</div>
		</section>
		<?php endif; ?>

		<?php if ($has_rec_video) : ?>
		<div id="tour" class="anchor"></div>
		<section class="real-estate-community-tour">
			<?php
				$youtube = $wrapped_node->field_youtube_video->value();
				echo nret_youtube_show_player($youtube['video_id'],nret_parse_image_url($wrapped_node->field_youtube_thumbnail->value())); ?>
			<section class="youtube__mobile">
					<iframe width="320" height="315" src="https://www.youtube.com/embed/<?php echo $youtube['video_id']; ?>" frameborder="0" allowfullscreen></iframe>
			</section>
		</section>
		<?php endif; ?>

		<?php if(!empty($field_rec_fg_featured_guide) || !empty($field_rec_fj_featured_journal)) : ?>
		<div id="explore" class="anchor"></div>
		<div class="real-estate-community-explore">
			<?php if(!empty($field_rec_fg_featured_guide)) :
				$field_rec_fg_featured_guide_obj = $wrapped_node->field_rec_fg_featured_guide;
				$field_rec_fg_featured_guide_field_hero_image_url = nret_parse_image_url($field_rec_fg_featured_guide_obj->field_hero_image->value());
				$field_rec_fg_featured_guide_title = $field_rec_fg_featured_guide_obj->title->value();
				$field_rec_fg_copy = $wrapped_node->field_rec_fg_copy->value();
				$field_rec_fg_featured_guide_url = url('node/' . $field_rec_fg_featured_guide_obj->nid->value());
				?>
				<section class="news-block">
					<div class="news-block__image">
						<h2 class="heading">Experience Guides</h2>
						<div class="image__large-wrapper">
							<a href="<?php echo $field_rec_fg_featured_guide_url; ?>" target="_blank">
								<img
								src="<?php echo $field_rec_fg_featured_guide_field_hero_image_url; ?>"
								alt="<?php echo $field_rec_fg_featured_guide_title; ?>"
								>
							</a>
						</div>
					</div>
					<div class="news-block__copy">
						<h3 class="heading">
							<a href="<?php echo $field_rec_fg_featured_guide_url; ?>"><?php echo $field_rec_fg_featured_guide_title; ?></a>
						</h3>
						<p class="text"><?php echo $field_rec_fg_copy; ?></p>
						<a href="<?php echo $field_rec_fg_featured_guide_url; ?>" class="strike" target="_blank">View Guide <span class="side-arrow"></span></a>
					</div>
				</section>
			<?php endif; ?>

			<?php if(!empty($field_rec_fj_featured_journal)) :
				$field_rec_fj_featured_journal_obj = $wrapped_node->field_rec_fj_featured_journal;
				$field_rec_fg_featured_journa_field_hero_image_url = nret_parse_image_url($field_rec_fj_featured_journal_obj->field_hero_image->value());
				$field_rec_fj_featured_journal_title = $field_rec_fj_featured_journal_obj->title->value();
				$field_rec_fj_copy = $wrapped_node->field_rec_fj_copy->value();
				$field_rec_fj_featured_journal_url = url('node/' . $field_rec_fj_featured_journal_obj->nid->value());
				?>
			<section class="news-block">
				<div class="news-block__image">
					<h2 class="heading">Journal</h2>
					<div class="image__large-wrapper">
						<a href="<?php echo $field_rec_fj_featured_journal_url; ?>" target="_blank">
							<img
								src="<?php echo $field_rec_fg_featured_journa_field_hero_image_url; ?>"
								alt="<?php echo $field_rec_fj_featured_journal_title; ?>"
							>
						</a>
					</div>
				</div>
				<div class="news-block__copy">
					<h3 class="heading">
						<a href="<?php echo $field_rec_fj_featured_journal_url; ?>" target="_blank"><?php echo $field_rec_fj_featured_journal_title; ?></a>
					</h3>
					<p class="text"><?php echo $field_rec_fj_copy; ?></p>
					<a href="<?php echo $field_rec_fj_featured_journal_url; ?>" class="strike" target="_blank">Read Article <span class="side-arrow"></span></a>
				</div>
			</section>
			<?php endif; ?>
		</div>
		<?php endif; ?>

		<?php
		$field_rec_contact_title = $wrapped_node->field_rec_contact_title->value();
		$field_rec_contact_copy = $wrapped_node->field_rec_contact_copy->value();
		?>
		<section class="real-estate-community-contact">
			<header>
				<h2 class="heading"><?php echo $field_rec_contact_title; ?></h2>
			</header>
			<div class="text">
				<p><?php echo $field_rec_contact_copy; ?></p>
				<button type="button" class="launch-contact-modal">Contact Us</button>
			</div>
		</section>
	</div>
</article>

<?php include 'components/real-estate-contact-form-modal.php'; ?>

<?php drupal_add_js('jQuery(document).ready(function () { nret.realEstateCommunity.init(); });', 'inline'); ?>
