<?php 
$wrapped_node = entity_metadata_wrapper('node',$node); 



?>


<section class="careers-listing">
	<div class="wrapper">
		<div class="careers-listing__hero" style="background:url('<?php echo nret_parse_image_url($wrapped_node->field_hero_image->value()); ?>') center center no-repeat;background-size:cover;">
			<header>
				<h1 class="title__caps"><?php echo $wrapped_node->title->value(); ?></h1>
				<p class="intro"><?php echo $wrapped_node->field_copy->value(); ?></p>
			</header>
		</div>

		<div class="careers-listing__content">
			<div class="careers-listing__intro">
				<header>
					<h3 class="title"><?php echo $wrapped_node->field_career_overview_title->value(); ?></h3>
					<span class="underline"></span>
				</header><!-- /header -->
				<p class="intro"><?php echo $wrapped_node->field_career_short_description->value(); ?></p>
				<p><?php echo $wrapped_node->field_long_description->value(); ?></p>
				<h3 class="title careers-listing__usa-cta">To browse job openings in the United States    <a class="strike" href="http://naturalretreats.appone.com/" target="_blank">click here</a></h3>
			</div>

			<div class="careers-listing__job-listing">
				<header>
					<h3 class="title">To browse job openings in the UK, Ireland & Europe see below</h3>
					<span class="underline"></span>
				</header>
				<ul>
				<?php foreach ($node->jobs as $wrapped_job){?>
					<li><a class="strike" href="<?php echo url('node/'.$wrapped_job->nid->value()); ?>"><?php echo $wrapped_job->field_job_job_title->value(); ?>, <?php echo $wrapped_job->field_job_location->value(); ?> </a></li>
				<?php } ?>
				</ul>
			</div>
	
		</div>
	</div>
</section>