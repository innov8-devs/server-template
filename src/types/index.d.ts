interface IUser {
	userId: string;
	email: string;
	verified?: boolean;
	verifiedAt?: Date;
}

type PLAY_GROUND_MODE = "yes" | "no"
