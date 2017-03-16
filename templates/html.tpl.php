<?php
$nret_globalmessage_status = variable_get('nret_globalmessage_status', 0);
$nret_globalmessage_title = variable_get('nret_globalmessage_title', '');
$nret_globalmessage_copy = variable_get('nret_globalmessage_copy', '');
$nret_globalmessage_url = variable_get('nret_globalmessage_url', '');
?>
<!DOCTYPE html>
<html lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>>
<head profile="<?php print $grddl_profile; ?>">
    <?php print $head; ?>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title><?php print $head_title; ?></title>
    <?php include 'components/optimizely.php'; ?>
    <!--    --><?php //include 'components/typekit.php'; ?>
    <!--  style to load BEFORE hero element. necessary to hide hero element which is inline to the element -->
    <link rel="stylesheet" type="text/css" href="/themes/nretreats/css/style.css">
    <link rel="stylesheet" type="text/css" href="/themes/nretreats/scripts/flexslider/flexslider.css">
    <link rel="stylesheet" type="text/css" href="/themes/nretreats/css/redesign.css">

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
<script type="text/javascript" src="//wurfl.io/wurfl.js"></script>
<!--<script src="/themes/nretreats/scripts/app.js" type="text/javascript"></script>-->
<script src="/themes/nretreats/scripts/lib.js" type="text/javascript"></script>
<script src="/themes/nretreats/scripts/components.js" type="text/javascript"></script>
<script src="/themes/nretreats/scripts/page.js" type="text/javascript"></script>
<script src="/themes/nretreats/scripts/main.js" type="text/javascript"></script>
<script src="/themes/nretreats/scripts/flexslider/jquery.flexslider.js" type="text/javascript"></script>
<!--<script language="javascript" src="https://maps.googleapis.com/maps/api/js?sensor=true&v=3&key=AIzaSyAy8lCX6E19KLkr8ow3lZ4NPDr7jxX8Vg8&callback=nret.maps.runMapInOrder"></script>-->
</body>
</html>
