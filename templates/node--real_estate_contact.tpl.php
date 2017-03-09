<?php
$wrapped_node = entity_metadata_wrapper('node', $node);
?>
<div class="real-estate-contact" data-node-id="<?php echo $wrapped_node->nid->value(); ?>">
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
		$field_rec_ucd_title = $wrapped_node->field_rec_ucd_title->value();
		$field_rec_ucd_copy = $wrapped_node->field_rec_ucd_copy->value();
		$field_rec_ucd_cta_text = $wrapped_node->field_rec_ucd_cta_text->value();
		$field_rec_ukcd_title = $wrapped_node->field_rec_ukcd_title->value();
		$field_rec_ukcd_copy = $wrapped_node->field_rec_ukcd_copy->value();
		$field_rec_ukcd_cta_text = $wrapped_node->field_rec_ukcd_cta_text->value();
		?>
		<div class="real-estate-contact-regions">
			<section class="news-block">
				<div class="news-block__image">
					<h2 class="heading"><?php echo $field_rec_ucd_title; ?></h2>
				</div>
				<div class="news-block__copy">
					<p class="text"><?php echo $field_rec_ucd_copy; ?></p>
					<a href class="strike"><?php echo $field_rec_ucd_cta_text; ?></a>
				</div>
			</section>
			<section class="news-block">
				<div class="news-block__image">
					<h2 class="heading"><?php echo $field_rec_ukcd_title; ?></h2>
				</div>
				<div class="news-block__copy">
					<p class="text"><?php echo $field_rec_ukcd_copy; ?></p>
					<a href class="strike"><?php echo $field_rec_ukcd_cta_text; ?></a>
				</div>
			</section>
		</div>

		<?php
		$field_rec_fi_copy = $wrapped_node->field_rec_fi_copy->value();
		$field_rec_co_copy = $wrapped_node->field_rec_co_copy->value();
		?>
		<div class="real-estate-contact-form">
			<header>
				<h2><?php echo $field_rec_fi_copy; ?></h2>
			</header>
			<?php include 'components/real-estate-contact-form.php'; ?>
			<div class="real-estate-contact-form__thank-you"><?php echo $field_rec_co_copy; ?></div>
		</div>
	</div>
</div>
<?php drupal_add_js('jQuery(document).ready(function () { nret.realEstateContact.init(); });', 'inline'); ?>
