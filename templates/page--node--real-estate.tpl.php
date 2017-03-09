<?php
$userglobalposition = nret_get_usergloballocation(isset($node) ? $node : null);
if($userglobalposition == 'uk' || $userglobalposition == 'ie')
{
    $openmenu = 'uk';
}else {
    $openmenu = 'us';
}
$communities_subnav_list = nret_real_estate_get_communities();
$us_community = $communities_subnav_list['us'];
$uk_community = $communities_subnav_list['uk'];
?>
<header class="real-estate-header">
	<div class="real-estate-logo">
		<a href="/real-estate">
			<img src="/themes/nretreats/images/logo_white.svg" alt="Natural Retreats logo">
			<div class="real-estate-logo-text">Real Estate</div>
		</a>
	</div>
	<button class="real-estate-mobile-navigation-open">
		<span class="icon icon-menu"></span>
	</button>
	<nav class="real-estate-navigation">
		<ul class="real-estate-menu">
			<li class="real-estate-menu-item has-subnavigation">
				<button type="button"><span>Properties</span><span class="arrow"></span></button>
				<ul class="real-estate-submenu real-estate-submenu--communities">
					<li class="real-estate-submenu-item<?php if ($openmenu == 'us') echo ' active'; ?>">
						<button type="button">US</button>
						<ul>
							<?php foreach ($us_community as $community) :?>
								<li><a href="<?php echo $community['url'];?>"><?php echo $community['name']; ?></a></li>
							<?php endforeach; ?>
						</ul>
					</li>
					<li class="real-estate-submenu-item<?php if ($openmenu == 'uk') echo ' active'; ?>">
						<button type="button">UK</button>
						<ul>
							<?php foreach ($uk_community as $community) :?>
								<li><a href="<?php echo $community['url'];?>"><?php echo $community['name']; ?></a></li>
							<?php endforeach; ?>
						</ul>
					</li>
				</ul>
			</li>
			<li class="real-estate-menu-item has-subnavigation">
				<button type="button"><span>Our Services</span><span class="arrow"></span></button>
				<ul class="real-estate-submenu">
					<li class="real-estate-submenu-item"><a href="/real-estate/services/resort-development">Resort Development</a></li>
					<li class="real-estate-submenu-item"><a href="/real-estate/services/resort-management">Resort Management</a></li>
				</ul>
			</li>
			<li class="real-estate-menu-item"><a href="/real-estate/our-difference">Our Difference</a></li>
			<li class="real-estate-menu-item"><a href="/real-estate/contact">Contact</a></li>
		</ul>
	</nav>
</header>

<div class="page-body real-estate-body">
	<?php print render($page['content']); ?>
</div>
<section class="video__player">
	<div class="video__wrapper">
		<div class="video__control__close icon icon_close"></div>
		<div class="video__wrapper-inner">
			<div id="ytVideo" class="video__modal"></div>
		</div>
		<div class="video__control-bar">
			<div class="video__control__play-pause">
				<button class="ytp-play-button ytp-button" aria-live="assertive" tabindex="32" aria-label="Pause">
					<svg width="20" height="20" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<defs>
							<path id="ytp-12" d="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26">
								<animate id="animation" begin="indefinite" attributeType="XML" attributeName="d" fill="freeze" from="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26" to="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28" dur="0.1s" keySplines=".4 0 1 1"
								repeatCount="1"></animate>
							</path>
						</defs>
						<use xlink:href="#ytp-12" class="ytp-svg-shadow"></use>
						<use xlink:href="#ytp-12" class="ytp-svg-fill"></use>
					</svg>
				</button>
			</div>
			<div class="video__control__scrubber-wrapper">
				<div id="progressBar"><div></div></div>
			</div>
			<div class="video__control__fullscreen"></div>
			<div class="video__control__share">
				<p>Share</p>
				<ul class="video__control__share__list">
					<li class="icon icon_fb"></li>
					<li class="icon icon_twitter"></li>
				</ul>
			</div>
		</div>
	</div>
</section>
<?php include 'components/global-footer.php'; ?>
