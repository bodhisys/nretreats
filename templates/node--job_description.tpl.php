<?php  
	$wrapped_node = entity_metadata_wrapper('node',$node); 
	$page_title = $wrapped_node->title->value();



	
?>


<section class="career-detail">
	<div class="wrapper">
		<hgroup>
			<h6>Natural Retreats Job Opening</h6>
			<h1 class="title"><?php echo $wrapped_node->field_job_job_title->value(); ?></h1>
			<h1 class="title"><?php echo $wrapped_node->field_job_location->value(); ?></h1>
		</hgroup>

		<div class="career-detail__content">
			<ul class="career-detail__meta">
				<li>Job title: <span class="italic"> <?php echo $wrapped_node->field_job_job_title->value(); ?></span></li>
				<li>Reports to: <span class="italic"><?php echo $wrapped_node->field_job_reports_to->value(); ?></span></li>
				<li>Location: <span class="italic"> <?php echo $wrapped_node->field_job_location->value(); ?></span></li>
				<li>Direct Reports: <span class="italic"> <?php echo $wrapped_node->field_job_direct_reports->value(); ?></span></li>
			</ul>

			<p class="intro"><?php echo $wrapped_node->field_copy->value(); ?></p>

			<section class="career-detail__details">
				<?php  
					foreach($wrapped_node->field_job_sections as $section) {
						$sectioncopy = $section->field_job_section_copy->value();
						echo '<div class="career-detail__block">';
							echo '<h4 class="career-detail__subtitle">'.$section->field_job_section_title->value().'</h4>';
							echo '<p class="career-detail__paragraph">'.$sectioncopy['safe_value'].'</p>';
							
						echo '</div>';
					}

				?>
				
			</section>
			<span class="underline"></span>
			<p class="intro"><?php echo $node->field_job_cta_copy[LANGUAGE_NONE][0]['value']; ?></p>
		</div>
	</div>
</section>	