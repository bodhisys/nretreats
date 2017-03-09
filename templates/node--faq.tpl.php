<?php 
// Wrapper over all of the site
$wrapped_node = entity_metadata_wrapper('node',$node);

// Find this data in Admin/structre/field_collection/field-list-items-items
// get value from text
// pr($wrapped_node->field_faq_questions); 

// loop over array list
// foreach($wrapped_node->field_faq_questions as $array_item) {

// 	echo $array_item->field_faq_question->value();
// 	echo $array_item->field_faq_answer->value();

// }


$hero_title = $wrapped_node->title->value();
$hero_copy = $wrapped_node->field_faq_copy->value();



?>

<section class="faq">
	<div class="wrapper">
		<div class="faq__hero">
			<header>
				<h1 class="title__caps"><?php echo $hero_title; ?></h1>
				<p class="intro"><?php echo $hero_copy; ?></p>
			</header><!-- /header -->
		</div>

		<section class="faq__content-wrapper">
			<article class="faq__content">
				<?php  

					foreach ($wrapped_node->field_faq_category as $category) {
					    $category_title = $category->field_faq_category_title->value();
					    echo '<div class="faq__content__topic">';
					    	echo '<header>';
					    		echo '<h3 class="title">'.$category_title.'</h3>';
					    		echo '<span class="underline"></span>';
					    	echo '</header>';
					    foreach($category->field_faq_questions as $question) {
					       $faq_question = $question->field_faq_question->value();
					       $faq_answer = $question->field_faq_answer->value();
					       echo '<div class="faq__block">';
							echo '<p>'.$faq_question.'</p>';
							echo '<p>'.$faq_answer.'</p>';
					       echo '</div>';
					    }
						echo '</div>';
					}

				?>
			</article>
		</section>
	</div>
</section>