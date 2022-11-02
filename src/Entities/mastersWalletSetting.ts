import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	Index, ObjectID,
	ObjectIdColumn,
	UpdateDateColumn
} from 'typeorm';
import { ObjectId } from 'mongodb';

export enum allowedServices {
	transfer = 'transfer',
	withdraw = 'withdraw',
	swapFunds= 'swapFunds',
	deposit = 'deposit',
	accountNumber = 'accountNumber',
	pay = 'pay'
}




export class AllowedWalletServices {
	@Column()
	service: allowedServices;

	@Column()
	enabled: boolean;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;
	
	constructor(service: allowedServices, enabled: boolean) {
		this.service = service;
		this.enabled = enabled;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}


@Entity()
@Index(['walletCountryId', 'walletCurrency'])
export class MastersWalletSetting extends BaseEntity {
	@ObjectIdColumn()
	_id: string;
	
	@Column()
	walletCurrency: string;
	
	@Column()
	walletCurrencyCode: string;
	
	@Column()
	walletCurrencySymbol: string;
	
	@Column()
	walletCurrencyName: string;
	
	@ObjectIdColumn()
	walletCountryId: ObjectID;
	
	@ObjectIdColumn()
	addonWalletCountryId: ObjectID;
	
	@Column(()=> AllowedWalletServices)
	allowedServices: AllowedWalletServices[];
	
	@Column({ default: false })
	disabled: boolean = false;
	
	@CreateDateColumn()
	createdAt: Date;
	
	@UpdateDateColumn()
	updatedAt: Date;
}
