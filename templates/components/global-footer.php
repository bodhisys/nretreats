<?php
$userglobalposition = nret_get_usergloballocation(isset($node) ? $node : null);
$contact_phone = variable_get('nret_contact_' . $userglobalposition . '_phone');
?>
<footer class="real-estate-footer">
    <div class="footer-bottom">
        <div class="container">
            <div class="row hide-on-mobile">
                <div class="col-sm-6">
                    <div>
                        <span class="icon icon_search"></span>
                        <input type="text" id="footerSearch" placeholder="Search">
                    </div>

                    <ul class="footer-nav-menu clearfix">
                        <li><a href="/about">About NR</a></li>
                        <li><a href="/faq">FAQ</a></li>
                        <li><a href="/owner_portal">Owner's Portal</a></li>
                        <li><a href="/in_the_press">In The Press</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/terms_and_policies">Term's and Policies</a></li>
                        <li><a href="/journals">Journals</a></li>
                        <li><a href="/careers">Careers</a></li>
                    </ul>
                    <div class="copyright-info">
                        <h4 class="real-estate-footer__copyright">&copy;<script>document.write(new Date().getFullYear())</script> Natural Retreats</h4>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="clearfix">
                        <ul class="thumbnail-images">
                            <li><img src="/themes/nretreats/assets/img/image-placeholder.jpg"></li>
                            <li><img src="/themes/nretreats/assets/img/image-placeholder.jpg"></li>
                            <li><img src="/themes/nretreats/assets/img/image-placeholder.jpg"></li>
                            <li><img src="/themes/nretreats/assets/img/image-placeholder.jpg"></li>
                            <li><img src="/themes/nretreats/assets/img/image-placeholder.jpg"></li>
                            <li><img src="/themes/nretreats/assets/img/image-placeholder.jpg"></li>
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

                </div>
            </div>
            <div class="row">
                <div class="social-icons-list">
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
                <div class="copyright-info show-on-mobile-only">
                    <span>©<script>document.write(new Date().getFullYear())</script> Natural Retreats</span>
                    <span>|</span>
                    <span><a href="/terms-conditions">TERMS & CONDITIONS</a></span>
                </div>
            </div>
        </div>
    </div>
</footer>
