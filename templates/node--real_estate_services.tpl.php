<?php
$wrapped_node = entity_metadata_wrapper('node', $node);
?>
<article class="real-estate-services" data-node-id="<?php echo $wrapped_node->nid->value(); ?>">
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
		<?php
		$field_res_sos_header = $wrapped_node->field_res_sos_header->value();
		$field_res_sos_subheader = $wrapped_node->field_res_sos_subheader->value();
		?>
		<section class="real-estate-services-summary">
			<header>
				<h2 class="heading"><?php echo $field_res_sos_header; ?></h2>
				<p><?php echo $field_res_sos_subheader; ?></p>
				<?php
				$field_rep_pd_pdfs = $wrapped_node->field_rep_pd_pdfs;
				?>
				<ul class="real-estate-services-summary__pdfs">
					<?php
					foreach ($field_rep_pd_pdfs as $service_pdf) :
						$field_rep_fc_dp_copy = $service_pdf->field_rep_fc_dp_copy->value();
						$field_rep_fc_dp_url = $service_pdf->field_rep_fc_dp_url->value();
					?>
						<li><a href="<?php echo $field_rep_fc_dp_url; ?>" target="_blank" class="strike"><?php echo $field_rep_fc_dp_copy; ?> <span class="side-arrow"></span></a></li>
					<?php endforeach; ?>
				</ul>
			</header>
			<div>
				<?php
				$field_rec_ov_carousel = $wrapped_node->field_rec_ov_carousel;
				if (!empty($field_rec_ov_carousel)) : ?>
				<div class="real-estate-carousel">
					<div class="real-estate-carousel__container">
						<?php
						foreach ($field_rec_ov_carousel as $index => $service_carousel_item) :
							$field_rec_fc_ov_car_title = $service_carousel_item->field_rec_fc_ov_car_title->value();
							$field_rec_fc_ov_car_copy = $service_carousel_item->field_rec_fc_ov_car_copy->value();
							$field_rec_fc_ov_car_image_url = nret_parse_image_url($service_carousel_item->field_rec_fc_ov_car_image->value());
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
					<?php if (count($field_rec_ov_carousel) > 1) : ?>
					<div class="real-estate-carousel__controls">
						<button type="button" class="real-estate-carousel__previous"><div class="icon icon--arrow-left"></div></button>
						<div class="real-estate-carousel__pagination">
							<?php foreach ($field_rec_ov_carousel as $index => $service_carousel_item) : ?>
								<button type="button" <?php if ($index === 0) echo 'class="active"'; ?>><div class="icon icon--arrow-left"></div></button>
							<?php endforeach; ?>
						</div>
						<button type="button" class="real-estate-carousel__next"><div class="icon icon--arrow-right"></div></button>
					</div>
					<?php endif; ?>
				</div>
				<?php endif; ?>

				<?php
				$field_res_sl_service = $wrapped_node->field_res_sl_service;
				if (!empty($field_res_sl_service)) : ?>
				<ul class="real-estate-services__services">
					<?php foreach ($wrapped_node->field_res_sl_service as $service_item) : ?>
					<li><?php echo $service_item->value(); ?></li>
					<?php endforeach; ?>
				</ul>
				<?php endif; ?>
			</div>
		</section>

		<?php
		$field_res_case_study = $wrapped_node->field_res_case_study;
		?>
		<section class="real-estate-services-case-studies">
			<header>
				<h2 class="heading">Case Studies</h2>
			</header>
			<div class="real-estate-services-case-studies__teasers">
				<?php
				foreach ($field_res_case_study as $service_case_study) {
					include 'components/real-estate-case-study-teaser.php';
				}
				?>
			</div>
		</section>

		<?php
		$field_rec_contact_title = $wrapped_node->field_rec_contact_title->value();
		$field_rec_contact_copy = $wrapped_node->field_rec_contact_copy->value();
		?>
		<section class="real-estate-services-contact">
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

<?php drupal_add_js('jQuery(document).ready(function () { nret.realEstateServices.init(); });', 'inline'); ?>
