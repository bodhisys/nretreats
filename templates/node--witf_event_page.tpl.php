<?php
  $wrapped_node = entity_metadata_wrapper('node',$node);
  $title = $wrapped_node->title->value();
  $destination = $wrapped_node->field_witfe_destination->value();
  $from_price = $wrapped_node->field_witfe_from_price->value();
  $call_to_book = $wrapped_node->field_witfe_call_to_book_message->value();
  $witf_hero_image_url = nret_parse_image_url($wrapped_node->field_witfe_image->value());
  $witf_field_image_gallery = $wrapped_node->field_image_gallery;
  $overview_1 = $wrapped_node->field_witfe_copy_section_1->value();
  $overview_2 = $wrapped_node->field_witfe_copy_section_2->value();
  $event_youtube_video = $wrapped_node->field_youtube_video->value();
  $event_youtube_photo = nret_parse_image_url($wrapped_node->field_youtube_thumbnail->value());
  $witfe_pricing_item = $wrapped_node->field_witfe_pricing_item;
  $field_witfe_extend_exp_item = $wrapped_node->field_witfe_extend_exp_item;
 ?>

<section class="witf-events">
    <div class="witf__hero" style="background:url('<?php echo $witf_hero_image_url; ?>') center center no-repeat;background-size:cover;"></div>
    <div class="witf-events-container">
      <section class="booking-widget">
        <div class="wrapper">
          <div class="booking-widget__above">
            <div class="witf-event-location"><?php echo $destination; ?></div>
            <hgroup>
              <h3 class="title"><?php echo $title; ?></h3>
            </hgroup>
          </div>
          <div class="booking-widget__below call-to-book">
            <div class="witf-booking wrapper">
              <p class="subheader">Book now from <?php echo $from_price; ?><span class="line"></span> per person </p>
              <h3 class="title"><?php echo $call_to_book; ?></h3>
            </div>
          </div>
        </div>
      </section>
      <div class="witf-events-overview-wrapper">
        <div class="overview-wrapper">
          <p class="intro"><?php echo $overview_1; ?></p>
          <div class="paragraph"><?php echo $overview_2; ?></div>
        </div>
        <div class="witf-event-pricing">
          <section class="package-rates-container">
  					<header>
  						<h3 class="witf-title">Pricing</h3>
  					</header>
            <?php foreach ($witfe_pricing_item as $key => $price_item) :
              $item_title = $price_item->field_witfe_pi_title->value();
              $price = $price_item->field_witfe_pi_price->value();
              ?>
              <div class="package-breakdown">
                <div class="package-breakdown__copy">
                  <h6 class="title"><?php echo $item_title; ?></h6>
                  <p class="package-breakdown__price"> <span><?php echo $price; ?></span></p>
                </div>
              </div>
            <?php endforeach; ?>
  				</section>
        </div>
      </div>
      <!-- start image gallery -->
      <div class="witf-events-wrapper gallery-wrapper">
        <section class="event__content__gallery image-gallery__parent">
          <div class="image-gallery__navigation">
            <div class="image-gallery__navigation-left"></div>
            <div class="image-gallery__navigation-right"></div>
          </div>
          <div class="image-gallery__photographer">
            <div class="inner image-gallery-photographer">
              <?php foreach ($witf_field_image_gallery as $key => $image):
                $field_image_caption = $image->field_image_caption->value();
                ?>
                <p><?php echo $field_image_caption; ?></p>
              <?php endforeach; ?>
            </div>
          </div>
          <div class="image-gallery">
            <?php foreach ($witf_field_image_gallery as $key => $image):
              $field_image = nret_parse_image_url($image->field_image->value());
              ?>
              <div class="image-gallery-image-wrapper">
                <img src="<?php echo $field_image; ?>" alt="">
              </div>
            <?php endforeach; ?>
          </div>
        </section>
      </div>
      <!-- end image gallery -->

      <!-- start video player -->
      <?php
      if ( !empty( $event_youtube_video['video_id']) ) {
          echo nret_youtube_show_player($event_youtube_video['video_id'],nret_parse_image_url($event_youtube_photo)); ?>

       <section class="youtube__mobile">
              <iframe width="320" height="315" src="https://www.youtube.com/embed/<?php echo $event_youtube_video['video_id']; ?>" frameborder="0" allowfullscreen></iframe>
      </section>

  <?php      }  ?>
      <!-- end video player -->
      <div class="witf-events-wrapper">
        <header class="animated hide-block">
          <h3 class="title">Extend Your Field Experience</h3>
          <span class="underline"></span>
        </header>
        <div class="offers-row image-gallery-mobile hide-block">
          <?php foreach ($field_witfe_extend_exp_item as $exp_item) :
            $exp_title = $exp_item->field_witfe_ete_title->value();
            $exp_image_url = nret_parse_image_url($exp_item->field_witfe_ete_image->value());
            $exp_clickthrough = $exp_item->field_witfe_ete_click_throughurl->value();
            $exp_subcopy = $exp_item->field_witfe_ete_subcopy->value();
            ?>
            <a href="<?php echo $exp_clickthrough; ?>" class="offers-block">
  						<div class="offers-block__bg-image">
  							<img src="<?php echo $exp_image_url; ?>" alt="">
  						</div>
  						<div class="offers-block__copy">
  							<hgroup>
  								<h3 class="title"><?php echo $exp_title; ?></h3>
  								<p class="subheader"><?php echo $exp_subcopy; ?></p>
  							</hgroup>
  						</div>
  					</a>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
</section>
