<?php 

	foreach ($view->result as $result) {
		$node = $result->_field_data['nid']['entity'];
		$explore_author_array = $node->field_xplore_team_member;
	}
	$heroimage = variable_get('nret_guide_list_hero_image',0);
	if(!$heroimage) {
		$url = 'https://images.unsplash.com/photo-1430263326118-b75aa0da770b?ixlib=rb-0.3.5&q=80&fm=jpg&s=ee3ee5b84e339f21e2ba68add9f118cf';
	} else {
		$hero_object = file_load($heroimage);
		$url = nret_parse_image_url($hero_object);
	}

?>

<section class="guides-listing">
	<div class="wrapper">
		<div class="hero" style="background:url('<?php echo $url; ?>') center center no-repeat;background-size:cover;">
			<div class="guides-listing__hero-copy">
				<hgroup>
					<h1 class="title__caps"><?php echo variable_get('nret_guide_list_headline','Explore Guides'); ?></h1>
					<p class="intro"><?php echo variable_get('nret_guide_list_bodycopy',''); ?></p>
				</hgroup>
			</div>
		</div>
		<div class="guides-listing__content">
			<div class="guides-listing__row">
				<?php 
					foreach ($view->result as $result) {
					    $node = $result->_field_data['nid']['entity'];
						try{
    						$node_guide_wrapper = entity_metadata_wrapper('node',node_load($result->nid));
    						$small_img = nret_parse_image_url($node_guide_wrapper->field_guide_small_image->value());
    						$author = $node_guide_wrapper->field_xplore_team_member;
    						$author_img = nret_parse_image_url($author->field_member_photo->value());
    						$author_name = $author->title->value();
						?>
						<div class="guide-block">
							<div class="guide-block__inner">
								<div class="guide-block__copy">
									<div class="guide-block__avatar-wrapper">
										<div class="explore-team-block__avatar"><div class="inner" style="background:url('<?php echo file_create_url($author_img) ?>') center center no-repeat;background-size:cover;"></div></div>
										<p class="guide-block__avatar-copy">Xplore Team<span> - <?php echo $author_name; ?></span></p>
									</div>
									<h4><?php echo $node_guide_wrapper->title->value(); ?></h4> 
									<p><?php echo $node_guide_wrapper->field_guide_short_intro->value(); ?></p>
									<a href="<?php echo url('node/'.$node->nid); ?>" class="strike">View Guide<span class="side-arrow"></span></a>
								</div>
								<div class="guide-block__image" style="background:url('<?php echo nret_parse_image_url($node_guide_wrapper->field_hero_image->value()); ?>') center center no-repeat;background-size:cover;"></div>
							</div>
							<?php if(!empty($small_img)) { ?>
								<div class="guide-block__image-floater"><img src="<?php echo $small_img; ?>" alt=""></div>
							<?php } ?>
						</div>
				<?php 	   }catch (Exception $e){
					           //just avoid showing that one
					       }
						} ?>
			</div>
			<?php echo theme('pager'); ?> 
			<!-- <a class="btn btn__transparent">View More</a> -->
		</div>
	</div>
</section>