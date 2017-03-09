<?php
	$wrapped_node = entity_metadata_wrapper('node',$node);

	$page_title = $node->title;
	$hero_image_url = nret_parse_image_url($node->field_hero_image[LANGUAGE_NONE][0]);
	$hero_copy = $node->field_copy[LANGUAGE_NONE][0]['value'];

	$field_eaw_overview_text = $node->field_eaw_overview_text[LANGUAGE_NONE][0]['value'];
	$field_eaw_overview_cta_text = $node->field_eaw_overview_cta_text[LANGUAGE_NONE][0]['value'];

	$field_image_url = nret_parse_image_url($node->field_image[LANGUAGE_NONE][0]);

	$field_eaw_weddings_title = $node->field_eaw_weddings_title[LANGUAGE_NONE][0]['value'];
	$field_eaw_weddings_copy = $node->field_eaw_weddings_copy[LANGUAGE_NONE][0]['value'];
	$field_eaw_weddings_list_items_array = $node->field_eaw_weddings_list_items[LANGUAGE_NONE];
	$field_eaw_weddings_images_array = $node->field_eaw_weddings_images[LANGUAGE_NONE];
	$field_eaw_weddings_images_1 = nret_parse_image_url( $node->field_eaw_weddings_images[LANGUAGE_NONE][0] );
	$field_eaw_weddings_images_2 = nret_parse_image_url( $node->field_eaw_weddings_images[LANGUAGE_NONE][1] );
	$field_eaw_weddings_images_3 = nret_parse_image_url( $node->field_eaw_weddings_images[LANGUAGE_NONE][2] );
	$field_eaw_weddings_quote = $node->field_eaw_weddings_quote[LANGUAGE_NONE][0]['value'];
	$field_eaw_weddings_quote_name = $node->field_eaw_weddings_quote_name[LANGUAGE_NONE][0]['value'];
	$field_eaw_weddings_quote_details = $node->field_eaw_weddings_quote_details[LANGUAGE_NONE][0]['value'];

	$field_eaw_corporate_title = $node->field_eaw_corporate_title[LANGUAGE_NONE][0]['value'];
	$field_eaw_corporate_copy = $node->field_eaw_corporate_copy[LANGUAGE_NONE][0]['value'];
	$field_eaw_corporate_locations = $node->field_eaw_corporate_locations[LANGUAGE_NONE];
	$field_eaw_corporate_image = nret_parse_image_url($node->field_eaw_corporate_image[LANGUAGE_NONE][0]);

	$field_eaw_group_title = $node->field_eaw_group_title[LANGUAGE_NONE][0]['value'];
	$field_eaw_group_copy = $node->field_eaw_group_copy[LANGUAGE_NONE][0]['value'];
	$field_eaw_group_image = $node->field_eaw_group_image[LANGUAGE_NONE];
	$field_eaw_group_locations = $node->field_eaw_group_locations[LANGUAGE_NONE];


?>

