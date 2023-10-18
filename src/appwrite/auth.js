import {Client,Account,ID} from "appwrite";
import conf from "../conf/Conf";

export class AuthService {
      client = new Client();
      account;

      constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
      }

      async createAccount({email,password,name}){
             try {
                const userAccount = await this.account.create(ID.unique(),email,password,name);
                if(userAccount){
                    
                }else{
                    return userAccount;
                }
             } catch (error) {
                throw error;
             }
      }
}

const authservice = new AuthService()
export default authservice; 

