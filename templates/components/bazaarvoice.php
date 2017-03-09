<?php
$bv_env = variable_get('nret_bvseo_mode', 0);
if ($bv_env == 0) :
?>
<script type="text/javascript" src="https://display.ugc.bazaarvoice.com/bvstaging/static/naturalretreats/en_US/bvapi.js"></script>
<?php else : ?>
<script type="text/javascript" src="https://display.ugc.bazaarvoice.com/static/naturalretreats/en_US/bvapi.js"></script>
<?php endif; ?>
