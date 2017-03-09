<section class="acquisition">
	<div class="acquisition__hero">
		<header>
			<h1 class="title__caps"><?php echo variable_get('nret_honeheader_acquisition_copy','List Your home'); ?></h1>
			<p class="intro">Enquiry Form</p>
		</header>
	</div>
	<article class="acquisition__wrapper">
		<div class="wrapper">
			<form id="acquisitionForm" type="POST" action="https://nres.naturalretreats.com/rest/hp/createlead">
				<div class="acquisition__form__section">
					<header class="acquisition__form__section__title">
						<h3 class="title">Your Region</h3>
						<span class="underline"></span>
					</header>
					<div class="acquisition__input-wrapper acquisition__input-wrapper__name">
						<div class="input-row">
							<div class="select-wrapper">
								<div class="region select-dropdown"><span class="value">Region</span><span class="icon icon_carrot-down"></span></div>
								<select id="acquisitionFormRegion" name="REGION" dropdown required>
									<option value="none" class="remove">Region</option>
									<option value="US">United States</option>
									<option value="UK/Europe">UK/Europe</option>
									<option value="Other">Other</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div id="main-acquisition-form-content" class="hidden">
					<div class="acquisition__form__section">
						<header class="acquisition__form__section__title">
							<h3 class="title">Your Contact Information</h3>
							<span class="underline"></span>
						</header>
						<div class="acquisition__input-wrapper acquisition__input-wrapper__name">
							<div class="input-row title-field">
								<div class="select-wrapper">
									<div class="select-dropdown">Title<span class="icon icon_carrot-down"></span></div>
									<select id="acquisitionFormTitle" name="TITLE" dropdown required>
										<option value="">Title</option>
										<option value="Mr.">Mr.</option>
										<option value="Mrs.">Mrs.</option>
										<option value="Miss">Miss</option>
										<option value="Ms.">Ms.</option>
										<option value="Dr.">Dr.</option>
										<option value="Prof.">Prof.</option>
										<option value="Rev.">Rev.</option>
										<option value="Other">Other</option>
									</select>
								</div>
							</div>
							<div class="input-row">
								<input type="text" name="FIRST_NAME" value="" placeholder="First Name">
								<input type="text" name="LAST_NAME" value="" placeholder="Last Name">
							</div>
						</div>

						<div class="input-row">
							<input type="email" name="EMAIL" value=""  placeholder="Email Address" required>
							<input type="tel" name="TEL" value="" placeholder="Phone Number" required>
						</div>
					</div>
						<div class="acquisition__form__section">
							<header class="acquisition__form__section__title">
								<h3 class="title">Main Mailing Address</h3>
								<span class="underline"></span>
							</header>
							<div class="input-row input-row-1">
								<input type="text" class="address-field" name="USER_ADDRESS1" placeholder="Address" required>
							</div>
							<div class="acquisition__input-wrapper">
								<div class="input-row">
									<input class="change-city-placeholder" type="text" name="USER_CITY" placeholder="City" required>
									<div class="us-state state-select-wrapper">
										<div class="select-dropdown">State<span class="icon icon_carrot-down"></span></div>
										<select name="USER_STATE" id="acquisitionFormState">
											<option value="AL">Alabama</option>
											<option value="AK">Alaska</option>
											<option value="AZ">Arizona</option>
											<option value="AR">Arkansas</option>
											<option value="CA">California</option>
											<option value="CO">Colorado</option>
											<option value="CT">Connecticut</option>
											<option value="DE">Delaware</option>
											<option value="DC">District Of Columbia</option>
											<option value="FL">Florida</option>
											<option value="GA">Georgia</option>
											<option value="HI">Hawaii</option>
											<option value="ID">Idaho</option>
											<option value="IL">Illinois</option>
											<option value="IN">Indiana</option>
											<option value="IA">Iowa</option>
											<option value="KS">Kansas</option>
											<option value="KY">Kentucky</option>
											<option value="LA">Louisiana</option>
											<option value="ME">Maine</option>
											<option value="MD">Maryland</option>
											<option value="MA">Massachusetts</option>
											<option value="MI">Michigan</option>
											<option value="MN">Minnesota</option>
											<option value="MS">Mississippi</option>
											<option value="MO">Missouri</option>
											<option value="MT">Montana</option>
											<option value="NE">Nebraska</option>
											<option value="NV">Nevada</option>
											<option value="NH">New Hampshire</option>
											<option value="NJ">New Jersey</option>
											<option value="NM">New Mexico</option>
											<option value="NY">New York</option>
											<option value="NC">North Carolina</option>
											<option value="ND">North Dakota</option>
											<option value="OH">Ohio</option>
											<option value="OK">Oklahoma</option>
											<option value="OR">Oregon</option>
											<option value="PA">Pennsylvania</option>
											<option value="RI">Rhode Island</option>
											<option value="SC">South Carolina</option>
											<option value="SD">South Dakota</option>
											<option value="TN">Tennessee</option>
											<option value="TX">Texas</option>
											<option value="UT">Utah</option>
											<option value="VT">Vermont</option>
											<option value="VA">Virginia</option>
											<option value="WA">Washington</option>
											<option value="WV">West Virginia</option>
											<option value="WI">Wisconsin</option>
											<option value="WY">Wyoming</option>
										</select>
									</div>
									<input class="zip-to-post" type="text" name="USER_ZIP" value="" placeholder="Zip Code" required>
								</div>
							</div>
						</div>
						<!-- END OF SECTION -->
						<div class="acquisition__form__section">
							<header class="acquisition__form__section__title">
								<h3 class="title">Property Address</h3>
								<span class="underline"></span>
							</header>
							<div class="input-row input-row-1">
								<input type="text" class="address-field" name="PROPERTY_ADDRESS1" placeholder="Address" required>
							</div>
							<div class="acquisition__input-wrapper">
								<div class="input-row">
									<input class="change-city-placeholder" type="text" name="PROPERTY_CITY" placeholder="City" required>
									<div class="us-state state-select-wrapper">
										<div class="select-dropdown">State<span class="icon icon_carrot-down"></span></div>
										<select name="PROPERTY_STATE" id="acquisitionFormState">
											<option value="AL">Alabama</option>
											<option value="AK">Alaska</option>
											<option value="AZ">Arizona</option>
											<option value="AR">Arkansas</option>
											<option value="CA">California</option>
											<option value="CO">Colorado</option>
											<option value="CT">Connecticut</option>
											<option value="DE">Delaware</option>
											<option value="DC">District Of Columbia</option>
											<option value="FL">Florida</option>
											<option value="GA">Georgia</option>
											<option value="HI">Hawaii</option>
											<option value="ID">Idaho</option>
											<option value="IL">Illinois</option>
											<option value="IN">Indiana</option>
											<option value="IA">Iowa</option>
											<option value="KS">Kansas</option>
											<option value="KY">Kentucky</option>
											<option value="LA">Louisiana</option>
											<option value="ME">Maine</option>
											<option value="MD">Maryland</option>
											<option value="MA">Massachusetts</option>
											<option value="MI">Michigan</option>
											<option value="MN">Minnesota</option>
											<option value="MS">Mississippi</option>
											<option value="MO">Missouri</option>
											<option value="MT">Montana</option>
											<option value="NE">Nebraska</option>
											<option value="NV">Nevada</option>
											<option value="NH">New Hampshire</option>
											<option value="NJ">New Jersey</option>
											<option value="NM">New Mexico</option>
											<option value="NY">New York</option>
											<option value="NC">North Carolina</option>
											<option value="ND">North Dakota</option>
											<option value="OH">Ohio</option>
											<option value="OK">Oklahoma</option>
											<option value="OR">Oregon</option>
											<option value="PA">Pennsylvania</option>
											<option value="RI">Rhode Island</option>
											<option value="SC">South Carolina</option>
											<option value="SD">South Dakota</option>
											<option value="TN">Tennessee</option>
											<option value="TX">Texas</option>
											<option value="UT">Utah</option>
											<option value="VT">Vermont</option>
											<option value="VA">Virginia</option>
											<option value="WA">Washington</option>
											<option value="WV">West Virginia</option>
											<option value="WI">Wisconsin</option>
											<option value="WY">Wyoming</option>
										</select>
									</div>
									<input class="zip-to-post" type="text" name="PROPERTY_ZIP" value="" placeholder="Zip Code" required>
								</div>
							</div>
							<input id="acquisitionPropertyLegal" class="custom-check-input" type="checkbox" name="PROPERTYLEGAL" value="True">
							<label class="custom-check-label small-garamond" for="acquisitionPropertyLegal">I'm legally able to rent this property</label>
						</div> 
						<!-- END OF SECTION -->

						<div class="hidden-for-uk acquisition__form__section acquisition__property-information">
							<header class="acquisition__form__section__title">
								<h3 class="title">Property Information</h3>
								<span class="underline"></span>
							</header>
							<div class="acquisition__input-wrapper">
								<div class="input-row">
									<input type="number" name="BEDROOMS" value="" placeholder="Bedrooms" required min="0">
								</div>
								<div class="input-row">
									<input type="number" name="BATHROOMS" value="" placeholder="Bathrooms" required min="0">
								</div>
								<div class="input-row">
									<input type="number" name="SLEEPSCOUNT" value="" placeholder="How many does it sleep?" required min="0">
								</div>
								<div class="input-row">
									<input type="text" name="SQFEET" value="" placeholder="Square Footage" required >
								</div>
								<div class="input-row">
									<input type="text" name="ESTVALUE" value="" placeholder="Estimated Property Value" required >
								</div>
							</div>
							<p class="acquisition__subtitle">When you look out of your window, what do you see?</p>
							<h6 class="title small-garamond">Check all that apply</h6>
							<div class="acquisition__input-wrapper acquisition__input-wrapper__check">
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyViewMountain" class="custom-check-input" type="checkbox" value="Mountains" name="VIEWS[]">
										<label class="custom-check-label" for="acquisitionPropertyViewMountain">Mountains</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyViewGolfCourse" class="custom-check-input" type="checkbox" value="Golf Course" name="VIEWS[]">
										<label class="custom-check-label" for="acquisitionPropertyViewGolfCourse">Golf Course</label>
									</div>
								</div>
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyViewForest" class="custom-check-input" type="checkbox" value="Forest" name="VIEWS[]">
										<label class="custom-check-label" for="acquisitionPropertyViewForest">Forest</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyViewGarden" class="custom-check-input" type="checkbox" value="Garden" name="VIEWS[]">
										<label class="custom-check-label" for="acquisitionPropertyViewGarden">Garden</label>
									</div>
								</div>
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyViewLake" class="custom-check-input" type="checkbox" value="Lake" name="VIEWS[]">
										<label class="custom-check-label" for="acquisitionPropertyViewLake">Lake</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyViewRiver" class="custom-check-input" type="checkbox" value="River" name="VIEWS[]">
										<label class="custom-check-label" for="acquisitionPropertyViewRiver">River</label>
									</div>
								</div>
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyViewBeach" class="custom-check-input" type="checkbox" value="Beach" name="VIEWS[]">
										<label class="custom-check-label" for="acquisitionPropertyViewBeach">Beach</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyViewOcean" class="custom-check-input" type="checkbox" value="Ocean" name="VIEWS[]">
										<label class="custom-check-label" for="acquisitionPropertyViewOcean">Ocean</label>
									</div>
								</div>
								<div class="input-row">
									<textarea name="DESCR" placeholder="Other Description"></textarea>
								</div>

							</div>
							<p class="acquisition__subtitle">Any Special Features that we should know about?</p>
							<div class="acquisition__input-wrapper acquisition__input-wrapper__check">
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeaturePool" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Private Pool">
										<label class="custom-check-label" for="acquisitionPropertyFeaturePool">Private Pool</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeatureGolfCart" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Golf Cart">
										<label class="custom-check-label" for="acquisitionPropertyFeatureGolfCart">Golf Cart</label>
									</div>
								</div>
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeaturePorch" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Porch">
										<label class="custom-check-label" for="acquisitionPropertyFeaturePorch">Porch</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeatureWasher" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Washer & Dryer">
										<label class="custom-check-label" for="acquisitionPropertyFeatureWasher">Washer/Dryer</label>
									</div>
								</div>
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeatureParking" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Parking">
										<label class="custom-check-label" for="acquisitionPropertyFeatureParking">Parking</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeatureElevator" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Elevator">
										<label class="custom-check-label" for="acquisitionPropertyFeatureElevator">Elevator</label>
									</div>
								</div>
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeatureDVD" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="DVD Player">
										<label class="custom-check-label" for="acquisitionPropertyFeatureDVD">DVD Player</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeatureFireplace" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Fireplace">
										<label class="custom-check-label" for="acquisitionPropertyFeatureFireplace">Fireplace</label>
									</div>
								</div>
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeatureInternet" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Internet">
										<label class="custom-check-label" for="acquisitionPropertyFeatureInternet">Internet</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeatureJacuzzi" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Jacuzzi Hot Tub">
										<label class="custom-check-label" for="acquisitionPropertyFeatureJacuzzi">Jacuzzi/Hot Tub</label>
									</div>
								</div>
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeaturePet" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Pet Friendly">
										<label class="custom-check-label" for="acquisitionPropertyFeaturePet">Pet Friendly</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeatureBillards" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Billards Table">
										<label class="custom-check-label" for="acquisitionPropertyFeatureBillards">Billards Table</label>
									</div>
								</div>
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeatureWheelchair" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Wheelchair Access">
										<label class="custom-check-label" for="acquisitionPropertyFeatureWheelchair">Wheelchair Access</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeatureElderly" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Suitable for the Elderly">
										<label class="custom-check-label" for="acquisitionPropertyFeatureElderly">Suitable for the Elderly</label>
									</div>
								</div>
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeatureKidFriendly" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Kid Friendly">
										<label class="custom-check-label" for="acquisitionPropertyFeatureKidFriendly">Kid Friendly</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeaturePingPong" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Ping-Pong">
										<label class="custom-check-label" for="acquisitionPropertyFeaturePingPong">Ping-Pong Table</label>
									</div>
								</div>
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeatureGrill" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Grill">
										<label class="custom-check-label" for="acquisitionPropertyFeatureGrill">Grill</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeatureCar" name="FEATURE1[]" class="custom-check-input" type="checkbox" value="Car Available">
										<label class="custom-check-label" for="acquisitionPropertyFeatureCar">Car Available</label>
									</div>
								</div>
							</div>
							<p class="acquisition__subtitle">Anything else?</p>
							<div class="acquisition__input-wrapper acquisition__input-wrapper__check">
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeature2ClubAccess" name="FEATURE2[]" class="custom-check-input" type="checkbox" value="Club Access">
										<label class="custom-check-label" for="acquisitionPropertyFeature2ClubAccess">Club Access</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeature2Gym" name="FEATURE2[]" class="custom-check-input" type="checkbox" value="Gym">
										<label class="custom-check-label" for="acquisitionPropertyFeature2Gym">Gym</label>
									</div>
								</div>
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeature2Fitness" name="FEATURE2[]" class="custom-check-input" type="checkbox" value="Fitness Room">
										<label class="custom-check-label" for="acquisitionPropertyFeature2Fitness">Fitness Room</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeature2Pool" name="FEATURE2[]" class="custom-check-input" type="checkbox" value="Pool">
										<label class="custom-check-label" for="acquisitionPropertyFeature2Pool">Pool</label>
									</div>
								</div>
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeature2Golf" name="FEATURE2[]" class="custom-check-input" type="checkbox" value="Golf">
										<label class="custom-check-label" for="acquisitionPropertyFeature2Golf">Golf</label>
									</div>
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeature2Tennis" name="FEATURE2[]" class="custom-check-input" type="checkbox" value="Tennis">
										<label class="custom-check-label" for="acquisitionPropertyFeature2Tennis">Tennis</label>
									</div>
								</div>
								<div class="input-row">
									<div class="checkbox-wrapper">
										<input id="acquisitionPropertyFeature2Spa" name="FEATURE2[]" class="custom-check-input" type="checkbox" value="Spa">
										<label class="custom-check-label" for="acquisitionPropertyFeature2Spa">Spa</label>
									</div>
								</div>
							</div>
							<p class="acquisition__subtitle">Let us know what makes your property so unique.</p>
							<div class="acquisition__input-wrapper">
								<div class="input-row">
									<textarea name="DESCR2" placeholder="Other Description"></textarea>
								</div>
							</div>
						</div>
						<input type="submit" class="btn btn__blue" value="SUBMIT">
					</div>
			</form>
			<div class="acquisition__thankyou">
				<p>Thank you for your information</p>
			</div>
		</div>
	</article>
</section>