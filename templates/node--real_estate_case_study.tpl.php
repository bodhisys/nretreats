<?php
$wrapped_node = entity_metadata_wrapper('node', $node);
// $field_recs_se_service = $wrapped_node->field_recs_se_service->value();
?>
<article class="real-estate-case-study" data-node-id="<?php echo $wrapped_node->nid->value(); ?>">
	<?php
	$field_re_header = $wrapped_node->field_re_header->value();
	// $field_recs_se_service_title = $field_recs_se_service->label->value();
	$field_re_text_color = $wrapped_node->field_re_text_color->value();
	$field_re_image_url = nret_parse_image_url($wrapped_node->field_re_image->value());
	?>
	<header
		class="real-estate-hero<?php if ($field_re_text_color) echo ' real-estate-hero--' . $field_re_text_color; ?>"
		style="background-image: url('<?php echo $field_re_image_url; ?>');"
	>
		<div class="real-estate-hero__text">
			<h1 class="title__caps"><?php echo $field_re_header; ?></h1>
			<p class="intro"><?php //echo $field_recs_se_service_field_re_header; ?></p>
		</div>
	</header>

	<div class="real-estate-content">
		<?php
		$field_rec_cn_phone_number = $wrapped_node->field_rec_cn_phone_number->value();
		?>
		<aside class="real-estate-case-study-nav">
			<div class="text">Interested in this property? <a href="tel:<?php echo $field_rec_cn_phone_number; ?>">Call <?php echo $field_rec_cn_phone_number; ?></a> or <button type="button" class="launch-contact-modal">contact us here.</button></div>
		</aside>

		<?php
		$field_recs_description_copy = $wrapped_node->field_recs_description_copy->value();
		$field_rep_pd_pdfs = $wrapped_node->field_rep_pd_pdfs;
		$field_rec_fc_mp_map_lattitude = $wrapped_node->field_rec_fc_mp_map_lattitude->value();
		$field_rec_fc_mp_map_longitude = $wrapped_node->field_rec_fc_mp_map_longitude->value();
		?>
		<section class="real-estate-case-study-summary">
			<div class="container">
				<div class="real-estate-case-study-summary__content">
					<div class="text">
						<p><?php echo $field_recs_description_copy; ?></p>
					</div>
					<?php if (!empty($field_rep_pd_pdfs)) : ?>
					<ul>
						<?php
						foreach ($field_rep_pd_pdfs as $case_study_pdf) :
							$field_rep_fc_dp_copy = $case_study_pdf->field_rep_fc_dp_copy->value();
							$field_rep_fc_dp_url = $case_study_pdf->field_rep_fc_dp_url->value();
						?>
							<li><a href="<?php echo $field_rep_fc_dp_url; ?>" target="_blank" class="strike"><?php echo $field_rep_fc_dp_copy; ?> <span class="side-arrow"></span></a></li>
						<?php endforeach; ?>
					</ul>
					<?php endif; ?>
				</div>
				<div class="real-estate-case-study-summary__map">
					<div class="map-overlay">
						<img
							src="<?php echo $field_re_image_url; ?>"
							alt="<?php echo $field_re_header; ?>"
							class="map-overlay"
						>
					</div>
					<div
						id="case-study-map"
						class="map"
						data-lat="<?php echo $field_rec_fc_mp_map_lattitude; ?>"
						data-lng="<?php echo $field_rec_fc_mp_map_longitude; ?>"
						data-markers="[<?php echo $field_rec_fc_mp_map_lattitude; ?>, <?php echo $field_rec_fc_mp_map_longitude; ?>]"
					></div>
				</div>
			</div>
		</section>

		<?php
		$field_rep_ig_gallery = $wrapped_node->field_rep_ig_gallery;
		if (!empty($field_rep_ig_gallery)) :
		?>
		<section class="real-estate-case-study-image-gallery real-estate-carousel">
			<div class="container">
				<div class="real-estate-carousel__container">
					<?php
					foreach ($field_rep_ig_gallery as $index => $case_study_gallery_image) :
						$field_rep_fc_ga_title = $case_study_gallery_image->field_rep_fc_ga_title->value();
						$field_rep_fc_ga_caption = $case_study_gallery_image->field_rep_fc_ga_caption->value();
						$field_rep_fc_ga_image_url = nret_parse_image_url($case_study_gallery_image->field_rep_fc_ga_image->value());
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
		$field_recs_panel = $wrapped_node->field_recs_panel;
		?>
		<section class="real-estate-case-study-methods-metrics">
			<header>
				<h2 class="heading">Methods &amp; Metrics</h2>
			</header>
			<div class="real-estate-case-study-methods-metrics__panels">
				<?php
				foreach ($field_recs_panel as $case_study_panel) :
					$field_recs_fc_panels_image_url = nret_parse_image_url($case_study_panel->field_recs_fc_panels_image->value());
					$field_recs_fc_panels_title = $case_study_panel->field_recs_fc_panels_title->value();
					$field_recs_fc_panels_copy = $case_study_panel->field_recs_fc_panels_copy->value();
					$field_recs_fc_panels_link_text = $case_study_panel->field_recs_fc_panels_link_text->value();
					$field_recs_fc_panels_link_url = $case_study_panel->field_recs_fc_panels_link_url->value();
				?>
					<div class="real-estate-case-study-panel">
						<div class="real-estate-case-study-panel__image">
							<a href="<?php echo $field_recs_fc_panels_link_url; ?>">
								<img src="<?php echo $field_recs_fc_panels_image_url; ?>" alt="<?php echo $field_recs_fc_panels_title; ?>">
							</a>
						</div>
						<div class="real-estate-case-study-panel__content">
							<header class="real-estate-case-study-panel__header">
								<h3 class="heading">
									<a href="<?php echo $field_recs_fc_panels_link_url; ?>"><?php echo $field_recs_fc_panels_title; ?></a>
								</h3>
							</header>
							<div class="real-estate-case-study-panel__excerpt">
								<p><?php echo $field_recs_fc_panels_copy; ?></p>
							</div>
							<?php if(!empty($field_recs_fc_panels_link_url) && !empty($field_recs_fc_panels_link_text)) : ?><a href="<?php echo $field_recs_fc_panels_link_url; ?>" class="real-estate-case-study-panel__learn-more strike"><?php echo $field_recs_fc_panels_link_text; ?> <span class="side-arrow"></span></a><?php endif; ?>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		</section>
	</div>
</article>

<?php include 'components/real-estate-contact-form-modal.php'; ?>

<?php drupal_add_js('jQuery(document).ready(function () { nret.realEstateCaseStudy.init(); });', 'inline'); ?>
