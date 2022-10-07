import Base from "../../base";
import {myDataSource} from "../../../configs/Database";
import Borrower from "../../Entities/borrowers";

class BorrowersDatasource extends Base {
	getAllBorrowers() {
		return myDataSource.getRepository(Borrower).find();
	}

	async addNewBorrower() {
		await myDataSource.getRepository(Borrower).save({
			firstName: "test"
		})
		return "test";
	}
}


export default BorrowersDatasource;
