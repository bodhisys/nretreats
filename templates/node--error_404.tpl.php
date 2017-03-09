<?php  
$wrapped_node = entity_metadata_wrapper('node',$node); 
?>
<section class="error-404">
	<div class="wrapper">
		<div class="error-404__content">
			<div class="content-container">
				<h1 class="title"><?php echo variable_get('nret_honeheader_errorsorry_copy','Sorry, but the page you were looking for wasn\'t found.'); ?></h1>
				<p><a href="/">Click here</a> for the home page.</p>
			</div>
		</div>
	</div>
</section>
