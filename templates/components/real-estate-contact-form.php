<?php
$current_node_type = ($node) ? $node->type : null;
$wrapped_node = ($node) ? entity_metadata_wrapper('node', $node) : null;
$temp_communities = nret_real_estate_get_communities();
if($current_node_type == 'real_estate_community'){
	$current_cummunity = $wrapped_node->nid->value();
} else if ($current_node_type == 'real_estate_property') {
	$current_cummunity = $wrapped_node->field_rep_communities->nid->value();
}
$communities = array();
	foreach ($temp_communities as $community) {
		foreach ($community as $value) {
			array_push($communities, $value);
		}
	}
?>
<form id="real-estate-contact-form" class="real-estate-contact-form__form">
	<div class="real-estate-contact-form__user">
		<div class="input-group">
			<input type="text" name="real-estate-name" placeholder="NAME">
		</div>
		<div class="input-group">
			<input type="email" name="real-estate-email" placeholder="EMAIL ADDRESS">
		</div>
		<div class="input-group">
			<input type="tel" name="real-estate-phone" placeholder="PHONE NUMBER">
		</div>
	</div>
	<div class="real-estate-contact-form__data">
		<h3 class="heading">What can we help you with?</h3>
		<div class="content">
			<div class="input-group">
				<input type="radio" name="real-estate-topic" id="real-estate-topic-purchasing" value="purchasing">
				<label for="real-estate-topic-purchasing">Purchasing a property</label>
			</div>
			<div class="input-group">
				<input type="radio" name="real-estate-topic" id="real-estate-topic-developing" value="developing">
				<label for="real-estate-topic-developing">Developing a property</label>
			</div>
			<div class="input-group">
				<input type="radio" name="real-estate-topic" id="real-estate-topic-marketing" value="marketing">
				<label for="real-estate-topic-marketing">Marketing a property</label>
			</div>
			<div class="input-group">
				<input type="radio" name="real-estate-topic" id="real-estate-topic-other" value="other">
				<label for="real-estate-topic-other">Something else</label>
			</div>
		</div>
	</div>
	<div class="real-estate-contact-form__follow-up real-estate-contact-form__follow-up--purchasing">
		<h3 class="heading">Which location are you interested in?</h3>
		<div class="content">
			<div class="input-group">
				<select name="real-estate-community">
					<option value="none">General</option>
					<?php foreach ($communities as $community) :
						?>
						<option value="<?php echo $community['nid']; ?>" <?php echo $current_cummunity == $community['nid'] ? "selected" : "";?>><?php echo $community['name'] ?></option>
					<?php endforeach; ?>
				</select>
			</div>
		</div>
	</div>
	<div class="real-estate-contact-form__follow-up real-estate-contact-form__follow-up--developing">
		<h3 class="heading">Where is the property located?</h3>
		<div class="content">
			<div class="input-group">
				<input type="radio" name="real-estate-topic-purchasing-follow-up" id="real-estate-topic-purchasing-follow-up-us">
				<label for="real-estate-topic-purchasing-follow-up-us">U.S.</label>
			</div>
			<div class="input-group">
				<input type="radio" name="real-estate-topic-purchasing-follow-up" id="real-estate-topic-purchasing-follow-up-uk">
				<label for="real-estate-topic-purchasing-follow-up-uk">U.K. / Europe</label>
			</div>
			<div class="input-group">
				<input type="radio" name="real-estate-topic-purchasing-follow-up" id="real-estate-topic-purchasing-follow-up-other">
				<label for="real-estate-topic-purchasing-follow-up-other">Somewhere Else</label>
			</div>
		</div>
	</div>
	<div class="real-estate-contact-form__message">
		<div class="input-group">
			<input type="text" name="real-estate-source" placeholder="WHERE DID YOU HEAR ABOUT US?">
		</div>
		<div class="input-group">
			<textarea name="real-estate-message" placeholder="MESSAGE"></textarea>
		</div>
	</div>
	<div class="real-estate-contact-form__submit">
		<button type="submit">SUBMIT</button>
	</div>
</form>
