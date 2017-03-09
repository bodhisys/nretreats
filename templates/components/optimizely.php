<?php
$optimizely_node = menu_get_object();
$optimizely_nids = array('1402', '2381, 1173');
if ($optimizely_node && ($optimizely_node->type === 'retreat' || in_array($optimizely_node->nid, $optimizely_nids))) :
?>
<script src="https://cdn.optimizely.com/js/5681700292.js"></script>
<?php endif; ?>
