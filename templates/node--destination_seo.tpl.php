<?php
$wrapped_node = entity_metadata_wrapper('node', $node);

$hero_image_url = nret_parse_image_url($wrapped_node->field_dseo_image->value());
if (!$hero_image_url) {
    $hero_image_url = 'https://images.unsplash.com/photo-1430263326118-b75aa0da770b?ixlib=rb-0.3.5&q=80&fm=jpg&s=ee3ee5b84e339f21e2ba68add9f118cf';
}
?>
<section class="destination-listing destination-seo">
    <div class="wrapper">
        <div class="destination-listing__hero-copy" style="background:url('<?php echo $hero_image_url; ?>') center center no-repeat;background-size:cover;">
            <h1 class="title__caps"><?php echo $wrapped_node->title->value(); ?></h1>
            <p class="intro"><?php echo $wrapped_node->field_dseo_subheader->value(); ?></p>
        </div>
        <section class="destination-listing__row">
            <?php
            foreach ($wrapped_node->field_dseo_destinations as $destination) :                
                $node = $destination->field_destination->value();
                $title = $node->title;
                $region = $node->field_api_url_us_region[LANGUAGE_NONE][0]['value'];
                if ($region == '') $region = 'ukeu';
                $description = $node->api_data->Summary;
                $fromPrice = !empty($node->api_data->FromPrice) && !is_null($node->api_data->FromPrice) ? $node->api_data->FromPrice : $node->api_data->destination_from_price;
                $g_region = $node->api_data->GeographicRegion;
                $propertyCount = $node->api_data->CategoryCount;
                $image_1 = $node->api_data->Image1;
                $image_2 = $node->api_data->Image2;
                $experiences = implode(" ", array_map(function($p) {return str_replace(" ", "-", $p); }, array_map('strtolower', $node->api_data->Experiences)));
                $environments = implode(" ", array_map(function($p) {return str_replace(" ", "-", $p); }, array_map('strtolower', $node->api_data->View)));
                $destinationUrl = url('node/' . $node->nid);
            ?>
            <a href="<?php echo $destinationUrl; ?>" class="destination-listing__block hide-block filter-me <?php echo 'nid-'.$node->nid." "; $sleeps = ((isset($node->api_data->Sleeps) && is_numeric($node->api_data->Sleeps))?$node->api_data->Sleeps:0); for($i=1;$i<=$sleeps;$i++){ echo "sleeps-".$i." "; }; echo $experiences." "; echo $environments." ";echo $region; ?> ">
                <div class="destination-listing__copy">
                    <div class="wrapper">
                        <hgroup>
                            <p class="strike"><?php echo $title . ', ' . $g_region ?><span class="strike-through"></span></p>
                            <?php if (!$propertyCount == 0) : ?>
                            <h3 class="title">
                                <?php echo $propertyCount == 1 ? $propertyCount . ' Retreat' : $propertyCount . ' Retreats'; ?>
                            </h3>
                            <?php endif; ?>
                        </hgroup>
                        <p class="<?php if ( strlen($description) > 300 ) {echo 'fade-overflow '; echo strlen($description);} ?>"><?php echo nl2br($description); ?><span class="fade"></span></p>
                        <?php if (!empty($fromPrice)) { ?>
                        <span class="destination-listing__copy__price">Starting from <?php echo nret_get_currency($node->api_data->RegionId); ?><span class="price"><?php echo $fromPrice; ?></span>  / night</span>
                        <?php } ?>
                    </div>
                </div>
                <div class="destination-listing__image" style="background:url('<?php echo $image_2; ?>') center center no-repeat; background-size:cover;">
                    <img src="<?php echo $image_1; ?>">
                </div>
                <div class="destination-listing__image" style="background:url('<?php echo $image_1; ?>') center center no-repeat; background-size:cover;"></div>
            </a>
            <?php endforeach; ?>
        </section>
    </div>
</section>
<?php drupal_add_js('jQuery(document).ready(function () { nret.destinationListing.init(); nret.destinationListing.toggleShowList(); });', 'inline'); ?>