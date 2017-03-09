<?php
	$wrapped_node = entity_metadata_wrapper('node',$node);

	$toc_array = $wrapped_node->field_term_and_policies;

	$count = 1;
?>

<section class="toc tertiary">
<div class="wrapper">
		<div class="hero">
			<header>
				<h1 class="title__caps"><?php echo $wrapped_node->title->value(); ?></h1>
				<p class="intro"><?php echo $wrapped_node->field_intro_text->value(); ?></p>
			</header>
		</div>
		<section class="toc__details-wrapper">
			<div class="toc__information">
				<div class="wrapper">
					<ul>
						<li><a class="anchor-link nolink" href="#0" data-link-source="USTOC">US Terms and Policies</a></li>
						<li><a class="anchor-link nolink" href="#0" data-link-source="UKTOC">UK Terms and Policies</a></li>
					</ul>
					<?php foreach ($toc_array as $toc) {
						if ($count == 1) { $anchor = "USTOC"; } else { $anchor = "UKTOC";} ?>

						<header data-anchor="<?php echo $anchor; ?>">
							<h3 class="title"><?php echo $toc->field_title->value(); ?></h3>
							<span class="underline"></span>
						</header>
						<article class="toc__content">
						<p class="paragraph">
							<?php echo nl2br($toc->field_paragraph->value()) ?>
						</p>
						</article>


					<?php $count++; } ?>

				</div>
			</div>
		</section>
	</div>
</section>
