import Base from "../../base";
import axiosBase from '../../helper/axiosBase';
import { AuthenticationError } from 'apollo-server-express';

class AuthDatasource extends Base {
	async accountLogin(user:{email:string, password:string}){
		return new Promise(async (resolve, reject) => {
			axiosBase.post('/login', user).then((data)=>{
			   resolve(data.data)
			}).catch((e)=>{
				reject(new AuthenticationError(e?.response?.data?.message))
			})
		})
	}

	async createNewAccount(data:any) {
		return new Promise(async (resolve, reject) => {
			axiosBase.post('/', data).then((data)=>{
				console.log(data.data);
				resolve("Account created successfully")
			}).catch((e)=>{
				reject(new AuthenticationError(e?.response?.data?.message))
			})
		})
	}
	async getCurrentUser() {
		return new Promise(async (resolve, reject) => {
			axiosBase.get('/profile').then((data)=>{
				resolve(data.data)
			}).catch((e)=>{
				console.log(e.response);
				reject(new AuthenticationError(e?.response?.data?.message))
			})
		})
	}

	async updateUserAccount(data:any) {
		return new Promise(async (resolve, reject) => {
			console.log(data);
			axiosBase.post('/update-account', data).then((data)=>{
				resolve(data.data)
			}).catch((e)=>{
				reject(new AuthenticationError(e?.response?.data?.message))
			})
		})
	}

	async updateUserPassword(data:any) {
		return new Promise(async (resolve, reject) => {
			axiosBase.post('/update-password', data).then((data)=>{
				resolve(data.data)
			}).catch((e)=>{
				reject(new AuthenticationError(e?.response?.data?.message))
			})
		})
	}

	async resetUserPassword(data:any) {
		return new Promise(async (resolve, reject) => {
			axiosBase.post('/reset-password', data).then((data)=>{
				resolve(data.data)
			}).catch((e)=>{
				reject(new AuthenticationError(e?.response?.data?.message))
			})
		})
	}

	async disableUserAccount(data:any) {
		return new Promise(async (resolve, reject) => {
			axiosBase.post('/disable-account', data).then((data)=>{
				resolve(data.data)
			}).catch((e)=>{
				reject(new AuthenticationError(e?.response?.data?.message))
			})
		})
	}

}


export default AuthDatasource;
