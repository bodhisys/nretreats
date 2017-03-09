<?php
$wrapped_node = entity_metadata_wrapper('node',$node);
$witf_field_events = $wrapped_node->field_witf_events;
$witf_field_image_gallery = $wrapped_node->field_image_gallery;
$field_witf_related_experiences = $wrapped_node->field_witf_related_experiences;
$witf_hero_image_url = nret_parse_image_url($wrapped_node->field_witf_image->value());

?>

<section class="witf-landing">
		<div class="hero" style="background:url('<?php echo $witf_hero_image_url; ?>') center center no-repeat;background-size:cover">
			<header class="hero-copy">
				<h1 class="title__caps"><?php echo $wrapped_node->title->value(); ?></h1>
				<p class="intro"><?php echo $wrapped_node->field_witf_subheader_copy->value(); ?></p>
			</header><!-- /header -->
		</div>
		<article class="witf-landing__details">
			<div class="witf-landing__copy"><?php echo nl2br($wrapped_node->field_witf_copy->value()); ?></div>
		</article>


		<div class="witf_field_content_wrapper">
				<header class="animated hide-block">
					<h3 class="title">Women in the Field Events</h3>
					<span class="underline"></span>
				</header>
				<div class="offers-row image-gallery-mobile hide-block">
					<?php foreach ($witf_field_events as $key => $field_event):
						$field_witf_event = $field_event->field_witf_event;
						$field_witf_event_image = nret_parse_image_url($field_witf_event->field_witfe_image->value());
						$field_witf_event_title = $field_witf_event->title->value();
						?>
						<a href="<?php echo url('node/'.$field_witf_event->nid->value()); ?>" class="offers-block">
							<div class="offers-block__bg-image">
								<img src="<?php echo $field_witf_event_image; ?>" alt="">
							</div>
							<div class="offers-block__copy">
								<hgroup>
									<h3 class="title"><?php echo $field_witf_event_title; ?></h3>
								</hgroup>
							</div>
						</a>
					<?php endforeach; ?>
			</div>

			<!-- start image gallery -->
			<div class="witf-landing-section-wrapper">

				<section class="event__content__gallery image-gallery__parent">
					<div class="image-gallery__navigation">
						<div class="image-gallery__navigation-left"></div>
						<div class="image-gallery__navigation-right"></div>
					</div>
					<div class="image-gallery__photographer">
						<div class="inner image-gallery-photographer">
							<?php foreach ($witf_field_image_gallery as $key => $image):
								$field_image_caption = $image->field_image_caption->value();
								?>
								<p><?php echo $field_image_caption; ?></p>
							<?php endforeach; ?>
						</div>
					</div>
					<div class="image-gallery">
						<?php foreach ($witf_field_image_gallery as $key => $image):
							$field_image = nret_parse_image_url($image->field_image->value());
							?>
							<div class="image-gallery-image-wrapper">
								<img src="<?php echo $field_image; ?>" alt="">
							</div>
						<?php endforeach; ?>
					</div>
				</section>
			</div>
				<!-- end image gallery -->

				<header class="animated hide-block">
					<h3 class="title">Other Natural Retreats Experiences</h3>
					<span class="underline"></span>
				</header>
				<div class="offers-row image-gallery-mobile hide-block">
					<?php foreach ($field_witf_related_experiences as $key => $related_exp): ?>
						 <a href="<?php echo url('node/'.$related_exp->nid->value()); ?>" class="offers-block">
						 	<div class="offers-block__bg-image">
						 		<img src="<?php echo nret_parse_image_url($related_exp->field_image->value()); ?>" alt="">
						 	</div>
						 	<div class="offers-block__copy">
						 		<hgroup>
						 			<h3 class="title"><?php echo $related_exp->title->value(); ?></h3>
						 		</hgroup>
						 	</div>
						</a>
					<?php endforeach; ?>
				</div>
		</div>
</section>
