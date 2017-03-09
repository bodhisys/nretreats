<?php
// $wrapped_case_study_teaser = entity_metadata_wrapper('node', $service_case_study);
$service_case_study_url = url('node/' . $service_case_study->nid->value());
$service_case_study_field_re_image = nret_parse_image_url($service_case_study->field_re_image->value());
$service_case_study_field_re_header = $service_case_study->field_re_header->value();
$service_case_study_field_re_subheader = $service_case_study->field_re_subheader->value();
?>
<article class="real-estate-case-study-teaser">
	<div class="real-estate-case-study-teaser__image">
		<a href="<?php echo $service_case_study_url; ?>">
			<img src="<?php echo $service_case_study_field_re_image; ?>" alt="<?php echo $service_case_study_field_re_header; ?>">
		</a>
	</div>
	<div class="real-estate-case-study-teaser__content">
		<header class="real-estate-case-study-teaser__header">
			<h3 class="heading">
				<a href="<?php echo $service_case_study_url; ?>"><?php echo $service_case_study_field_re_header; ?></a>
			</h3>
		</header>
		<div class="real-estate-case-study-teaser__excerpt">
			<p><?php echo $service_case_study_field_re_subheader; ?></p>
		</div>
		<a href="<?php echo $service_case_study_url; ?>" class="real-estate-case-study-teaser__learn-more">View Case Study</a>
	</div>
</article>
