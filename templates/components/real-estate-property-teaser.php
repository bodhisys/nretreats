<?php
$wrapped_property_teaser = entity_metadata_wrapper('node', $property_teaser);
$property_teaser_url = url('node/' . $wrapped_property_teaser->nid->value());
$field_re_image_url = nret_parse_image_url($wrapped_property_teaser->field_re_image->value());
$field_re_header = $wrapped_property_teaser->field_re_header->value();
$field_rep_number_of_bedrooms = $wrapped_property_teaser->field_rep_number_of_bedrooms->value();
$field_rep_number_of_bathrooms = $wrapped_property_teaser->field_rep_number_of_bathrooms->value();
$field_rep_pr_price_from = $wrapped_property_teaser->field_rep_pr_price_from->value();
$field_rep_acreage = $wrapped_property_teaser->field_rep_acreage->value();
$field_rep_neighborhood = $wrapped_property_teaser->field_rep_neighborhood->value();
$field_rep_features = $wrapped_property_teaser->field_rep_features->value();
?>
<article class="real-estate-property-teaser" data-price="<?php echo $field_rep_pr_price_from;?>" data-bedrooms="<?php echo $field_rep_number_of_bedrooms; ?>">
	<div class="real-estate-property-teaser__image">
		<a href="<?php echo $property_teaser_url; ?>">
			<img src="<?php echo $field_re_image_url; ?>" alt="<?php echo $field_re_header; ?>">
		</a>
	</div>
	<div class="real-estate-property-teaser__content">
		<header class="real-estate-property-teaser__header">
			<h3 class="heading">
				<a href="<?php echo $property_teaser_url; ?>"><?php echo $field_re_header; ?></a>
			</h3>
			<div class="stats"><?php echo $field_rep_number_of_bedrooms ? $field_rep_number_of_bedrooms . ' bedrooms, ' : ''; ?><?php echo $field_rep_number_of_bathrooms ? $field_rep_number_of_bathrooms . ' baths' : ''; ?> </div>
			<div class="price">starting from <?php echo $field_rep_pr_price_from; ?></div>
		</header>
		<ul class="real-estate-property-teaser__data">
			<?php echo $field_rep_acreage ? '<li><strong>Acreage</strong>: ' . $field_rep_acreage : '' ;?>
			<?php echo $field_rep_neighborhood ? '<li><strong>Location</strong>: ' . $field_rep_neighborhood : ''; ?>
			<li><strong>Features</strong>: <?php echo $field_rep_features; ?></li>
		</ul>
		<a href="<?php echo $property_teaser_url; ?>" class="real-estate-property-teaser__learn-more">View Listing</a>
	</div>
</article>
