export type ApplicationProp = {
	id: number;
	created_at: string;
	updated_at: string;
	company: string;
	position: string;
	date_applied: string;
	status: "Interview" | "Applied" | "Offer" | "Rejected";
	notes: string;
};