from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Charity Module"),
			"items": [
				{
					"type": "doctype",
					"name": "Charity Account",
				}
            ]
            }
        ]