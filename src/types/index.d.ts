import { ObjectId } from 'mongoose';

type gender = "male" | "female" | "other";



interface IFullUser {
	_id: ObjectId;
	email: string;
	username: string;
	firstName: string;
	role: "vendor" | "customer" | "HiTable";
	lastName: string;
	telephone:string;
	country: ObjectId;
	meta: {
		active: boolean;
		activatedAt: Date;
		disabledService: "hiPay" | "highTable" | "none";
		deactivatedAt: Date;
	}
	followingCount: number;
	followerCount: number;
	isActive: boolean;
	reviewCount: number;
	interests: string[];
	preferences: string[];
	gender: gender
	dob: string;
	middleName: string;
	profileImage: string;
	address: string;
	about: string;
	verified: boolean;
	verifiedAt: Date
}



type PLAY_GROUND_MODE = "yes" | "no"
