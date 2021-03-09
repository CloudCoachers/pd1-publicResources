import { LightningElement, api, track, wire } from "lwc";
import getContactList from "@salesforce/apex/ContactController.getContactList";
import findContacts from "@salesforce/apex/ContactController.findContacts";

export default class ContactList extends LightningElement {
	@api recordId;
	@track contacts;
	@track error;

	@wire(getContactList, { accountId: "$recordId" })
	getcontacts({ error, data }) {
		if (data) {
			this.contacts = data;
			this.error = undefined;
		} else {
			this.contacts = undefined;
			this.error = error;
		}
	}

	handleKeyChange(event) {
		const searchKey = event.target.value;
		findContacts({ searchKey })
			.then(result => {
				this.contacts = result;
				this.error = undefined;
			})
			.catch(error => {
				this.error = error;
				this.contacts = undefined;
			});
	}
}
