<?php 
/**
 * Notes for JAMAL!!! :D
 * 
 * I setup the site so it's using drupal internal filtering, so you just need to setup the cookie with this format
 * 
 * cookiename
 *  journal_list[type]           for the type filter and assign it the value
 *  journal_list[locations]      for the location filter and assign it the value
 *  journal_list[environment]    for the environment filter and assign it the value
 *  journal_list[experiences]    for the experiences filter and assign it the value
 *  if you have trouble assigning the name of the cookie with the "[]" notation let me know and we can change it to something like journal_list_type
 *  I recomend to update the destination cookies to the same format, if not when a user setup a location filter on destination if the cookie have
 *  the same name it's going to be automatically used here too.
 *  
 *  Since we are using internal drupal filtering, you can use pagination.
 *  To load the filtered results just make the page to reload after setting the cookie.
 *  
 *  One thing to notice is that on Views you must use
 *  $totalresults = $view->total_rows; 
 *  to get the real number of results the query returned, if you do count($view->results) you are counting how many items are you displaying 
 *  in this page only. I already adjusted the code here.
 *  Also I already included the correct function for the pagination, and it WORKS!!!! :DDD
 *  
 */

?>



<section class="journal-listing">
	<div class="wrapper">
	<?php 
       $heroimage = variable_get('nret_journal_list_hero_image',0);
       if(!$heroimage)
       {
           $url = 'https://images.unsplash.com/photo-1430263326118-b75aa0da770b?ixlib=rb-0.3.5&q=80&fm=jpg&s=ee3ee5b84e339f21e2ba68add9f118cf';
       }else{
           $hero_object = file_load($heroimage);
           $url = nret_parse_image_url($hero_object);
       }
	?>
	<div class="journal-listing__hero"  style="background:url('<?php echo $url; ?>') center center no-repeat;background-size:cover;">
		<div class="journal-listing__hero-copy">
			<hgroup>
				<h1 class="title__caps"><?php echo variable_get('nret_journal_list_headline','Special journals & Packages'); ?></h1>
				<p class="intro"><?php echo variable_get('nret_journal_list_bodycopy','Our Xplore team is here to help you find the best value for your stay. To find out more about any of our journals and packages <a href="mailto:example@example.com?subject=Hi">contact us</a> today.'); ?></p>
			</hgroup>
		</div>
	</div>

		<!-- Begin RESULTS -->
		<section class="news-row">
			<div id="journalArticleContainer" class="inner">

				<?php 

				foreach($view->result as $result) {
					$node_journal_wrapper = entity_metadata_wrapper('node',node_load($result->nid));
					$featured = $node_journal_wrapper->field_is_this_a_featured_journal->value();
					$field_journal_date = date( "M d",$node_journal_wrapper->field_journal_date->value() );
					$title = $node_journal_wrapper->title->value();
					$field_journal_type_unformat = $node_journal_wrapper->field_journal_type->value();
					$field_journal_type = str_replace("_"," ",$field_journal_type_unformat);
					$field_journal_hero_paragraph = $node_journal_wrapper->field_journal_hero_paragraph->value();
					$field_hero_image = $node_journal_wrapper->field_hero_image->value();
					$field_featured_image = $node_journal_wrapper->field_featured_image->value();
					$url = url('node/'.$node_journal_wrapper->nid->value());

					if ($featured == 1) { ?>
						<article class="journal-listing__featured-article">
							<div class="image-overlay-block">
								<div class="overlay__copy">
									<hgroup class="animated">
										<h5 class="title"><?php echo $field_journal_type; ?></h5>
										<h3 class="title"><?php echo $title; ?></h3> 
									</hgroup>
									<p class="excerpt"><?php echo $field_journal_hero_paragraph; ?></p>
									<a href="<?php echo $url; ?>" class="strike">Read Article <span class="side-arrow"></span></a>
								</div>
								<div class="image-on-image right">
									<div class="inner">
										<time pubdate><?php echo $field_journal_date; ?></time>
										<div class="image__large">
											<img src="<?php echo file_create_url($field_hero_image['uri']); ?>">
										</div>
										<div class="image__small">
											<img src="<?php echo file_create_url($field_featured_image['uri']); ?>" alt="">
										</div>
									</div>
								</div>
							</div>
						</article>

					<?php }  else { ?>
					
					<div class="news-block">
						<div class="news-block__image">	
							<time datetime="" pubdate><?php echo $field_journal_date; ?></time>
							<div class="image__large-wrapper">
							<a href="<?php echo $url; ?>">
								<img src="<?php echo file_create_url($field_hero_image['uri']); ?>">
							</a>
							</div>
						</div>
						<div class="news-block__copy">
							<hgroup>
								<h5 class="title"><?php echo $field_journal_type; ?></h5>
								<h3 class="title"><?php echo $title; ?></h3>
							</hgroup>
							<a href="<?php echo $url; ?>" class="strike">Read Article <span class="side-arrow"></span></a>
						</div>
					</div>


				<?php } } ?>

			</div>
			<div id="journalLoader" class="loader">
				<svg class="circular" viewBox="25 25 50 50">
					<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
				</svg>
			</div>
		</section>
		<!-- <?php echo $pager; ?>  -->
	</div>
</section>
<?php
	drupal_add_js('jQuery(document).ready(function () { nret.journal.init(); });', 'inline');
?>
