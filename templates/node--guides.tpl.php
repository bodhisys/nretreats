<?php  
	$wrapped_node = entity_metadata_wrapper('node',$node); 

	$hero_image = $wrapped_node->field_hero_image->value();
	$hero_image_url = nret_parse_image_url($hero_image);
	$explore_team_author = $wrapped_node->field_xplore_team_member;


	$top_three = $wrapped_node->field_top_3_in_the_area;
	$guide_page_array = $wrapped_node->field_guide_day_by_day_;



//There is only one related destination so we do this
    // pr($wrapped_node->field_destination->value()->api_data); 
?>


<section class="guide-detail content-start">
	<div class="wrapper">
		<div class="hero" style="background:url(<?php echo $hero_image_url; ?>) center center no-repeat;background-size:cover;"></div>
		<div class="guide-detail__content">
			<div class="guide-detail__intro">
				<div class="guide-detail__avater-wrapper">
					<div class="explore-team-block__avatar">
					   <?php try{?>
						<div class="inner" style="background:url('<?php echo nret_parse_image_url( $explore_team_author->field_member_photo->value() ) ?>') center center no-repeat;background-size:cover;"></div>
						<?php }catch (Exception $e ){?>
						<div class="inner" style="background:url('/sites/default/files/default.png') center center no-repeat;background-size:cover;"></div>
						<?php }?>
					</div>
				</div>
				<div class="guide-detail__intro__caption">
					<h6 class="title"><?php echo $wrapped_node->field_guide_intro_text->value(); ?></h6>
					<?php try{?>
					<h6 class="title">with xplore expert <span><?php echo $explore_team_author->title->value(); ?></span></h6>
					<?php }catch (Exception $e){} ?>
				</div>
				<h1 class="title__caps"><?php echo $wrapped_node->title->value(); ?></h1>
				<div class="guide-detail__navigate-down" data-link-source="#0"><span class="icon icon_arrow-right"></span></div>
		<!-- 		<section class="booking-widget">
					<div class="wrapper">
						<div class="booking-widget__below">
							<hgroup>
								<h3 class="title"><?php echo $title; ?></h3>
							</hgroup>
						
						</div>
					</div>
				</section> -->
				<p class="intro" data-anchor="overview"><?php echo $wrapped_node->field_guide_short_intro->value(); ?></p>
				<div class="guide-detail__intro__copy-map">
					<p><?php echo  $wrapped_node->field_guide_long_intro->value(); ?></p>

					<div class="map-wrapper">
						  <div class="map" data-lat="<?php echo $wrapped_node->field_destination->value()->api_data->Latitude ?>" data-lng="<?php echo $wrapped_node->field_destination->value()->api_data->Longitude; ?>" data-markers="[<?php echo $wrapped_node->field_destination->value()->api_data->Latitude; ?>, <?php echo $wrapped_node->field_destination->value()->api_data->Longitude; ?>]"></div>
					</div>

				</div>
			</div>
		</div>
		<!-- BEGIN GUIDE -->
		<section class="guide-detail__post">
			<div class="wrapper">
				<div class="guide-detail__page">

					<?php if ( !is_null($guide_page_array->value()) ) { 
						foreach ( $guide_page_array as $guide ) { ?>
				
					<div class="guide-detail__page-wrapper">
						<header class="guide-detail__page__title">
							<h1 class="title"><?php echo $guide->field_title->value(); ?></h1>
						</header>
						<div class="guide-detail__column-wrapper">
							<?php if (!is_null($guide->field_guide_column->value())) { foreach($guide->field_guide_column as $guide_column) { ?>
							<article class="guide-detail__page__column">
								<?php if (!empty($guide_column->field_guide_column_title) ) {?>
									<header >
										<h3 class="title"><?php echo $guide_column->field_guide_column_title->value(); ?></h3>
										<span class="underline"></span>
									</header>
								<?php } ?>

								<?php if (!empty($guide_column->field_first_paragraph) ) {?>
									<p class="guide-detail__paragraph"><?php echo $guide_column->field_first_paragraph->value(); ?></p>
								<?php } ?>

								<?php if (!empty($guide_column->field_second_paragraph) ) {?>
									<p class="guide-detail__paragraph"><?php echo $guide_column->field_second_paragraph->value(); ?></p>
								<?php } ?>

								<?php if ( !is_null($guide_column->field_guide_list_items->value()) ) { ?>

								<div class="numbered-list">
									<?php $list_count = 1; foreach ($guide_column->field_guide_list_items as $list_item) { ?>
									<div class="numbered-item">
										<div class="numbered-item__number">
											<?php  
												if ($list_count < 10) {
													echo '<p>0'. $list_count.'</p>';
										    	} else {
										    		echo '<p>'. $list_count.'</p>';
										    	}
											?>
											<span class="strike"></span>
										</div>
										<div class="numbered-item__information">
											<h6 class="title"><?php echo $list_item->field_list_items_item_title->value(); ?></h6>
											<p><?php echo $list_item->field_list_items_item_summary->value() ?></p>
										</div>
									</div>
									<?php  $list_count++;} ?>
								</div>
								<?php } ?>

								<?php 
								if ( !is_null($guide_column->field_guide_main_image->value()) ) { ?>
								<div class="guide-detail__main-image">
									<img src="<?php echo nret_parse_image_url($guide_column->field_guide_main_image->value()) ; ?>" alt="">
								</div>
								<?php } ?>
								
								<?php if( !is_null($guide_column->field_gallery->value()) ) { 
										if( $guide_column->field_gallery_type->value() == "one" ) {
											$gallery_type = "1";
										} elseif ($guide_column->field_gallery_type->value() == "two") {
											$gallery_type = "2";
										} else {
											$gallery_type = "3";
										}
									?>
								<div class="guide-detail__image-wrapper image-wrapper-<?php echo $gallery_type; ?>">
									<?php foreach( $guide_column->field_gallery->value() as $gallery_item ) { ?>									
										<div class="guide-detail__image"><img src="<?php echo nret_parse_image_url($gallery_item); ?>" alt=""></div>
									<?php } ?>
								</div>

								<?php } ?>
							</article>
							<?php } } ?>
						
						</div>
					</div>
					
				<?php } } ?>
				</div>
			</div>
		</section>
		
            <?php 
                $youtube = $wrapped_node->field_youtube_video->value();
            if ( !empty( $youtube['video_id']) ) {
                echo nret_youtube_show_player($youtube['video_id'],nret_parse_image_url($wrapped_node->field_youtube_thumbnail->value())); ?>

             <section class="youtube__mobile">
                    <iframe width="320" height="315" src="https://www.youtube.com/embed/<?php echo $youtube['video_id']; ?>" frameborder="0" allowfullscreen></iframe>
            </section>

        <?php      }  ?>

		<section class="guide-detail__locals-wrapper">
			<hgroup>
				<h3 class="title">Local Tips & Expertise</h3>
				<h4>Call the Xplore Team to find out more<br><?php echo $wrapped_node->field_xplore_team_general_phone->value(); ?></h4>
			</hgroup>

			<section class="explore-team-row image-gallery-mobile" data-anchor="xplore">
			<?php  
				foreach ($wrapped_node->field_xplore_team_members as $xploremember) {
					echo '<div class="explore-team-block">';
						echo '<div class="explore-team-block__avatar">';
						try{
							echo '<div class="inner" style="background:url('.nret_parse_image_url( $explore_team_author->field_member_photo->value()).') center center no-repeat;background-size:cover;"></div>';
						}catch (Exception $e){
						    echo '<div class="inner" style="background:url(/sites/default/files/default.png) center center no-repeat;background-size:cover;"></div>';
						}
						echo '</div>';
						echo '<div class="explore-team-block__copy">';
							echo '<hgroup class="explore-team-block__title">';
								echo '<h5>'.$xploremember->title->value().'</h5>';
								try{
								    echo '<h6 class="title">'.$xploremember->field_destination->title->value().'</h6>';
								}catch (EntityMetadataWrapperException $emwe){
								    echo "";
								}
								echo '<h6 class="title">'.$xploremember->field_member_title->value().'</h6>';
							echo '</hgroup>';
							echo '<p>'.$xploremember->field_member_quote->value().'</p>';
							echo '<div class="explore-team-block__link-wrapper">';
								echo '<a href="#0" data-explorer-modal="'.$xploremember->nid->value().'" class="strike openExplorerModal nolink">Meet '.$xploremember->title->value().'<span class="side-arrow"></span></a>';
							echo '</div>';
						echo '</div>';
					echo '</div>';
				}
			?>
			</section> <!-- End explorer row -->

		</section>
		<?php if (!is_null($top_three)) { ?>
		<section class="guide-detail__top-area">
			<header>
				<h3 class="title">Our Top 3's in the Area</h3>
				<span class="underline"></span>
			</header>
			<aside class="guide-detail__top-area__wrapper image-gallery-mobile">
				<?php foreach($top_three as $top) { ?>
				<div class="guide-detail__top-area__block">
					<div class="guide-detail__top-area__block__image">
						<img src="<?php echo nret_parse_image_url($top->field_top3_image->value()); ?>" alt="">
					</div>
					<h6 class="title"><?php echo $top->field_top3_category->value(); ?></h6>
					<div class="guide-detail__top-area__block__list">
						<?php foreach($top->field_top3_items as $top_list_item) { ?>
						<div class="guide-detail__top-area__block__list-item">
							<p><?php echo $top_list_item->field_top3_item_name->value(); ?></p>
							<p><?php echo $top_list_item->field_top3_item_address_or_web->value(); ?></p>
							<h6 class="title"><?php echo $top_list_item->field_top3_item_telephone->value() ?></h6>
						</div>
						<?php } ?>
					</div>
				</div>
				<?php } ?>
			</aside>
		</section>
		<?php } ?>
		<div class="guide-detail__destination-wrapper">
			<a href="<?php echo url('node/'.$wrapped_node->field_destination->value()->nid); ?>" class="destination-listing__block">
				<div class="destination-listing__copy">
					<div class="wrapper">
						<hgroup>
						<?php 
						try{
						    $g_region = $wrapped_node->field_destination->value()->api_data->GeographicRegion;
						    if(!empty($g_region))
						    {
						        $g_region = ', '.$g_region;
						    }
						}catch (Exception $e){
						    $g_region = '';
						}
						?>
							<p class="strike"><?php echo $wrapped_node->field_destination->value()->title.$g_region; ?></p>
							<h3 class="title"><?php echo $wrapped_node->field_destination->value()->api_data->CategoryCount; ?> Retreats</h3>
						</hgroup>
						<p><?php echo $wrapped_node->field_destination->value()->api_data->Summary ?></p>
						<span class="destination-listing__copy__price">Starting from <span class="price"><?php echo nret_get_currency($wrapped_node->field_destination->value()->api_data->RegionId)." ".((!empty($wrapped_node->field_destination->value()->api_data->FromPrice) && !is_null($wrapped_node->field_destination->value()->api_data->FromPrice))?$wrapped_node->field_destination->value()->api_data->FromPrice:$wrapped_node->field_destination->value()->api_data->destination_from_price); ?> / night</span></span>
					</div>
				</div>
				<div class="destination-listing__image" style="background:url('<?php echo $wrapped_node->field_destination->value()->api_data->Image2; ?>') center center no-repeat;background-size:cover;">
				<img src="<?php echo $wrapped_node->field_destination->value()->api_data->Image1; ?>" alt=""></div>
				<div class="destination-listing__image" style="background:url('<?php echo $wrapped_node->field_destination->value()->api_data->Image1; ?>') center center no-repeat;background-size:cover;"></div>
			</a>
		</div>
	</div>
