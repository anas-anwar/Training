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
	
	charity = frappe.db.sql(''' select * from `tabCharity Account` where email_address = '{0}' '''.format(frappe.session.user),as_dict=True)
	
	if(charity):
		context.is_charity_account = 1
		context.charity = charity[0]
	else:
		frappe.throw(_("Not a charity account, you don't have permission over this page"), frappe.PermissionError)

	
	context.show_sidebar=True