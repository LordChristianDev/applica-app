export type ApplicationProp = {
	Id: number;
	UserId: number;
	Company: string;
	Position: string;
	DateApplied: string;
	Status: "Interview" | "Applied" | "Offer" | "Rejected";
	Notes: string | null;
	CreatedAt: string;
	UpdatedAt: string;
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
	Id: number;
	Uid: string;
	Name: string;
	CreatedAt: string;
	LastLogin: string;
};