import { LightningElement, api } from "lwc";

export default class ContactTile extends LightningElement {
	@api contact;

	get initials() {
		return this.contact.Name.slice(0, 2);
	}

	set initials(value) {
		this.initials = value;
	}
}
