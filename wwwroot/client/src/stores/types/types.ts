export type ApplicationProp = {
	id: number;
	userId: number;
	company: string;
	position: string;
	dateApplied: string;
	status: "Interview" | "Applied" | "Offer" | "Rejected";
	notes: string | null;
	createdAt: string;
	updatedAt: string;
};

export type ApplicationFormProp = {
	company: string;
	position: string;
	dateApplied: string;
	status: "Interview" | "Applied" | "Offer" | "Rejected";
	notes: string | null;
};

export type ProfileProp = {
	Id: number;
	UserId: number;
	Name: string;
	Avatar: string;
	CreatedAt: string;
	UpdatedAt: string;
};

export type UserProp = {
	id: number;
	uid: string;
	createdAt: string;
	lastLogin: string;
};