</section>


<?php foreach ($wrapped_node->field_xplore_team_members as $xploremember) { ?>
<section class="about__explorer-modal about__explorer-modal-<?php echo $xploremember->nid->value(); ?>" >
	<div class="wrapper">
		<div class="inner">
		<div class="about__explorer-modal__close icon icon_close"></div>
			<div class="about__explorer-modal__introduction">
				<div class="explore-team-block__avatar">
					<div class="inner" style="background:url('<?php echo nret_parse_image_url($xploremember->field_member_photo->value()); ?>') center center no-repeat;background-size:cover;"></div>
				</div>
				<div class="about__explorer-modal__introduction__title">
					<header>
						<h3 class="title"><?php echo $xploremember->title->value(); ?></h3>
					</header>
					<h6 class="title"><?php try {echo $xploremember->field_destination->title->value().' <span class="long-dash"></span>';}catch(EntityMetadataWrapperException $emwe) {echo "";} ?> <?php echo $xploremember->field_member_title->value(); ?></h6>
				</div>
			</div>
			<div class="about__explorer-modal__copy">
				<div class="about__explorer-modal__copy__quote">
					<p><?php echo $xploremember->field_member_quote->value(); ?></p>
				</div>
				<p class="about__explorer-modal__copy__bio"><?php echo $xploremember->field_member_text_for_meet_link->value(); ?></p>
			</div>
		</div>
	</div>
</section>
<?php 	} ?>
