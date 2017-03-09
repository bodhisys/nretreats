<?php
$userglobalposition = nret_get_usergloballocation(isset($node) ? $node : null);
if($userglobalposition == 'uk' || $userglobalposition == 'ie')
{
    $community_featured_field = 'field_re_oc_featured_com_uk';
    $openmenu = 'uk';
}else {
    $community_featured_field = 'field_re_oc_featured_communities';
    $openmenu = 'us';
}
$wrapped_node = entity_metadata_wrapper('node', $node);
$communities_subnav_list = nret_real_estate_get_communities();
$us_community = $communities_subnav_list['us'];
$uk_community = $communities_subnav_list['uk'];
?>
<div class="real-estate-homepage" data-node-id="<?php echo $wrapped_node->nid->value(); ?>">
	<?php
	$field_re_header = $wrapped_node->field_re_header->value();
	$field_re_subheader = $wrapped_node->field_re_subheader->value();
	$field_re_text_color = $wrapped_node->field_re_text_color->value();
	$field_re_image_url = nret_parse_image_url($wrapped_node->field_re_image->value());
	?>
	<header
		class="real-estate-hero<?php if ($field_re_text_color) echo ' real-estate-hero--' . $field_re_text_color; ?>"
		style="background-image: url('<?php echo $field_re_image_url; ?>');"
	>
		<div class="real-estate-hero__text">
			<h1 class="title__caps"><?php echo $field_re_header; ?></h1>
			<?php if ($field_re_subheader) : ?>
				<p class="intro"><?php echo $field_re_subheader; ?></p>
			<?php endif; ?>
		</div>
		<?php if (false) : ?>
			<div class="real-estate-hero__video">
				<video poster="" autoplay loop>
					<source src="" type="video/mp4">
				</video>
			</div>
		<?php endif; ?>
	</header>
	<div class="real-estate-content">
		<aside class="real-estate-homepage-nav">
			<ul class="real-estate-homepage-nav__menu">
				<li class="real-estate-homepage-nav__menu-item<?php if ($openmenu == 'us') echo ' active'; ?>">
					<button type="button">US <span class="arrow"></span></button>
					<ul class="real-estate-homepage-nav__submenu">
            <li class="heading">Browse Our Locations</li>
						<?php foreach ($us_community as $community) :?>
							<li><a href="<?php echo $community['url'];?>"><?php echo $community['name']; ?></a></li>
						<?php endforeach; ?>
					</ul>
				</li>
				<li class="real-estate-homepage-nav__menu-item<?php if ($openmenu == 'uk') echo ' active'; ?>">
					<button type="button">UK <span class="arrow"></span></button>
					<ul class="real-estate-homepage-nav__submenu">
            <li class="heading">Browse Our Locations</li>
						<?php foreach ($uk_community as $community) :?>
							<li><a href="<?php echo $community['url'];?>"><?php echo $community['name']; ?></a></li>
						<?php endforeach; ?>
					</ul>
				</li>
			</ul>
		</aside>

		<?php
		$field_re_oc_header = $wrapped_node->field_re_oc_header->value();
		$field_re_oc_subheader = $wrapped_node->field_re_oc_subheader->value();
		$field_re_oc_featured_communities = $wrapped_node->{ $community_featured_field }->value();
		if (!empty($field_re_oc_featured_communities)) :
		?>
		<section class="real-estate-homepage-communities">
			<header class="real-estate-homepage-communities__header">
				<h2 class="heading"><?php echo $field_re_oc_header; ?></h2>
				<?php if ($field_re_oc_subheader) : ?>
					<p class="subheading"><?php echo $field_re_oc_subheader; ?></p>
				<?php endif; ?>
			</header>
			<div class="real-estate-homepage-communities__teasers">
				<?php foreach ($field_re_oc_featured_communities as $community_teaser) : ?>
					<?php include 'components/real-estate-community-teaser.php'; ?>
				<?php endforeach; ?>
			</div>
		</section>
		<?php endif; ?>

		<div class="real-estate-homepage-learn-more">
			<?php
			$field_re_lyh_header = $wrapped_node->field_re_lyh_header->value();
			$field_re_lyh_copy = $wrapped_node->field_re_lyh_copy->value();
			$field_re_lyh_learn_more_cta = $wrapped_node->field_re_lyh_learn_more_cta->value();
			?>
			<section class="news-block">
				<div class="news-block__copy">
					<h3 class="heading"><?php echo $field_re_lyh_header; ?></h3>
					<p class="text"><?php echo $field_re_lyh_copy; ?></p>
					<a href="/list-your-home" class="strike" target="_blank"><?php echo $field_re_lyh_learn_more_cta; ?> <span class="side-arrow"></span></a>
				</div>
			</section>
			<?php
			$field_re_nrr_header = $wrapped_node->field_re_nrr_header->value();
			$field_re_nrr_copy = $wrapped_node->field_re_nrr_copy->value();
			?>
			<section class="news-block">
				<div class="news-block__copy">
					<h3 class="heading"><?php echo $field_re_nrr_header; ?></h3>
					<p class="text"><?php echo $field_re_nrr_copy ?></p>
					<a href="/" class="strike" target="_blank">Learn More <span class="side-arrow"></span></a>
				</div>
			</section>
		</div>
	</div>
</div>
<?php drupal_add_js('jQuery(document).ready(function () { nret.realEstateHomepage.init(); });', 'inline'); ?>
