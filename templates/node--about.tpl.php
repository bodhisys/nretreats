<?php
$wrapped_node = entity_metadata_wrapper('node',$node);

$page_title = $wrapped_node->title->value();

$principle_title = $wrapped_node->field_about_principles_title->value();
$principle_copy = $wrapped_node->field_about_principles_text->value();

try {
    $video_url = nret_parse_image_url($wrapped_node->field_about_hero_video->value());
}catch(Exception $e){
    $video_url = '';
}

$team_title = $wrapped_node->field_about_xplore_members_title->value();

$mobile_hero_title = $wrapped_node->field_about_title->value();
$mobile_hero_subtitle = $wrapped_node->field_about_subtitle->value();


?>




<section class="about content-start">
	<div class="wrapper">
		<div class="about__hero-wrapper">
			<div class="about__hero hero-el" style="background:url('<?php echo nret_parse_image_url($wrapped_node->field_mobile_video_poster->value()); ?>') center center no-repeat;background-size:cover;">
				<hgroup class="about__hero__mobile-header">
					<h1 class="title__caps"><?php echo $mobile_hero_title; ?></h1>
					<h6 id="launchMobileAboutVideo" class="title"><?php echo $mobile_hero_subtitle; ?></h6>
				</hgroup>
				<div class="video__bg about__full-video">
					<video autoplay loop poster="" id="aboutBgVid">
					     <source src="<?php echo $video_url; ?>" type="video/mp4">
					</video>
				</div>
			</div>
		</div>
		<div class="scroll-catch"></div>
		<section class="about__content hero-el__below">
			<header class="subnav-container">
				<div class="wrapper">
					<h3 class="title"><?php echo $principle_title; ?></h3>
					<ul class="subnav">
						<li><a class="anchor-link" href="#0" data-link-source="principles">Our Principles</a></li>
						<li><a class="anchor-link" href="#0" data-link-source="story">Our Story</a></li>
						<li><a class="anchor-link" href="#0" data-link-source="xplore">Xplore Team</a></li>
					</ul>
				</div>
			</header>

			<article class="about__intro" data-anchor="principles">
				<p class="paragraph"><?php echo $principle_copy; ?></p>
				<div class="about__intro-pillars">
					<?php
					foreach($wrapped_node->field_about_principles as $principle) {
						echo '<div class="about__intro-pillars__block">';
							echo '<h4>'.$principle->field_principle_title->value().'</h4>';
							echo '<h6 class="title">'.$principle->field_principle_description->value().'</h6>';
						echo '</div>';
					}
					?>

				</div>
			</article>
		</section>

		<section class="content-grid content-grid__multi" data-anchor="story">
			<div class="flex content-grid__multi-wrapper">
				<div class="content-grid__multi-copy">
					<article class="inner">
						<header class="subtitle">
							<h3 class="title">Our Story</h3>
							<span class="underline"></span>
						</header><!-- /header -->
						<p><?php echo  $wrapped_node->field_our_story_text->value(); ?></p>
					</article>
				</div>
				<div class="content-listing__map">
					<img src="<?php echo nret_parse_image_url( $wrapped_node->field_our_story_image->value() ); ?>" alt="">
				</div>
			</div>
			<div class="flex content-grid__secondary">
				<div class="content-grid__secondary__quote no-instagram">
					<aside class="quote-block">
						<blockquote>
							<p class="quote"><?php echo $wrapped_node->field_xplore_team_quotes[0]->field_xplore_member_quote->value(); ?></p>
						</blockquote>
						<div class="avatar-block">
							<div class="avatar-block__image">
								<div class="inner" style="background:url('<?php echo nret_parse_image_url($wrapped_node->field_xplore_team_quotes[0]->field_xplore_team_member->field_member_photo->value() );  ?>') center center no-repeat;background-size:cover;"></div>
							</div>
							<div class="avatar-block__copy">
								<p class="avatar-block__copy__name">Xplore Team -<span class="subheader"><?php echo $wrapped_node->field_xplore_team_quotes[0]->field_xplore_team_member->title->value(); ?></span></p>
								<a href="#0" data-explorer-modal="<?php  echo $wrapped_node->field_xplore_team_quotes[0]->field_xplore_team_member->nid->value(); ?>" class="strike openExplorerModal nolink">Meet <?php echo $wrapped_node->field_xplore_team_quotes[0]->field_xplore_team_member->title->value(); ?></a>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</section>
		<section class="full-bleed-caption">
			<div class="full-bleed__image">
				<?php echo '<img src="'.nret_parse_image_url($wrapped_node->field_about_large_image->value()).'" alt="">'; ?>
			</div>
		</section>
		<section class="content-grid content-grid__quote">
			<div class="flex content-grid__quote-wrapper">
				<div class="content-grid__quote-wrapper__quote-image">
					<aside class="quote-block">
						<blockquote>
							<p class="quote"><?php echo $wrapped_node->field_xplore_team_quotes[1]->field_xplore_member_quote->value(); ?></p>
						</blockquote>
						<div class="avatar-block">
							<div class="avatar-block__image">
								<div class="inner" style="background:url('<?php echo nret_parse_image_url($wrapped_node->field_xplore_team_quotes[1]->field_xplore_team_member->field_member_photo->value() );  ?>') center center no-repeat;background-size:cover;"></div>
							</div>
							<div class="avatar-block__copy">
								<p class="avatar-block__copy__name">Xplore Team -<span class="subheader"><?php echo $wrapped_node->field_xplore_team_quotes[1]->field_xplore_team_member->title->value(); ?></span></p>
								<a href="#0" data-explorer-modal="<?php  echo $wrapped_node->field_xplore_team_quotes[1]->field_xplore_team_member->nid->value(); ?>" class="strike openExplorerModal nolink">Meet <?php echo $wrapped_node->field_xplore_team_quotes[1]->field_xplore_team_member->title->value(); ?></a>
							</div>
						</div>
					</aside>
					<div class="content-grid__quote-wrapper__quote-image__image">
						<div class="inner" style="background:url('<?php echo nret_parse_image_url($wrapped_node->field_small_image->value());?>') center center no-repeat;background-size:cover;">
						</div>
					</div>
				</div>
				<div class="content-grid__quote-wrapper__image">
					<div class="inner" style="background:url('<?php echo nret_parse_image_url($wrapped_node->field_medium_image->value());?>') center center no-repeat;background-size:cover;">
					</div>
				</div>
			</div>
		</section>
		<div><h3 class="title xplore-team-title"><?php echo $team_title; ?></h3></div>
		<section class="explore-team-row image-gallery-mobile" data-anchor="xplore">
		<?php
			foreach ($wrapped_node->field_xplore_team_members as $xploremember) {  ?>
				<div class="explore-team-block">
					<div class="explore-team-block__avatar">
						<div class="inner" style="background:url('<?php echo nret_parse_image_url($xploremember->field_member_photo->value()); ?>') center center no-repeat;background-size:cover;"></div>
					</div>
					<div class="explore-team-block__copy">
						<hgroup class="explore-team-block__title">
							 <h5><?php echo $xploremember->title->value(); ?></h5>
							 <?php
							try{
							    echo '<h6 class="title">'.$xploremember->field_destination->title->value().'</h6>';
							}catch (EntityMetadataWrapperException $emwe){
							    echo "";
							}
							 ?>
							<h6 class="title"><?php echo $xploremember->field_member_title->value(); ?></h6>
						</hgroup>
						<p><?php echo $xploremember->field_member_quote->value(); ?></p>
						<div class="explore-team-block__link-wrapper">
							<a href="#0" data-explorer-modal="<?php echo $xploremember->nid->value(); ?>" class="strike openExplorerModal nolink">Meet <?php echo $xploremember->title->value(); ?><span class="strike-through"></span></a>
						</div>
					</div>
				</div>
		<?php	} ?>
		</section>
	</div>
