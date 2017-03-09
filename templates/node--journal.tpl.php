<?php

    $wrapped_node = entity_metadata_wrapper('node',$node);
	$article_title = $wrapped_node->title->value();
	$article_date = $wrapped_node->created->value();
	$article_type = $wrapped_node->field_journal_type->value();
	$article_author = $wrapped_node->field_journal_author->value();
	$article_hero_image = nret_parse_image_url($wrapped_node->field_hero_image->value());
	$article_hero_paragraph = $wrapped_node->field_journal_hero_paragraph->value();
	$article_sub_paragraph = $wrapped_node->field_journal_paragraph->value();
	$article_quote = $wrapped_node->field_journal_quote->value();
	$article_second_paragraph = $wrapped_node->field_journal_second_paragraph->value();
	$article_third_paragraph = $wrapped_node->field_journal_third_paragraph->value();
	$article_youtube_video_id_array = $wrapped_node->field_youtube_video->value();
	$article_youtube_video_id = $article_youtube_video_id_array['video_id'];

	$article_list_array = $wrapped_node->field_list_items;
    $article_items = $wrapped_node->field_list_items->value();
	$article_image_gallery_array = $wrapped_node->field_image_gallery->value();
?>	


<section class="journal-article">
	<div class="wrapper">
		<div class="journal-article__hero" style="background:url('<?php echo $article_hero_image; ?>') center center no-repeat;background-size:cover;">
			<div class="icon__arrow-down"></div>
		</div>
		<article class="journal-article__content">
			<hgroup>
				<h5 class="title"><?php echo  str_replace('_',' ', $article_type); ?></h5>
				<h1 class="title"><?php echo $article_title; ?></h1>
			</hgroup>
			<div class="journal-article__content__meta">
				<span class="content__meta-date datetime" data-datetime="<?php echo $article_date; ?>"></span>
				<span class="content__meta-author uppercase">By <span class="italic"><?php echo $article_author ;?></span></span>
			<!-- 	<div class="journal-article__content__meta-share">
					<a href="mailto:" class="strike">Share<span class="strike-through"></span></a> <span class="icon">F</span><span class="icon">T</span>
				</div> -->
			</div>

			<p class="intro paragraph">			
				<?php echo nl2br($article_hero_paragraph); ?>
			</p>
			<p class="paragraph">
				<?php echo nl2br($article_sub_paragraph['value']); ?>
			</p>
			
			<?php if( !empty($article_quote) ): ?>
			<aside class="journal-article__content__quote">
				<blockquote>
					<p class="quote"><?php echo $article_quote; ?></p>
					<?php if( !empty($article_quote_author) ): ?>
						<cite class="subheader">- <?php echo $article_quote_author; ?></cite>
					<?php endif; ?>
				</blockquote>
			</aside>
			<?php endif; ?>

			<p class="paragraph">
				<?php echo nl2br($article_second_paragraph['value']); ?>
			</p>

			<?php if ( !is_null($article_image_gallery_array) ) { ?>
				
			<section class="journal-article__content__gallery image-gallery__parent">
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
			</section>
			<?php } ?>

			<?php if (!is_null($article_list_array->value())): ?>

			<section class="journal-article__content__list">
				<div class="inner">
					<header>
						<h3 class="title"><?php echo $article_list_array->field_list_items_title->value(); ?></h3>
						<span class="underline"></span>
					</header>

					<div class="numbered-list">
						<?php
						    $list_count = 1;
					          foreach($article_list_array->field_list_items_items as $item) {
						      $journal_list_item =  $item->field_list_items_item_title->value();
						      $journal_list_copy = $item->field_list_items_item_summary->value();

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
										echo '<h6 class="title">'.$journal_list_item.'</h6>';
										echo '<p>'.$journal_list_copy.'</p>';
									echo '</div>';
								echo '</div>';
								$list_count++;
						   }						   
						 ?>
						
					</div>
				</div>
			</section>
			<?php endif; ?>
			<?php if (!empty($article_third_paragraph)): ?>
			<p class="paragraph"><?php echo nl2br($article_third_paragraph); ?></p>
			<?php endif; ?>
			<?php if ( !is_null($article_youtube_video_id) )
			{
			    try{
                    echo nret_youtube_show_player($article_youtube_video_id,nret_parse_image_url($wrapped_node->field_youtube_thumbnail->value()));
			    }catch (Exception $e){
			        echo nret_youtube_show_player($article_youtube_video_id);
			    } ?>

             <section class="youtube__mobile">
                    <iframe width="320" height="315" src="https://www.youtube.com/embed/<?php echo $article_youtube_video_id; ?>" frameborder="0" allowfullscreen></iframe>
            </section>
			<?php }  ?><!-- Video Playa -->
			
			
		</article> <!-- End Journal Article section -->
	</div>
</section>