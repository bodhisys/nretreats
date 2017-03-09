<?php
$wrapped_node = entity_metadata_wrapper('node', $node);
$field_rep_communities = $wrapped_node->field_rep_communities;
?>
<article class="real-estate-property" data-node-id="<?php echo $wrapped_node->nid->value(); ?>">
	<?php
	$field_re_header = $wrapped_node->field_re_header->value();
	$field_rep_communities_field_re_header = $field_rep_communities->field_re_header->value();
	$field_re_text_color = $wrapped_node->field_re_text_color->value();
	$field_re_image_url = nret_parse_image_url($wrapped_node->field_re_image->value());
	?>
	<header
		class="real-estate-hero<?php if ($field_re_text_color) echo ' real-estate-hero--' . $field_re_text_color; ?>"
		style="background-image: url('<?php echo $field_re_image_url; ?>');"
	>
		<div class="real-estate-hero__text">
			<h1 class="title__caps"><?php echo $field_re_header; ?></h1>
			<p class="intro"><?php echo $field_rep_communities_field_re_header; ?></p>
		</div>
	</header>
	<div class="real-estate-content">
		<?php
		$field_rep_communities_field_rec_cn_phone_number = $field_rep_communities->field_rec_cn_phone_number->value();
		?>
		<aside class="real-estate-property-nav">
			<div class="text">Interested in this property? <a href="tel:<?php echo $field_rep_communities_field_rec_cn_phone_number; ?>">Call <?php echo $field_rep_communities_field_rec_cn_phone_number; ?></a> or <button type="button" class="launch-contact-modal">contact us here.</button></div>
		</aside>

		<?php
		$field_rep_de_copy = $wrapped_node->field_rep_de_copy->value();
		$field_rep_pr_price_from = $wrapped_node->field_rep_pr_price_from->value();
		$field_rep_pd_pdfs = $wrapped_node->field_rep_pd_pdfs;
		?>
		<section class="real-estate-property-summary">
			<div class="container">
				<div class="real-estate-property-summary__content">
					<header>
						<h2 class="heading"><?php echo $field_re_header; ?></h2>
						<p class="price">Price from <?php echo $field_rep_pr_price_from; ?></p>
					</header>
					<div>
						<p><?php echo $field_rep_de_copy; ?></p>
					</div>
					<?php if (!empty($field_rep_pd_pdfs)) : ?>
					<ul>
						<?php
						foreach ($field_rep_pd_pdfs as $property_pdf) :
							$field_rep_fc_dp_copy = $property_pdf->field_rep_fc_dp_copy->value();
							$field_rep_fc_dp_url = $property_pdf->field_rep_fc_dp_url->value();
						?>
							<li><a href="<?php echo $field_rep_fc_dp_url; ?>" target="_blank" class="strike"><?php echo $field_rep_fc_dp_copy; ?> <span class="side-arrow"></span></a></li>
						<?php endforeach; ?>
					</ul>
					<?php endif; ?>
				</div>
				<div class="real-estate-property-summary__map">
					<div class="map-overlay">
						<img
							src="<?php echo $field_re_image_url; ?>"
							alt="<?php echo $field_re_header; ?>"
							class="map-overlay"
						>
					</div>
					<div
						id="property-map"
						data-lat="<?php echo $node->locations[0]['latitude']; ?>"
						data-lng="<?php echo $node->locations[0]['longitude']; ?>"
					></div>
				</div>
			</div>
		</section>

		<?php
		$field_rep_ig_gallery = $wrapped_node->field_rep_ig_gallery;
		if (!empty($field_rep_ig_gallery)) :
		?>
		<section class="real-estate-property-image-gallery real-estate-carousel">
			<div class="container">
				<div class="real-estate-carousel__container">
					<?php
					foreach ($field_rep_ig_gallery as $index => $property_gallery_image) :
						$field_rep_fc_ga_title = $property_gallery_image->field_rep_fc_ga_title->value();
						$field_rep_fc_ga_caption = $property_gallery_image->field_rep_fc_ga_caption->value();
						$field_rep_fc_ga_image_url = nret_parse_image_url($property_gallery_image->field_rep_fc_ga_image->value());
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
						<?php foreach ($field_rep_ig_gallery as $index => $case_study_gallery_image) : ?>
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
		$field_rep_pd_overview = $wrapped_node->field_rep_pd_overview;
		$field_rep_pd_features = $wrapped_node->field_rep_pd_features;
		$field_rep_pd_surrounding_areas = $wrapped_node->field_rep_pd_surrounding_areas;
		?>
		<div class="real-estate-property-features">
			<?php try{ $frpo = $field_rep_pd_overview->value(); }catch (Exception $e){ $frpo = ''; } if(!empty($frpo)) :?>
			<section class="feature">
				<header>
					<h2 class="heading"><button>Overview</button> <span class="arrow"></span></h2>
				</header>
				<ul>
					<?php foreach ($field_rep_pd_overview as $property_overview_item) : ?>
					<li><?php echo $property_overview_item->value(); ?></li>
					<?php endforeach; ?>
				</ul>
			</section>
			<?php endif; ?>
			<?php try{ $frpf = $field_rep_pd_features->value(); }catch (Exception $e){ $frpf = ''; } if(!empty($frpf)) :?>
			<section class="feature">
				<header>
					<h2 class="heading"><button>Features</button> <span class="arrow"></span></h2>
				</header>
				<ul>
					<?php foreach ($field_rep_pd_features as $property_feature_item) : ?>
					<li><?php echo $property_feature_item->value(); ?></li>
					<?php endforeach; ?>
				</ul>
			</section>
			<?php endif; ?>
			<?php try{ $frpsa = $field_rep_pd_surrounding_areas->value(); }catch (Exception $e){ $frpsa = ''; } if(!empty($frpsa)) :?>
			<section class="feature">
				<header>
					<h2 class="heading"><button>Surrounding Area</button><span class="arrow"></span></h2>
				</header>
				<ul>
					<?php foreach ($field_rep_pd_surrounding_areas as $property_surrounding_area_item) : ?>
					<li><?php echo $property_surrounding_area_item->value(); ?></li>
					<?php endforeach; ?>
				</ul>
			</section>
			<?php endif; ?>
		</div>

		<?php
		$query = new EntityFieldQuery();
		$query->entityCondition('entity_type', 'node')
			->entityCondition('bundle', 'real_estate_property')
			->propertyCondition('status', 1);
		$result = $query->execute();
		if (!empty($result['node'])) :
			$real_estate_related_properties = array_keys($result['node']);
			$real_estate_related_properties = array_slice($real_estate_related_properties, 0, 3);
			$field_rep_communities_url = url('node/' . $field_rep_communities->nid->value());
			$field_rep_communities_title = $field_rep_communities->title->value();
		?>
		<section class="real-estate-property-similar">
			<header>
				<h2 class="heading">Similar Properties</h2>
			</header>
			<div class="real-estate-property-similar__teasers">
				<?php
				foreach ($real_estate_related_properties as $property_teaser) {
					include 'components/real-estate-property-teaser.php';
				}
				?>
			</div>
			<div class="real-estate-property-similar__back">
				<a href="<?php echo $field_rep_communities_url; ?>" class="strike">Back to <?php echo $field_rep_communities_title; ?> overview <span class="side-arrow"></span></a>
			</div>
		</section>
		<?php endif; ?>
	</div>
</article>

<?php include 'components/real-estate-contact-form-modal.php'; ?>

<?php drupal_add_js('jQuery(document).ready(function () { nret.realEstateProperty.init(); });', 'inline'); ?>
