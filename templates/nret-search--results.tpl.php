<?php $results; ?>

<section class="search-results">
	<div class="inner">
		<div class="search__hero">
			<header>
				<h1 class="title__caps"><?php echo variable_get('nret_honeheader_searchresults_copy','Search Results'); ?></h1>
			</header>
		</div>
		<article class="search-results__content">
			<?php if(!empty($results['destination'])) { ?>
			<div class="search-results__block">
				<header>
					<h3 class="title">Destinations</h3>
					<span class="underline"></span>
				</header>
				<ul>
					<?php foreach($results['destination'] as $destination) {  ?>
						<li><a class="strike" href="<?php echo $destination['url']; ?>"><?php echo $destination['Title']; ?><span class="strike-through"></span></a></li>
					<?php } ?>
				</ul>
			</div>
			<?php  } ?>
			<?php if(!empty($results['retreat'])) { ?>
			<div class="search-results__block">
				<header>
					<h3 class="title">Retreats</h3>
					<span class="underline"></span>
				</header>
				<ul>
					<?php foreach($results['retreat'] as $retreat) {  ?>
						<li><a class="strike" href="<?php echo $retreat['url']; ?>"><?php echo $retreat['Title']; ?><span class="strike-through"></span></a></li>
					<?php } ?>
				</ul>
			</div>
			<?php  } ?>
			<?php if(!empty($results['journal'])) { ?>
			<div class="search-results__block">
				<header>
					<h3 class="title">Journals</h3>
					<span class="underline"></span>
				</header>
				<ul>
					<?php foreach($results['journal'] as $journal) {  ?>
						<li><a class="strike" href="<?php echo $journal['url']; ?>"><?php echo $journal['Title']; ?><span class="strike-through"></span></a></li>
					<?php } ?>
				</ul>
			</div>
			<?php  } ?>
			<?php if(!empty($results['offer'])) { ?>
			<div class="search-results__block">
				<header>
					<h3 class="title">Offers</h3>
					<span class="underline"></span>
				</header>
				<ul>
					<?php foreach($results['offer'] as $offer) {  ?>
						<li><a class="strike" href="<?php echo $offer['url']; ?>"><?php echo $offer['Title']; ?><span class="strike-through"></span></a></li>
					<?php } ?>
				</ul>
			</div>
			<?php  } ?>
			<?php if(!empty($results['experience'])) { ?>
			<div class="search-results__block">
				<header>
					<h3 class="title">Experiences</h3>
					<span class="underline"></span>
				</header>
				<ul>
					<?php foreach($results['experience'] as $experience) {  ?>
						<li><a class="strike" href="<?php echo $experience['url']; ?>"><?php echo $experience['Title']; ?><span class="strike-through"></span></a></li>
					<?php } ?>
				</ul>
			</div>
			<?php  } ?>
			<?php if(!empty($results['guide'])) { ?>
			<div class="search-results__block">
				<header>
					<h3 class="title">Guides</h3>
					<span class="underline"></span>
				</header>
				<ul>
					<?php foreach($results['guide'] as $guide) {  ?>
						<li><a class="strike" href="<?php echo $guide['url']; ?>"><?php echo $guide['Title']; ?><span class="strike-through"></span></a></li>
					<?php } ?>
				</ul>
			</div>
			<?php  } ?>

		</article>
	</div>
</section>