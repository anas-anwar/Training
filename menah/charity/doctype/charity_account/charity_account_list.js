// Copyright (c) 2019, ammarhararah@gmail.com and contributors
// For license information, please see license.txt

frappe.listview_settings['Charity Account'] = {
	add_fields: [""],
	get_indicator: function (doc) {

	},
	onload: function(listview) {
		// var method = "erpnext.selling.doctype.sales_order.sales_order.close_or_unclose_sales_orders";

		// listview.page.add_menu_item(__("Close"), function() {
		// 	listview.call_for_selected_items(method, {"status": "Closed"});
		// });

		// listview.page.add_menu_item(__("Re-open"), function() {
		// 	listview.call_for_selected_items(method, {"status": "Submitted"});
		// });

		// $('.level.list-row .level-left.ellipsis').append('<button class="custom-list-button">hello</button>');

	}
};
