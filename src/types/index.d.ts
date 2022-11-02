interface IUser {
	userId: string;
	email: string;
	verified?: boolean;
	role: "vendor" | "customer" | "HiTable";
	verifiedAt?: Date;
}

type PLAY_GROUND_MODE = "yes" | "no"