</section>

<?php foreach ($wrapped_node->field_xplore_team_members as $xploremember) {  ?>
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
<?php } ?>

<?php foreach($wrapped_node->field_xplore_team_quotes as $member) { ?>
	<section class="about__explorer-modal about__explorer-modal-<?php echo $member->field_xplore_team_member->nid->value(); ?>" >
		<div class="wrapper">
			<div class="inner">
			<div class="about__explorer-modal__close icon icon_close"></div>
				<div class="about__explorer-modal__introduction">
					<div class="explore-team-block__avatar">
						<div class="inner" style="background:url('<?php echo nret_parse_image_url( $member->field_xplore_team_member->field_member_photo->value() ); ?>') center center no-repeat;background-size:cover;"></div>
					</div>
					<div class="about__explorer-modal__introduction__title">
						<header>
							<h3 class="title"><?php echo $member->field_xplore_team_member->title->value(); ?></h3>
						</header>
						<h6 class="title"><?php try {echo $member->field_destination->title->value().' <span class="long-dash"></span>';}catch(EntityMetadataWrapperException $emwe) {echo "";} ?> <?php echo $member->field_xplore_team_member->field_member_title->value(); ?></h6>
					</div>
				</div>
				<div class="about__explorer-modal__copy">
					<div class="about__explorer-modal__copy__quote">
						<p><?php echo $member->field_xplore_member_quote->value(); ?></p>
					</div>
					<p class="about__explorer-modal__copy__bio"><?php echo $member->field_xplore_team_member->field_member_text_for_meet_link->value(); ?></p>
				</div>
			</div>
		</div>
	</section>
<?php } ?>
<?php
	drupal_add_js('jQuery(document).ready(function () { nret.about.init(); });', 'inline');
?>
