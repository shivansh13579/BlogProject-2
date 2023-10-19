import conf from "../conf/Conf";
import {Client,ID,Databases,Storage,Query} from "appwrite";

export class Service{
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,content,featuredImage,status,slug,userId}){
        try {
          return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            )
        } catch (error) {
            console.log("AppwriteService :: createPost :: error",error);
        }

    }

    async updatePost(slug,{title,content,featuredImage,status}){
         try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
         } catch (error) {
            console.log("AppwriteService :: updatePost :: error",error);
         }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBucketId,
                slug
            )
            return true
        } catch (error) {
            console.log("AppwriteService :: deletePost :: error",error);
            return false
        }
    }
}