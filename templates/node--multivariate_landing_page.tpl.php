<?php
$wrapped_node = entity_metadata_wrapper('node',$node);

$image_gallery = $wrapped_node->field_image_gallery;
$hero_image_url = nret_parse_image_url($wrapped_node->field_hero_image->value());

?>

<section class="multi-variant">
	<div class="wrapper">
		<div class="hero" style="background:url('<?php echo $hero_image_url; ?>') center center no-repeat;background-size:cover">
			<header class="hero-copy">
				<h1 class="title__caps"><?php echo $wrapped_node->title->value(); ?></h1>
				<p class="intro"><?php echo $wrapped_node->field_subheader->value(); ?></p>
			</header><!-- /header -->
		</div>
		<article class="multi-variant__details">
			<div class="wrapper">
				<header>
					<h3 class="title"><?php echo $wrapped_node->title->value(); ?></h3>
					<span class="underline"></span>
				</header><!-- /header -->
				<div class="multi-variant__copy"><?php echo nl2br($wrapped_node->field_copy->value()); ?></div>
				<p><?php echo $wrapped_node->field_offer_cta_text->value(); ?></p>
				<a href="<?php echo $wrapped_node->field_cta_button->value(); ?>" class="strike">Learn More <span class="strike-through"></span></a>
			</div>
		</article>
		<aside class="multi-variant__gallery image-gallery__parent">
				<div class="image-gallery__navigation">
					<div class="image-gallery__navigation-left"></div>
					<div class="image-gallery__navigation-right"></div>
				</div>
				<div class="image-gallery__photographer">
					<div class="inner image-gallery-photographer">
						<?php foreach($image_gallery as $image) { ?>
						<p><?php echo $image->field_image_caption->value(); ?></p>
						<?php } ?>

					</div>
				</div>
				<div class="image-gallery">
					<?php foreach($image_gallery as $image) { ?>
					<div class="image-gallery-image-wrapper">
						<img src="<?php echo nret_parse_image_url($image->field_image->value()); ?>" alt="">
					</div>
					<?php } ?>
				</div>
		</aside>
	</div>
</section>
