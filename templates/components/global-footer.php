<?php
$userglobalposition = nret_get_usergloballocation(isset($node) ? $node : null);
$contact_phone = variable_get('nret_contact_' . $userglobalposition . '_phone');
?>
<footer class="real-estate-footer">
	<nav class="real-estate-footer__left">
		<ul class="real-estate-footer-menu">
			<li class="real-estate-footer-menu-item">
				<h4 class="heading"><button type="button">Rentals</button></h4>
				<ul class="real-estate-footer-submenu">
					<li><a href="/destination">Destinations</a></li>
					<li><a href="/guides-list">Guides</a></li>
					<li><a href="/journal">Journal</a></li>
					<li><a href="/frequently-asked-questions">FAQ</a></li>
					<li><a href="/contact-us">Contact List</a></li>
					<li><button type="button" id="openNewsletter" class="real-estate-footer-newsletter-signup-button">Newsletter Signup</button></li>
				</ul>
			</li>
			<li class="real-estate-footer-menu-item">
				<h4 class="heading"><button type="button">Owners</button></h4>
				<ul class="real-estate-footer-submenu">
					<li><a href="/list-your-home">List Your Home</a></li>
					<li><a href="https://nres.naturalretreats.com/pls/apex/nres.owner_portal" target="_blank">Owners Portal</a></li>
				</ul>
			</li>
			<li class="real-estate-footer-menu-item">
				<h4 class="heading"><button type="button">Real Estate</button></h4>
				<ul class="real-estate-footer-submenu">
					<li><a href="/real-estate/communities">Properties</a></li>
					<li><a href="/real-estate/services/resort-development">Resort Development</a></li>
					<li><a href="/real-estate/services/resort-management">Resort Management</a></li>
					<li><a href="/real-estate/our-difference">Our Difference</a></li>
					<li><a href="/real-estate/contact">Contact</a></li>
				</ul>
			</li>
			<li class="real-estate-footer-menu-item">
				<h4 class="heading"><button type="button">Information</button></h4>
				<ul class="real-estate-footer-submenu">
					<li><a href="/careers">Careers</a></li>
					<li><a href="/terms-and-condition">Terms &amp; Policies</a></li>
				</ul>
			</li>
		</ul>
	</nav>
	<div class="real-estate-footer__right">
		<h4 class="real-estate-footer__copyright">&copy;<script>document.write(new Date().getFullYear())</script> Natural Retreats</h4>
		<a href="tel:<?php echo str_replace('.', '', $contact_phone); ?>" class="real-estate-footer__tel"><?php echo $contact_phone; ?></a>
		<ul class="real-estate-footer__social">
			<li class="real-estate-footer__social-item">
				<a href="https://www.facebook.com/naturalretreats" target="_blank"><span class="icon icon_fb"></span></a>
			</li>
			<li class="real-estate-footer__social-item">
				<a href="https://twitter.com/NaturalRetreats" target="_blank"><span class="icon icon_twitter"></span></a>
			</li>
			<li class="real-estate-footer__social-item">
				<a href="https://www.pinterest.com/naturalretreats/" target="_blank"><span class="icon icon_pinterest"></span></a>
			</li>
			<li class="real-estate-footer__social-item">
				<a href="https://www.instagram.com/naturalretreats/" target="_blank"><span class="icon icon_instagram"></span></a>
			</li>
		</ul>
	</div>
	<div class="real-estate-footer__newsletter-signup footer__newsletter-signup">
		<div class="footer__newsletter-signup__close icon icon_close"></div>
		<div class="wrapper">
			<p><?php echo variable_get('nret_newsletter_copy'); ?></p>
			<form class="newsletter-email" action="" method="POST" accept-charset="utf-8">
				<div class="name-wrapper">
					<input type="text" name="FirstName" value="" placeholder="First Name" required>
					<input type="text" name="LastName" value="" placeholder="Last Name" required>
				</div>
				<input type="email" name="Email" value="" placeholder="Your Email Address" required>
				<input type="hidden" name="MailingListCode" value="<?php echo nret_get_mailinglist_code(); ?>">
				<input class="btn btn__transparent newsletter-submit" value="Submit" type="submit">
			</form>
			<h3 class="title newsletter-thankyou">Thank You for Subscribing</h3>
		</div>
	</div>
</footer>
