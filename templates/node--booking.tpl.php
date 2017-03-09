<?php
	$wrapped_node = entity_metadata_wrapper('node', $node);
	$userglobalposition = nret_get_usergloballocation(isset($node)?$node:null);
	$basket = $node->booking_data["basket"];
	$related_experiences = isset($node->booking_data["related_experiences"])?$node->booking_data["related_experiences"]:array();

	$experiences = array();
	foreach($related_experiences as $experience){
		$experience_data = array(
			'title' => $experience->title,
			'image_url' => nret_parse_image_url($experience->field_image[LANGUAGE_NONE][0])
		);

		array_push($experiences, $experience_data);
	}
	$xplorerInfo = array();
	if(isset($node->booking_data["destination_xplores"])){
		$xplorers = $node->booking_data["destination_xplores"]->value();
		$xplorerInfo['name'] = $xplorers[0]->title;
		$xplorerInfo['image_url'] = nret_parse_image_url($xplorers[0]->field_member_photo[LANGUAGE_NONE][0]);
	}

	if($node->booking_step === 'postpayment'){
		$basket = $basket->data;
	}
	$bookingId = $basket->BookingId;
	$basketTotal = $basket->BasketTotal;
	$basketDiscount = $basket->BasketDiscount;
	$basketDeposit = $basket->BasketDeposit;
	$basketPaid = $basket->BasketPaid;
	$tax = $basket->BasketTax;
	$grandTotal = $basketTotal + $tax;
	$ccfee = $basket->CCFee;
	$balance = $grandTotal  - $basketPaid;
	$resortName = $basket->ResortName;
	$resortId = $basket->ResortId;
	$resortDescription = $basket->BasketElements[0]->Description;
	$numberOfGuests = $basket->BasketElements[0]->Adults + $basket->BasketElements[0]->Children;
	$bookingTitle = $wrapped_node->field_booking_title->value();
	$bookingCopy = $wrapped_node->field_booking_copy->value();
	$bookingPoints = $wrapped_node->field_booking_points;
	$currency=nret_get_currency($basket->RegionId);
	$contact_phone = variable_get('nret_contact_'.$userglobalposition.'_phone');

	if($node->booking_step === 'postpayment'){
		if(!$node->booking_error){
			$ecommBookingId = 'NR'.$resortId.'-'.$bookingId;
			$currencyType = array('GBP','EUR','USD');
			drupal_add_js('jQuery(document).ready(function () { nret.booking.trackBooking("'.$ecommBookingId.'","'.$grandTotal.'","'.$tax.'","'.$resortDescription.'","'.$resortId.'","'.$resortName.'"); nret.booking.sendToBVOnSuccess(0,0,"'.$grandTotal.'","","'.$resortId.'",""); }); ', 'inline'); ?>
			<section class="booking-page confirmation">
				<div class="wrapper columns">
					<section class="booking-number">
						<h2 class="title__caps">booking<br />no. <?php echo $bookingId; ?></h2>
					</section>
					<section class="retreat-guest-form contact__information">
						<section class="step confirmation">
							<section class="summary">
								<h1><?php echo $resortName; ?></h1>
								<h2><?php echo $resortDescription; ?></h2>
								<?php if(count($basket->BasketElements) > 1){ ?>
								<hr />
								<table>
									<?php
										foreach ($basket->BasketElements as $basketElement) {
											if($basketElement->ObjectType === 'E'){?>
									<tr>
										<td><?php echo $basketElement->Description; ?></td>
										<td><?php echo $currency.number_format((float)$basketElement->Price, 2, '.', ''); ?></td>
									</tr>
									<?php
											}
										}?>
								</table>
								<hr />
								<?php } ?>
								<table>
									<?php if($tax){ //Only show sub total if tax ?>
									<tr>
										<td>sub total</td>
										<td><?php echo $currency.number_format((float)$basketTotal, 2, '.', ''); ?></td>
									</tr>
									<?php } ?>
									<?php if($basketDiscount){ ?>
									<tr>
										<td>Discount</td>
										<td>-<?php echo $currency.number_format((float)$basketDiscount, 2, '.', ''); ?></td>
									</tr>
									<?php } ?>
									<?php if($tax){ ?>
									<tr>
										<td>tax</td>
										<td><?php echo $currency.number_format((float)$tax, 2, '.', ''); ?></td>
									</tr>
									<?php } ?>
								</table>
								<hr />
								<table>
									<?php if($ccfee){ ?>
									<tr>
										<td>Credit Card Fee</td>
										<td><?php echo $currency.number_format((float)$ccfee, 2, '.', ''); ?></td>
									</tr>
									<?php } ?>
									<tr>
										<td>Grand Total</td>
										<td><?php echo $currency.number_format((float)$grandTotal, 2, '.', ''); ?></td>
									</tr>
									<tr>
										<td>Payment received</td>
										<td><?php echo $currency.number_format((float)$basketPaid, 2, '.', ''); ?></td>
									</tr>
									<tr>
										<td>Balance Amount</td>
										<td><?php echo $currency.number_format((float)$balance, 2, '.', ''); ?></td>
									</tr>
								</table>
							</section>
							<br />
							<section class="things-to-do">
								<p>We’re here to make your stay unforgettable. We offer many experiences and activities close to your retreat to help you get the most of your vacation. Our Xplore Team Expert will be in touch soon to help you plan your trip.</p>
								<?php if(count($xplorerInfo)){ ?>
								<style>
									section.booking-page .retreat-expert::before{
										background-image:url(<?php echo $xplorerInfo['image_url']; ?>) !important;
									}
								</style>
								<div class="retreat-expert">
									Xplore Expert – <?php echo $xplorerInfo['name']; ?>
								</div>
								<?php } ?>
								<section class="activities">
									<article class="invisible">
										<img src="/themes/nretreats/images/todo-1.png" />
									</article>
									<?php if(count($experiences)){ //333 x 310 ?>
									<div class="activites-wrapper">
										<?php foreach($experiences as $experience){ ?>
										<article>
											<img src="<?php echo $experience['image_url']; ?>" />
											<p class="large"><?php echo $experience['title']; ?></p>
										</article>
										<?php } ?>
									</div>
									<?php } ?>
								</section>
							</section>
						</section>
					</section>
				</div>
			</section>

			<?php
		}else{	//booking error display
			?>
			<section class="booking-page confirmation">
				<div class="wrapper columns">
					<section class="retreat-guest-form contact__information">
						<section class="step confirmation">
							<section class="summary">
								<?php echo $node->booking_error_message; ?>
							</section>
						</section>
					</section>
				</div>
			</section>
			<?php
		}
	//else pre payment
	}else{ //open else pre payment
?>
<script src="https://js.braintreegateway.com/v2/braintree.js"></script>
<section class="booking-page">
	<section class="back">
		<!-- <a href=""> < edit details</a> -->
	</section>
	<div class="wrapper">
		<aside class="retreat-cart">
            <?php if(!empty($node->booking_data["image_url"])){?>
			<header>
				<img src="<?php echo $node->booking_data["image_url"]; ?>" width="316" height="auto" />
			</header>
			<?php } ?>
			<section class="cart-body">
				<h1><?php echo $basket->ResortName; ?></h1>
				<h2><?php echo $basket->BasketElements[0]->Description; ?></h2>
				<hr />
				<table>
					<tr>
						<td>no. of guests</td>
						<td>
							<?php
								echo $numberOfGuests;
								if($basket->BasketElements[0]->Pets > 0){
									echo " & ".$basket->BasketElements[0]->Pets." Pet(s)";
								}
							?>
						</td>
					</tr>
					<tr>
						<td>check in</td>
						<td>
							<?php
								echo $basket->StartDate;
							?>
						</td>
					</tr>
					<tr>
						<td>check out</td>
						<td>
							<?php
								echo $basket->EndDate;
							?>
						</td>
					</tr>
				</table>
				<?php
				if(count($basket->BasketElements) > 1)
				{
				    $iC = 0;
				    $complimentaryStr = "<hr /><table>";
					foreach ($basket->BasketElements as $basketElement)
					{
						if($basketElement->ObjectType === 'E' && intval($basketElement->Quantity) > 0 && intval($basketElement->Price) == 0)
						{
					        $price = $currency.number_format((float)$basketElement->Price, 2, '.', '');
        					$complimentaryStr .= "<tr>
        						<td>".$basketElement->Description."</td>
        						<td>".$price."</td>
        					</tr>";
        					$iC++;
						}
					}
				    $complimentaryStr .= "</table>";
				}
				if($iC > 0)
				{
				    echo $complimentaryStr;

				}
				?>

				<hr />
				<?php if($tax || $basketDiscount) { //if no tax or no discount don't show ?>
				<table>
					<?php if($tax){ //only show sub total if tax ?>
					<tr>
						<td>sub total</td>
						<td><?php echo $currency.number_format((float)$basketTotal, 2, '.', ''); ?></td>
					</tr>
					<?php } ?>
					<?php if($basketDiscount){ ?>
					<tr>
						<td>Discount</td>
						<td>-<?php echo $currency.number_format((float)$basketDiscount, 2, '.', ''); ?></td>
					</tr>
					<?php } ?>
					<?php if($tax){ ?>
					<tr>
						<td>tax</td>
						<td><?php echo $currency.number_format((float)$tax, 2, '.', ''); ?></td>
					</tr>
					<?php } ?>
				</table>
				<hr />
				<?php } ?>
				<table class="grandtotal-table">
					<tr>
						<td>grand total</td>
						<td class="total large">
							<?php echo $currency.number_format((float)$grandTotal, 2, '.', ''); ?>
						</td>
					</tr>
				</table>
			</section>
			<footer>
				<a href="tel:<?php echo str_replace(".", "", $contact_phone); ?>" class="nav__tel"><input class="btn btn__blue" type="button" value="Need help? Call <?php echo $contact_phone; ?>"></a>
			</footer>
		</aside>
		<section class="retreat-guest-form contact__information">
			<form class="guestInfo__form" method="post">
				<?php if(isset($basket->AgentMessage)){ ?>
				<section class="step">
					<p><?php echo $basket->AgentMessage ?></p>
				</section>
				<?php } ?>
				<section class="step step0">
					<header class="contact__topic-wrapper">
						<?php if (!empty($bookingTitle)) {?>
						<h1><?php echo $bookingTitle; ?></h1>
						<?php } ?>
					</header>
					<?php if( !empty($bookingCopy)) { ?>
					<p><?php echo $bookingCopy; ?></p>
					<?php } ?>
					<?php if( !empty($bookingPoints)) {
						echo "<ul class='booking-points'>";
						foreach($bookingPoints as $points) { ?>
						<li><?php echo $points->value(); ?></li>
					<?php } echo "</ul>";} ?>
				</section>
				<section class="step step1">
					<header class="contact__topic-wrapper">
						<h1><?php echo variable_get('nret_honeheader_bookingstepone_copy','Step &mdash; 1'); ?></h1>
						<h2><?php echo variable_get('nret_honeheader_bookingguestdetails_copy','Guest Details'); ?></h2>
					</header>
					<div class="input-row">
						<input type="text" name="FirstName" value="<?php echo isset($basket->LeadGuestDetails->FirstName)?$basket->LeadGuestDetails->FirstName:''; ?>" title="First Name" maxlength="255"  placeholder="FIRST NAME" required>
						<input type="text" name="LastName" value="<?php echo isset($basket->LeadGuestDetails->LastName)?$basket->LeadGuestDetails->LastName:''; ?>" title="Last Name" maxlength="255"  placeholder="LAST NAME" required>
					</div>
					<div class="input-row">
						<input class="email-validation" type="email" name="Email" value="<?php echo isset($basket->LeadGuestDetails->Email)?$basket->LeadGuestDetails->Email:''; ?>" title="Email" maxlength="255"  placeholder="EMAIL" required>
						<input class="phone-validation" type="tel" name="Tel1" value="<?php echo isset($basket->LeadGuestDetails->Tel1)?$basket->LeadGuestDetails->Tel1:''; ?>" title="Phone" maxlength="255"  placeholder="TELEPHONE NUMBER" required>
					</div>
					<div class="input-row">
						<input class="zip-validation solo" type="text" name="PostCode" value="<?php echo isset($basket->LeadGuestDetails->PostCode)?$basket->LeadGuestDetails->PostCode:''; ?>" title="zipecode" maxlength="255"  placeholder=<?php echo ($userglobalposition == 'uk') ? '"POSTCODE"' : '"ZIP CODE"'; ?> required>
					</div>
				</section>
				<section class="step step2">
					<header class="contact__topic-wrapper">
						<h1><?php echo variable_get('nret_honeheader_bookingsteptwo_copy','Step &mdash; 2'); ?></h1>
						<h2><?php echo variable_get('nret_honeheader_bookingpaymentmethod_copy','Payment Method'); ?></h2>
					</header>
					<div class="input-row">
						<input id="amount" type="radio" name="Amount" value="<?php echo $grandTotal; ?>" checked="checked"><label for="amount">Full Amount <?php echo $currency.number_format((float)$grandTotal, 2, '.', ''); ?></label>
						<?php
							if($basketDeposit && $basketDeposit !== $grandTotal){
						?>
						<input id="deposit" type="radio" name="Amount" value="<?php echo $basketDeposit; ?>"><label for="deposit">Deposit <?php echo $currency.number_format((float)$basketDeposit, 2, '.', ''); ?></label>
						<?php
							}
						?>
					</div>
					<div class="input-row">
						<?php if($node->booking_error){ ?>
						<section>
							<div class="booking-error">
								<p><?php echo $node->booking_error_message; ?></p>
							</div>
						</section>
						<?php } ?>
						<select id="CardType" required="required" class="creditcard-select" name="CardType" data-region="<?php echo $basket->RegionId; ?>">
							<option value="">Select Card Type</option>
							<?php foreach ($node->booking_data["cards"]->data as $creditCards) { ?>
								<option value="<?php echo $creditCards->CardTypeCode; ?>"><?php echo $creditCards->Description; ?></option>
							<?php } ?>
						</select>
					</div>
					<div id="braintree-form" class="input-row hidden"></div>
					<div class="booking__promo-code-wrapper">
						<input id="promoCode" class="bookingPage_promo" type="text" name="" value="" title="promocode" maxlength="255"  placeholder="Promo Code">
						<div id="bookingPromoApply" class="btn btn__blue">Apply</div>
					</div>
				</section>
				<!-- <section class="step step3">
					<header class="contact__topic-wrapper">
						<h1>Step &mdash; 3</h1>
						<h2>Billing Details</h2>
					</header>
					<div class="input-row">
						<input type="text" name="FirstName" value="" title="First Name" maxlength="255"  placeholder="FIRST NAME" required>
						<input type="text" name="LastName" value="" title="Last Name" maxlength="255"  placeholder="LAST NAME" required>
					</div>
					<div class="input-row">
						<input class="solo full" type="text" name="Address1" value="" title="adress1" maxlength="255"  placeholder="ADRESS LINE 1" required>
					</div>
					<div class="input-row">
						<input class="solo full" type="text" name="Address2" value="" title="adress2" maxlength="255"  placeholder="ADRESS LINE 2">
					</div>
					<div class="input-row">
						<input type="text" name="Town" placeholder="city" required>
						<input type="text" name="County" placeholder="state" required>
						<input type="text" name="PostCode" placeholder="zip" required>
					</div>
				</section> -->
				<section class="step step3">
					<header class="contact__topic-wrapper">
						<h1><?php echo variable_get('nret_honeheader_bookingstepthree_copy','Step &mdash; 3'); ?></h1>
						<h2><?php echo variable_get('nret_honeheader_bookingstaypreferences_copy','Stay Preferences'); ?></h2>
					</header>
					<p>Your Retreat Manager can help make your stay perfect. Please tell us a little bit more about yourself.</p>
					<textarea value="<?php echo isset($basket->BookingNotes)?$basket->BookingNotes:''; ?>" name="BookingNote" placeholder="Tell us about you"></textarea>
					<!-- <p class="no-margin">Would you like us to stock your fridge before your arrival? (Over Phone)</p>
					<div class="input-row">
						<input id="yes" type="radio" name="StockFridge" value="true"><label for="yes">Yes, please!</label>
						<input id="no" type="radio" name="StockFridge" value="false" checked="checked"><label for="no">No, thank you.</label>
					</div> -->
					<textarea value=""name="SpecialRequirements" placeholder="Special Requirements"></textarea>
					<!-- <div class="input-row">
						<input id="newsletter" type="checkbox" name="ReceiveOffers">
						<label for="newsletter">Sign up for newsletter?</label>
					</div> -->
					<?php if(count($basket->BasketElements) > 1){ ?>
					<hr />
					<h2>Includes</h2>
					<br />
					<table>
						<?php
							foreach ($basket->BasketElements as $basketElement) {
								if($basketElement->ObjectType === 'E' && intval($basketElement->Quantity) > 0){
								    if(intval($basketElement->Price) == 0)
								    {
								        $price = "<i>Complimentary</i>";
								    }else{
								        $price = $currency.number_format((float)$basketElement->Price, 2, '.', '');
								    }
								?>
						<tr>
							<td><?php echo $basketElement->Description; ?></td>
							<td><?php echo $price; ?></td>
						</tr>
									<?php
								}
							}
						?>
					</table>
					<?php } ?>
					<hr />
					<?php if($tax || $basketDiscount) { //if no tax or no discount don't show ?>
					<table>
						<?php if($tax){ //only show sub total if tax ?>
						<tr>
							<td>sub total</td>
							<td><?php echo $currency.number_format((float)$basketTotal, 2, '.', ''); ?></td>
						</tr>
						<?php } ?>
						<?php if($basketDiscount){ ?>
						<tr>
							<td>Discount</td>
							<td>-<?php echo $currency.number_format((float)$basketDiscount, 2, '.', ''); ?></td>
						</tr>
						<?php } ?>
						<?php if($tax){ ?>
						<tr>
							<td>tax</td>
							<td><?php echo $currency.number_format((float)$tax, 2, '.', ''); ?></td>
						</tr>
						<?php } ?>
					</table>
					<hr />
					<?php } ?>
					<table class="grandtotal-table">
						<tr>
							<td>grand total</td>
							<td class="large total"><?php echo $currency.number_format((float)$grandTotal, 2, '.', ''); ?></td>
						</tr>
					</table>
					<br />
					<div class="submit clearfix">
						<input class="btn btn__blue retreat_guest_form_submit" type="submit" value="BOOK">
						<p>By choosing Book you agree to Natural Retreats <a href="/terms-and-conditions">terms and conditions.</a></p>
					</div>
				</section>
				<input type="hidden" value="postpayment" name="process" />
				<input type="hidden" value="surname" name="surname" />
				<input type="hidden" value="mr" name="Title" />
				<input type="hidden" value="<?php echo $node->booking_data["retreat_node_id"]; ?>" name="retreat_node_id" />
			</form>
			<form id="promoCodeResubmit" action="/booking" method="POST" accept-charset="utf-8">
				<input type="hidden" id="display-price-h" name="display-price-h" value="<?php echo $_POST['Guests']; ?>">
				<input type="hidden" name="Adults" value="<?php echo $_POST['Adults']; ?>">
				<input type="hidden" name="Children" value="<?php echo $_POST['Children']; ?>">
				<input type="hidden" name="Guests" value="<?php echo $_POST['Guests']; ?>">
				<input type="hidden" name="retreat_node_id" value="<?php echo $_POST['retreat_node_id']; ?>">
				<input type="hidden" name="Nights" value="<?php echo $_POST['Nights']; ?>">
				<input type="hidden" name="Region_id" id="bookingRegionId" value="<?php echo $_POST['Region_id'] ?>">
				<input type="hidden" name="process" value="prepayment">
				<input type="hidden" name="StartDate" value="<?php echo $_POST['StartDate']; ?>">
				<input type="hidden" name="Pets" value="0">
				<input type="hidden" name="sleeps" value="<?php echo $_POST['sleeps'] ?>">
				<input type="hidden" name="DiscountCode" value="">
			</form>
		</section>
	</div>
</section>
<?php
		drupal_add_js('jQuery(document).ready(function () { nret.booking.init(); nret.braintree.init({braintreeToken:"'.$node->booking_data["braintreetoken"].'",container:"braintree-form", form:jQuery("form.guestInfo__form")}); });', 'inline');
	} // close else pre payment
?>
