<?php
$current_node = menu_get_object();
$criteo_node_types = array(
	'destination' => 'ListingPage',
	'retreat' => 'ProductPage',
	'booking' => array(
		'default' => 'BasketPage',
		'postpayment' => 'TransactionPage'
	)
);
?>
<script type="text/javascript">
	var dataLayer = dataLayer || [];
	dataLayer.push({
		<?php if ($current_node && array_key_exists($current_node->type, $criteo_node_types)) : ?>
			<?php if ($current_node->type === 'destination') : ?>
				'PageType': '<?php echo $criteo_node_types[$current_node->type]; ?>',
				'ProductIDList' : [
					<?php foreach ($current_node->related_retreats as $retreat) :
						$wrapped_retreat = entity_metadata_wrapper('node', $retreat);
					?>
					'<?php echo $wrapped_retreat->field_api_id->value(); ?>',
					<?php endforeach; ?>
				],
				'email': ''
			<?php elseif ($current_node->type === 'retreat') :
				$wrapped_node = entity_metadata_wrapper('node', $current_node);
				$retreat_id = $wrapped_node->field_api_id->value();
			?>
				'PageType': '<?php echo $criteo_node_types[$current_node->type]; ?>',
				'ProductID': ['<?php echo $retreat_id; ?>'],
				'email': ''
			<?php elseif ($current_node->type === 'booking') : ?>
				<?php if ($current_node->booking_step === 'postpayment') :
					$basket = $current_node->booking_data['basket'];
					$basket = $basket->data;
				?>
					'PageType': '<?php echo $criteo_node_types[$current_node->type]['postpayment']; ?>',
					'ProductTransactionProducts': [
						{
							id: '<?php echo $basket->BasketElements[0]->ObjectId; ?>',
							price: '<?php echo $basket->BasketTotal + $basket->BasketTax; ?>',
							quantity: 1
						}
					],
					'TransactionID': '<?php echo $basket->BookingId; ?>',
					'email': ''
				<?php else :
					$basket = $current_node->booking_data['basket'];
				?>
					'PageType': '<?php echo $criteo_node_types[$current_node->type]['default']; ?>',
					'ProductBasketProducts': [
						{
							id: '<?php echo $basket->BasketElements[0]->ObjectId; ?>',
							price: '<?php echo $basket->BasketTotal + $basket->BasketTax; ?>',
							quantity: 1
						}
					],
					'email': '<?php if ($basket->LeadGuestDetails->Email) echo $basket->LeadGuestDetails->Email; ?>'
				<?php endif; ?>
			<?php endif; ?>
		<?php elseif (defined('IS_NRET_HOMEPAGE')) : ?>
		'PageType': 'HomePage',
		'email': ''
		<?php else : ?>
		'email': ''
		<?php endif; ?>
	});
</script>
