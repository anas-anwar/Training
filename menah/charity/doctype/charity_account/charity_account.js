// Copyright (c) 2019, ammarhararah@gmail.com and contributors
// For license information, please see license.txt

frappe.ui.form.on('Charity Account', {
	refresh: function (frm) {

		if (frm.doc.docstatus) {
			frappe.call({
				doc: frm.doc,
				method: "check_charity_account_state",
				callback: function (value) {
					if (value.message) {

						frm.add_custom_button(__("Deactivate"), function () {
							frappe.confirm(__('Are you sure to deactivate this account?'),
								function () {
									frappe.call({
										doc: frm.doc,
										method: "deactivate_charity_account",
										callback: function (value) {
											if (value.message) {
												frm.reload_doc()
												show_alert(__('Account Deactivated!'));
											}
										}
									})
								},
								function () {
									show_alert(__('Deactivation Canceled!'));
								}
							)


						}).addClass('btn-danger');
					} else {
						frm.add_custom_button(__("Activate"), function () {
							frappe.confirm(__('Are you sure to activate this account?'),
								function () {
									frappe.call({
										doc: frm.doc,
										method: "activate_charity_account",
										callback: function (value) {
											if (value.message) {
												frm.reload_doc()
												show_alert(__('Account Activated'));

											}
										}

									})
								},
								function () {
									show_alert(__('Activation Canceled!'));
								}
							)

						}).addClass('btn-primary');

					}
				}
			})

		}
	},
	onload: function (frm) {

		var map; //Will contain map object.
		var marker = false; ////Has the user plotted their location marker? 

		window.initMap = function initMap() {

			//The center location of our map.
			var latitude = 23.8859;
			var longitude = 45.0792;
			if (frm.doc.latitude) {
				latitude = frm.doc.latitude;
			}
			if (frm.doc.longitude) {
				longitude = frm.doc.longitude;
			}
			var centerOfMap = new google.maps.LatLng(latitude, longitude);

			//Map options.
			var options = {
				center: centerOfMap, //Set center.
				zoom: 7 //The zoom value.
			};

			//Create the map object.
			map = new google.maps.Map(document.getElementById('googleMap'), options);

			//Listen for any clicks on the map.
			google.maps.event.addListener(map, 'click', function (event) {
				//Get the location that the user clicked.
				var clickedLocation = event.latLng;
				//If the marker hasn't been added.
				if (marker === false) {
					//Create the marker.
					marker = new google.maps.Marker({
						position: clickedLocation,
						map: map,
						draggable: true //make it draggable
					});
					//Listen for drag events!
					google.maps.event.addListener(marker, 'dragend', function (event) {
						markerLocation();
					});
				} else {
					//Marker has already been added, so just change its location.
					marker.setPosition(clickedLocation);
				}
				//Get the marker's location.
				markerLocation();
			});
		}

		//This function will get the marker's current location and then add the lat/long
		//values to our textfields so that we can save the location.
		function markerLocation() {
			//Get location.
			var currentLocation = marker.getPosition();
			//Add lat and lng values to a field that we can save.
			frm.set_value("latitude", currentLocation.lat()); //latitude
			frm.set_value("longitude", currentLocation.lng()); //longitude
		}

		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCQIs9v8RSKtRab6Z0Z7CxtDjF3EK4B9kg&callback=initMap';
		head.appendChild(script);
	}
});
