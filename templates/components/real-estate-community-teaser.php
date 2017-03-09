<?php
$wrapped_community_teaser = entity_metadata_wrapper('node', $community_teaser);
$community_teaser_url = url('node/' . $wrapped_community_teaser->nid->value());
$field_re_image_url = nret_parse_image_url($wrapped_community_teaser->field_re_image->value());
$field_re_header = $wrapped_community_teaser->field_re_header->value();
$field_rec_teaser_copy = $wrapped_community_teaser->field_rec_teaser_copy->value();
?>
<article class="real-estate-community-teaser">
	<div class="real-estate-community-teaser__image">
		<a href="<?php echo $community_teaser_url; ?>">
			<img src="<?php echo $field_re_image_url; ?>" alt="<?php echo $field_re_header; ?>">
		</a>
	</div>
	<div class="real-estate-community-teaser__content">
		<header class="real-estate-community-teaser__header">
			<h3 class="heading">
				<a href="<?php echo $community_teaser_url; ?>"><?php echo $field_re_header; ?></a>
			</h3>
		</header>
		<div class="real-estate-community-teaser__excerpt">
			<p><?php echo $field_rec_teaser_copy; ?></p>
		</div>
		<a href="<?php echo $community_teaser_url; ?>" class="real-estate-community-teaser__learn-more">Learn More</a>
	</div>
</article>
