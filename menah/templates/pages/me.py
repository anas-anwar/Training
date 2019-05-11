# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
import frappe.www.list

no_cache = 1
no_sitemap = 1

def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)

	charity_account = frappe.db.sql("select verified from `tabCharity Account` where email_address = '{0}'".format(frappe.session.user))
	if(charity_account):
		if(charity_account[0]):
			if(not charity_account[0][0]):
				context.state = _('Your Account is currently under reviewing.')
			else:
				pass


	context.show_sidebar=True