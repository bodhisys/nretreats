<?php
	$wrapped_node = entity_metadata_wrapper('node',$node);
	$page_title = $wrapped_node->title->value();
?>

<section class="contact-us tertiary">
	<div class="wrapper">
		<div class="hero">
			<header>
				<h1 class="title__caps"><?php echo $wrapped_node->title->value(); ?></h1>
				<p class="intro"><?php echo $wrapped_node->field_contact_copy->value(); ?></p>
			</header><!-- /header -->
		</div>

		<div class="contact__information">
			<div class="wrapper">
				<h6 class="title contact-us__header">Reservations &amp; Concierge</h6>
				<div class="contact__information-location">
					<div class="contact__information-row">
					    <?php try{?>
						<div class="contact__block">
							<h4>US East Office</h4>
							<a class="contact__tel" href="tel:<?php echo $wrapped_node->field_contact_us_phone->value(); ?>"><?php echo $wrapped_node->field_contact_us_phone->value(); ?></a>
							<div class="contact-us__week">Monday - Friday <span class="contact-us__week__time"><?php echo $wrapped_node->field_contact_us_hours_mon_fri->value(); ?></span> </div>
							<div class="contact-us__week">Weekends &amp; Holidays<span class="contact-us__week__time"><?php echo $wrapped_node->field_hours_us_east_wends_hol->value(); ?></span></div>
						</div>
						<?php }catch (Exception $e){} try{?>
						<div class="contact__block">
							<h4>US West Office</h4>
							<a class="contact__tel" href="tel:<?php echo $wrapped_node->field_contact_us_east_phone->value(); ?>"><?php echo $wrapped_node->field_contact_us_east_phone->value(); ?></a>
							<div class="contact-us__week">Monday - Friday <span class="contact-us__week__time"><?php echo $wrapped_node->field_contact_uswest_mon_fri->value(); ?></span> </div>
							<div class="contact-us__week">Weekends &amp; Holidays<span class="contact-us__week__time"><?php echo $wrapped_node->field_hours_us_west_wends_hol->value(); ?></span></div>
						</div>
						<?php }catch (Exception $e){} try{?>
						<div class="contact__block">
							<h4>United Kingdom</h4>
							<a class="contact__tel" href="tel:<?php echo $wrapped_node->field_contact_uk_phone->value(); ?>"><?php echo $wrapped_node->field_contact_uk_phone->value(); ?></a>
							<div class="contact-us__week">Monday - Friday <span class="contact-us__week__time"><?php echo $wrapped_node->field_contact_uk_hours_mon_fri->value(); ?></span> </div>
							<div class="contact-us__week">Weekends &amp; Holidays<span class="contact-us__week__time"><?php echo $wrapped_node->field_hours_uk_wends_hol->value(); ?></span></div>
						</div>
						<?php }catch (Exception $e){} try{?>
						<div class="contact__block">
							<h4>Ireland</h4>
							<a class="contact__tel" href="tel:<?php echo $wrapped_node->field_contact_ireland_phone->value(); ?>"><?php echo $wrapped_node->field_contact_ireland_phone->value(); ?></a>
							<div class="contact-us__week">Monday - Friday <span class="contact-us__week__time"><?php echo $wrapped_node->field_contact_ir_hours_mon_fri->value(); ?></span> </div>
							<div class="contact-us__week">Weekends &amp; Holidays<span class="contact-us__week__time"><?php echo $wrapped_node->field_hours_ie_wends_hol->value(); ?></span></div>
						</div>
						<?php }catch (Exception $e){}?>
					</div>
				</div>
				<section class="contact__form">
					<header>
						<h3 class="title">Have a question? We're here to help!</h3>
					</header><!-- /header -->
					<form id="contact-form" class="form-submit" accept-charset="utf-8">
					<div class="input-row">
					   <div class="contact__topic-wrapper">
							<select id="contactFormTopic" name="contact__topic" dropdown required>
								<option disabled selected="selected">Topic</option>
								<option value="General">General</option>
								<option value="Booking">Booking</option>
								<option value="Amenities">Amenities</option>
								<option value="Xplore Team">Xplore Team</option>
							</select>
						</div>
						<div class="contact__topic-wrapper">
							<select id="contactFormArea" name="toemail" dropdown required>
								<option disabled selected="selected">Area of Interest</option>
								<option value="us">United States</option>
								<option value="uk">United Kingdom / Europe</option>
							</select>
						</div>

					</div>
						<div class="input-row">
							<input type="text" id="contact__name" name="name" value="" title="First Name" maxlength="255"  placeholder="NAME" required>
							<input class="email-validation" type="email" id="contact__email" name="email" value="" title="Email" maxlength="255"  placeholder="EMAIL" required>
						</div>
						<div class="input-row">
							<textarea name="contact__question" placeholder="YOUR QUESTION" required></textarea>
						</div>
						<input class="btn btn__blue" type="submit" name="contact__submit" value="Send Message">
					</form>
				</section>

			</div>
		</div>
	</div>
</section>
