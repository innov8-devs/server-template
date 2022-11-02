import Base from "../../base";
import axiosBase from '../../helper/axiosBase';
import { UserInputError } from 'apollo-server-express';

interface country {
	_id: string;
	name: string;
	currency: string;
	currencyCode: string;
	currencySymbol: string;
	isActive: boolean;
}

class UtilsDatasource extends Base {
	async getCountries(): Promise<country[]> {
		return new Promise(async (resolve, reject) => {
			axiosBase.get('/countries').then((data)=>{
			   resolve(data.data)
			}).catch((e)=>{
				reject(new UserInputError(e?.response?.data?.message))
			})
		})
	}
	
	async getACountry(countryId:string):Promise<country> {
		return new Promise(async (resolve, reject) => {
			axiosBase.get(`/get-a-country/${countryId}`).then((data)=>{
			   resolve(data.data as country)
			}).catch((e)=>{
				reject(new UserInputError(e?.response?.data?.message))
			})
		})
	}
	
	async updateCountryStatus(status:boolean, countryId:string){
		return new Promise(async (resolve, reject) => {
			axiosBase.post(`/update-a-country-status`, {
				countryId,
				status
			}).then((data)=>{
			   resolve(data.data)
			}).catch((e)=>{
				reject(new UserInputError(e?.response?.data?.message))
			})
		})
	}
}


export default UtilsDatasource;
