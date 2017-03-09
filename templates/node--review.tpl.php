<?php
$wrapped_node = entity_metadata_wrapper('node',$node);
	$page_title = $wrapped_node->title->value();

$reviews_array = $wrapped_node->field_review_example_reviews;
?>

<section class="reviews tertiary">
	<div class="wrapper">
		<div class="hero">
			<header>
				<h1 class="title__caps"><?php echo $wrapped_node->title->value(); ?></h1>
				<!-- <p class="intro">Nulla id bibendum nunc, hendrerit.</p> -->
			</header>
		</div>

		<div class="reviews__container">
			<div class="wrapper">
				<header>
					<h3 class="title contact-us__header"><?php echo $wrapped_node->field_review_introduction_title->value(); ?></h3>
					<span class="underline"></span>
				</header>
				<p>
					<?php echo $wrapped_node->field_review_introduction_copy->value(); ?>
				</p>
				<div id="initReviewsGeneric" class="btn btn__blue">Write a Review</div>

				<section class="reviews__reviews">
					<header>
						<h3 class="title contact-us__header">Recent Reviews</h3>
						<span class="underline"></span>
					</header>


					<div class="reviews__list-wrapper">
						<?php  foreach($reviews_array as $review) {
							$retreat_obj = $review->field_review_retreat->value();
							$retreat_name = $retreat_obj->title;
							$destination_obj = $review->field_review_retreat;
							$destination_api= $destination_obj->field_destination->value()->api_data;
							?>

							<div class="review__block">
								<h6 class="title">
									<?php echo $retreat_name; ?><br><?php echo $destination_api->DestinationName; ?></h6>
								<p class="review__quote"></p>
								<p><?php echo $review->field_review_copy->value(); ?></p>
								<a href="<?php echo url('node/'.$retreat_obj->nid); ?>">READ MORE</a>
							</div>

						<?php }  ?>

					</div>
				</section>
			<?php
				$youtube = $wrapped_node->field_youtube_video->value();
				if ( !empty( $youtube['video_id']) ) {
			    	echo nret_youtube_show_player($youtube['video_id'], nret_parse_image_url($wrapped_node->field_youtube_thumbnail->value())); ?>
				<section class="youtube__mobile">
						<iframe width="320" height="315" src="https://www.youtube.com/embed/<?php echo $youtube['video_id']; ?>" frameborder="0" allowfullscreen></iframe>
				</section>
			<?php } ?>
			</div>
		</div>
	</div>
</section>
<?php
	drupal_add_js('jQuery(document).ready(function () { nret.bazaar.init(); });', 'inline');
?>
