<?php
$nret_globalmessage_status = variable_get('nret_globalmessage_status', 0);
$nret_globalmessage_title = variable_get('nret_globalmessage_title', '');
$nret_globalmessage_copy = variable_get('nret_globalmessage_copy', '');
$nret_globalmessage_url = variable_get('nret_globalmessage_url', '');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN" "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" version="XHTML+RDFa 1.0" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>>
<head profile="<?php print $grddl_profile; ?>">
	<?php print $head; ?>
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title><?php print $head_title; ?></title>
	<?php include 'components/optimizely.php'; ?>
	<?php include 'components/typekit.php'; ?>
	<!--  style to load BEFORE hero element. necessary to hide hero element which is inline to the element -->

<?php
switch(substr(current_path(), 0,2))
{
    case 'uk':
    case 'ie':
    case 'us':
		echo '<link rel="stylesheet" type="text/css" href="/themes/nretreats/css/Site.min.css">';
		break;
    default:
        echo '<link rel="stylesheet" type="text/css" href="/themes/nretreats/css/style.min.css">';
        break;
}
?>

	
	
	<?php print $styles; ?>
	<?php print $scripts; ?>
	<?php include 'components/bazaarvoice.php'; ?>
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
<h1>TEST</h1>
	<?php include 'components/criteo.php'; ?>
	<?php include 'components/google-tag-manager.php'; ?>
	<div id="skip-link"><a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a></div>
	<?php
	if ($nret_globalmessage_status) :
		if (!isset($_SESSION['global_message_shown'])) :
			$_SESSION['global_message_shown'] = 1;
	?>
		<aside id="global-message" class="modal">
			<div class="container">
				<?php if ($nret_globalmessage_title) : ?>
					<h2><?php echo $nret_globalmessage_title; ?></h2>
				<?php elseif ($nret_globalmessage_title) : ?>
					<h2><?php echo $nret_globalmessage_title; ?></h2>
				<?php endif; ?>
				<?php if ($nret_globalmessage_copy) : ?>
					<p><?php echo $nret_globalmessage_copy; ?></p>
				<?php endif; ?>
				<?php if ($nret_globalmessage_url) : ?>
					<div class="cta"><a href="<?php echo $nret_globalmessage_url; ?>">Learn More</a></div>
				<?php endif; ?>
				<span class="global-message-close icon icon_close"></span>
			</div>
		</aside>
    <?php endif; ?>
	<?php endif; ?>
	<h2>Before Page Top</h2>
	<?php print $page_top; ?>
		<h2>Before Page</h2>
	<?php print $page; ?>
		<h2>Before Page Bottom</h2>
	<?php print $page_bottom; ?>
	<script type="text/javascript" src="//wurfl.io/wurfl.js"></script>
	<script src="/themes/nretreats/scripts/app.min.js" type="text/javascript"></script>
	<script language="javascript" src="https://maps.googleapis.com/maps/api/js?sensor=true&v=3&key=AIzaSyAy8lCX6E19KLkr8ow3lZ4NPDr7jxX8Vg8&callback=nret.maps.runMapInOrder"></script>
</body>
</html>
