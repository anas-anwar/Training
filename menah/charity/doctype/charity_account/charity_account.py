# -*- coding: utf-8 -*-
# Copyright (c) 2019, ammarhararah@gmail.com and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe import _

class CharityAccount(Document):
	def on_submit(self):
		pass

	def after_insert(self):
		user = frappe.get_doc({
				"doctype": "User",
				"email": self.email_address,
				"first_name": self.organization_name,
				"username": self.username,
				"new_password":self.get_password('password'),
				"language": "ar",
				"send_welcome_email": 0
			})

		user.save(ignore_permissions=True)

		# self.user = user.name
		# self.save(ignore_permissions=True)

	def check_charity_account_state(self):
		user_doc = frappe.get_doc("User",self.email_address)
		if(user_doc.enabled):
			return self.verified
		else:
			return False

	def deactivate_charity_account(self):
		frappe.set_value("User",self.email_address,"enabled",0)
		frappe.db.set_value("Charity Account",self.name,"account_state","Disabled")

		return True

	def activate_charity_account(self):
		frappe.set_value("User",self.email_address,"enabled",1)
		
		frappe.db.set_value("Charity Account",self.name,"verified",1)
		frappe.db.set_value("Charity Account",self.name,"account_state","Active")

		self.send_activation_email()
		
		# self.save()

		return True

	def send_activation_email(self):
		message = _("Congratulations, your account has been verified")
		msg_form = frappe.render_template('/templates/emails/standard.html',{})


		rec = self.email_address or None
		sender = frappe.get_value("Email Account", filters = {"default_outgoing": 1}, fieldname = "email_id") or None
		if rec != None:
			try:
				frappe.sendmail(sender=sender, recipients= rec,
					content=message, subject=_("Charity Account Activated - Menah"))

			except:
				frappe.msgprint(_("Failed to send email!"))


@frappe.whitelist(allow_guest=True)
def get_expiring_accounts():
	accounts = frappe.get_all('Charity Account',fields=["licence_expire_date"])