<section class="event">
	<div class="wrapper">
		<div class="hero" style="background:url('<?php echo $hero_image_url; ?>') center center no-repeat;background-size:cover">
			<header class="event__hero-copy">
				<h1 class="title__caps"><?php echo $page_title; ?></h1>
				<p class="intro"><?php echo $hero_copy; ?></p>
			</header><!-- /header -->
		</div>

		<section class="event-detail">
			<div class="event-detail__intro">
				<div class="event-detail__subnav subnav-container">
					<h3 class="title"><?php echo $page_title; ?></h3>
					<ul>
						<li class="anchor-link" data-link-source="overview">Overview</li>
						<?php if (!empty($field_eaw_weddings_title)): ?>
						<li class="anchor-link" data-link-source="wedding">Weddings</li>
						<?php endif; ?>
						<?php if (!empty($field_eaw_corporate_title)): ?>
						<li class="anchor-link" data-link-source="corporate">Corporate</li>
						<?php endif; ?>
						<?php if (!empty($field_eaw_group_title)): ?>
						<li class="anchor-link" data-link-source="group">Groups</li>
						<?php endif; ?>
					</ul>
				</div>

				<p data-anchor="overview"><?php echo nl2br($field_eaw_overview_text); ?></p>
				<p class="event-detail__intro__cta"><?php echo nl2br($field_eaw_overview_cta_text); ?></p>
			</div>
		</section>

		<?php if ( !empty($field_image_url) ): ?>
		<div class="image__full" data-anchor="wedding">
			<?php echo '<img src="'.$field_image_url.'" alt="">' ?>
		</div>
		<?php endif; ?>
		<section class="background-change">
			<section class="content-row__overflow-up" >
				<div class="content-row__wrapper">
					<div class="content-row__copy">
						<header>
							<h3 class="title"><?php echo $field_eaw_weddings_title; ?></h3>
							<span class="underline"></span>
						</header><!-- /header -->
						<p><?php echo $field_eaw_weddings_copy; ?></p>
						<ul>
							<?php foreach($field_eaw_weddings_list_items_array as $wedding_item) {
								$item = $wedding_item['value'];
								echo '<li>'.$item.'</li>';
							}

							?>
						</ul>
					</div>

					<?php if ( !empty( $field_eaw_weddings_images_1 ) ):  ?>
						<div class="content-row__image" style="background:url('<?php echo $field_eaw_weddings_images_1; ?>')center center no-repeat;background-size:cover;"></div>
					<?php endif; ?>
				</div>
			</section>
			<?php  if ( !empty($field_eaw_weddings_images_array) ): ?>
			<div class="flex content-grid__secondary">
				<div class="instagram-row">
					<?php if (!empty($field_eaw_weddings_images_2)) : ?>
						<div class="instagram-block">
							<img src="<?php echo $field_eaw_weddings_images_2; ?>" alt="">
						</div>
					<?php endif; ?>
					<?php if (!empty($field_eaw_weddings_images_3)) : ?>
						<div class="instagram-block">
							<img src="<?php echo $field_eaw_weddings_images_3; ?>" alt="">
						</div>
					<?php endif; ?>
				</div>
				<?php if ( !empty($field_eaw_weddings_quote) ): ?>
				<div class="content-grid__secondary__quote">
					<aside class="quote-block">
						<blockquote>
							<p class="quote">"<?php echo $field_eaw_weddings_quote; ?>"</p>
							<?php if (!empty($field_eaw_weddings_quote_name) ): ?>
							<cite>-<?php echo $field_eaw_weddings_quote_name; ?></cite>
							<?php endif; ?>
						</blockquote>
						<?php if ( !empty($field_eaw_weddings_quote_details) ): ?>
						<p class="quote__detail"><?php echo $field_eaw_weddings_quote_details; ?></p>
						<?php endif; ?>
					</aside>
				</div>
				<?php endif; ?>
			</div>
			<?php endif; ?>
			<?php if (!empty($wrapped_node->field_image_gallery)) { ?>
			<section class="event__content__gallery image-gallery__parent">
				<div class="image-gallery__navigation">
					<div class="image-gallery__navigation-left"></div>
					<div class="image-gallery__navigation-right"></div>
				</div>
				<div class="image-gallery__photographer">
					<div class="inner image-gallery-photographer">
						<?php  foreach($wrapped_node->field_image_gallery as $image) { ?>
						<p><?php echo $image->field_image_caption->value(); ?></p>
						<?php } ?>
					</div>
				</div>
				<div class="image-gallery">
					<?php  foreach($wrapped_node->field_image_gallery as $image) { ?>
							<div class="image-gallery-image-wrapper">
								 <img src="<?php echo nret_parse_image_url($image->field_image->value()); ?>" alt="">
							 </div>
						<?php } ?>
				</div>
			</section> <!-- End image Gallery -->
			<?php } ?>
			<?php if ( !empty($field_eaw_weddings_list_items_array) ): ?>
			<section class="event__content__list">
				<div class="inner">
					<header>
						<h3 class="title">Wedding Locations</h3>
						<span class="underline"></span>
					</header>

					<div class="numbered-list">

						<?php
								$wrapped_node = entity_metadata_wrapper('node',$node);
							    $weddings_locations = $wrapped_node->field_eaw_weddings_locations->value();
							    $list_count = 1;


							    foreach($weddings_locations as $wedding_item)

							    {
									$wedding_item_title = $wedding_item->field_locations_title[LANGUAGE_NONE][0]['value'];
									$wedding_item_copy = $wedding_item->field_lcations_copy[LANGUAGE_NONE][0]['value'];
									$destination_nid = $wedding_item->field_destination[LANGUAGE_NONE][0]['target_id'];

									echo '<div class="numbered-item">';
										echo '<div class="numbered-item__number">';
										if ($list_count < 10) {
											echo '<p>0'. $list_count.'</p>';
								    	} else {
								    		echo '<p>'. $list_count.'</p>';
								    	}
											echo '<span class="strike"></span>';
										echo '</div>';
										echo '<div class="numbered-item__information">';
											echo '<h6 class="title"><a href="/node/'.$destination_nid.'">'.$wedding_item_title.'</a></h6>';
											echo '<p><a href="/node/'.$destination_nid.'">'.$wedding_item_copy.'</a></p>';
										echo '</div>';
									echo '</div>';

									$list_count++;
							    }
						 ?>
					</div>
				</div>
			</section>
			<?php endif; ?>
			<?php if ( !empty($field_eaw_corporate_title) ): ?>
			<section class="event__content-grid content-grid content-grid__multi event__content-grid__corporate" data-anchor="corporate">
				<div class="flex content-grid__multi-wrapper">
					<div class="content-grid__multi-copy">
						<article class="inner">
							<header class="subtitle">
								<h3 class="title"><?php echo $field_eaw_corporate_title; ?></h3>
								<span class="underline"></span>
							</header><!-- /header -->
							<?php if ( !empty($field_eaw_corporate_copy) ): ?>
								<p><?php echo $field_eaw_corporate_copy; ?></p>
							<?php endif; ?>
						</article>
					</div>
					<?php if (!empty($field_eaw_corporate_image)  ): ?>
					<div class="content-listing__map">
						<img src="<?php echo $field_eaw_corporate_image; ?>" alt="">
					</div>
					<?php endif; ?>
				</div>
			</section>
			<?php endif; ?>
			<?php if ( !empty($field_eaw_corporate_locations) ): ?>
			<section class="event__content__list">
				<div class="inner">
					<header>
						<h3 class="title">Corporate Events Locations</h3>
						<span class="underline"></span>
					</header>

					<div class="numbered-list">
						<?php

							$wrapped_node = entity_metadata_wrapper('node',$node);
						    $corporate_locations = $wrapped_node->field_eaw_corporate_locations->value();
						    $list_count = 1;


						    foreach($corporate_locations as $corporate_item)

						    {
								$corporate_item_title = $corporate_item->field_locations_title[LANGUAGE_NONE][0]['value'];
								$corporate_item_copy = $corporate_item->field_lcations_copy[LANGUAGE_NONE][0]['value'];
								$destination_nid = $corporate_item->field_destination[LANGUAGE_NONE][0]['target_id'];

								echo '<div class="numbered-item">';
									echo '<div class="numbered-item__number">';
									if ($list_count < 10) {
										echo '<p>0'. $list_count.'</p>';
							    	} else {
							    		echo '<p>'. $list_count.'</p>';
							    	}
										echo '<span class="strike"></span>';
									echo '</div>';
									echo '<div class="numbered-item__information">';
										echo '<h6 class="title"><a href="/node/'.$destination_nid.'">'.$corporate_item_title.'</a></h6>';
										echo '<p><a href="/node/'.$destination_nid.'">'.$corporate_item_copy.'</a></p>';
									echo '</div>';
								echo '</div>';

								$list_count++;
						    }


						?>

					</div>
				</div>
			</section>
			<?php endif; ?>
			<?php if (!empty($field_eaw_group_title)): ?>
			<section class="event__content-grid content-grid content-grid__multi event__content-grid__group" data-anchor="group">
				<div class="flex content-grid__multi-wrapper">
					<div class="content-grid__multi-copy">
						<article class="inner">
							<header class="subtitle">
								<h3 class="title"><?php echo $field_eaw_group_title; ?></h3>
								<span class="underline"></span>
							</header><!-- /header -->
							<?php if (!empty($field_eaw_group_copy) ): ?>
								<p><?php echo $field_eaw_group_copy; ?></p>
							<?php endif; ?>
						</article>
					</div>
					<div class="content-listing__map">
						<img src="<?php echo nret_parse_image_url($field_eaw_group_image[0]); ?>" alt="">
					</div>
				</div>
			</section>
			<?php endif; ?>

			<?php if( !empty($field_eaw_group_locations) ): ?>
			<section class="event__content__list">
				<div class="inner">
					<header>
						<h3 class="title">Group Events Location</h3>
						<span class="underline"></span>
					</header>

					<div class="numbered-list">
						<?php

							$wrapped_node = entity_metadata_wrapper('node',$node);
						    $group_locations = $wrapped_node->field_eaw_group_locations->value();
						    $list_count = 1;


						    foreach($group_locations as $group_item)

						    {
								$group_item_title = $group_item->field_locations_title[LANGUAGE_NONE][0]['value'];
								$group_item_copy = $group_item->field_lcations_copy[LANGUAGE_NONE][0]['value'];
								$destination_nid = $group_item->field_destination[LANGUAGE_NONE][0]['target_id'];

								echo '<div class="numbered-item">';
									echo '<div class="numbered-item__number">';
									if ($list_count < 10) {
										echo '<p>0'. $list_count.'</p>';
							    	} else {
							    		echo '<p>'. $list_count.'</p>';
							    	}
										echo '<span class="strike"></span>';
									echo '</div>';
									echo '<div class="numbered-item__information">';
										echo '<h6 class="title"><a href="/node/'.$destination_nid.'">'.$group_item_title.'</a></h6>';
										echo '<p><a href="/node/'.$destination_nid.'">'.$group_item_copy.'</a></p>';
									echo '</div>';
								echo '</div>';

								$list_count++;
						    }


						?>

					</div>
			</section>
		<?php endif; ?>

		</section>

	</div>
</section>
