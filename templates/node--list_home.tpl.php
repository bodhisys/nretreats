<?php 
$wrapped_node = entity_metadata_wrapper('node',$node);
$page_title = $wrapped_node->title->value();

?>

<section class="list-home">
	<div class="wrapper">
		<div class="list-home__hero">
			<header>
				<h1 class="title__caps"><?php echo $page_title; ?></h1>
			</header><!-- /header -->
		</div>
		<section class="list-home__content-wrapper">
			<div class="list-home__content">
				<header>
					<h3 class="title"><?php echo $wrapped_node->field_subheader->value(); ?></h3>
					<span class="underline"></span>
				</header><!-- /header -->
				<p><?php echo $wrapped_node->field_intro_text->value(); ?></p>
				<section class="list-home__block-row">
				<?php 
					$i=1;
					foreach ($wrapped_node->field_lyh_section as $section)
					{
					    echo '<div class="list-home__block">';
					   		echo '<div class="list-home__block__copy">';
					    		echo '<h4>'.$section->field_title->value().'</h4>';
					   			echo '<p>'.$section->field_copy->value().'</p>';
					    	echo '</div>';
					    	echo '<div class="list-home__block__image"><img src="'.nret_parse_image_url($section->field_image->value()).'"></div>';
					    echo '</div>';

					    $i++;
					}

				?>
				</section>
				<section class="list-home__instructions">
					<header>
						<h3 class="title"><?php echo $wrapped_node->field_join_the_collection_title->value(); ?></h3>
						<span class="underline"></span>
					</header><!-- /header -->
					<div class="numbered-list">
						<?php  
							$j=1;
							$list_count = 1;
							foreach ($wrapped_node->field_join_the_collection_points as $point)
							{
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
										echo '<h6 class="title">'.$point->value().'</h6>';
									echo '</div>';
								echo '</div>';
							    $j++; 
								$list_count++;
							}

						?>
					</div>

				</section>
				<a href="/acquisition" class="btn btn__blue">Apply Now</a>
			</div>
		</section>
		<section class="list-home__cta-wrapper funky-bg">
			<div class="wrapper">
				<div class="list-home__cta-block">
					<h4><?php echo $wrapped_node->field_lyh_ltb_title->value(); ?></h4>
					<p><?php echo $wrapped_node->field_lyh_ltb_copy->value(); ?></p>
					<h4 class="title"><?php echo $wrapped_node->field_lyh_ltb_cta->value(); ?></h4>
				</div>
				<div class="list-home__cta-block">
					<h4><?php echo $wrapped_node->field_lyh_aao_title->value(); ?></h4>
					<p><?php echo $wrapped_node->field_lyh_aao_copy->value(); ?></p>
					<h4 class="title"><?php echo $wrapped_node->field_lyh_aao_cta->value(); ?></h4>
				</div>
			</div>
		</section>
	</div>
</section>