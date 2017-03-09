<?php
$nret_globalmessage_status = variable_get('nret_globalmessage_status', 0);
$nret_globalmessage_title = variable_get('nret_globalmessage_title', '');
$nret_globalmessage_copy = variable_get('nret_globalmessage_copy', '');
$nret_globalmessage_url = variable_get('nret_globalmessage_url', '');
?>
<!DOCTYPE html>
<html lang="<?php print $language->language; ?>" version="XHTML+RDFa 1.0" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>>
<head profile="<?php print $grddl_profile; ?>">
	<?php print $head; ?>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title><?php print $head_title; ?></title>
	<?php include 'components/optimizely.php'; ?>
	<?php include 'components/typekit.php'; ?>
	<!--  style to load BEFORE hero element. necessary to hide hero element which is inline to the element -->
    <link rel="stylesheet" type="text/css" href="/themes/nretreats/css/style.css">
	<link rel="stylesheet" type="text/css" href="/themes/nretreats/css/redesign.css">
    <link href="/themes/nretreats/scripts/flexslider/flexslider.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

	<?php print $styles; ?>
	<?php print $scripts; ?>
	<?php include 'components/bazaarvoice.php'; ?>
</head>

<body class="<?php print $classes; ?>" <?php print $attributes;?>>
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
	<?php print $page_top; ?>
	<?php print $page; ?>
	<?php print $page_bottom; ?>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js "></script>
    


	<script type="text/javascript" src="//wurfl.io/wurfl.js"></script>
	<script src="/themes/nretreats/scripts/app.min.js" type="text/javascript"></script>
	<script language="javascript" src="https://maps.googleapis.com/maps/api/js?sensor=true&v=3&key=AIzaSyAy8lCX6E19KLkr8ow3lZ4NPDr7jxX8Vg8&callback=nret.maps.runMapInOrder"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="/themes/nretreats/scripts/vendor/bootstrap.min.js "></script>
    <script src="/themes/nretreats/scripts/flexslider/jquery.flexslider.js "></script>
    <script src="/themes/nretreats/scripts/scripts.js "></script>

</body>
</html>
