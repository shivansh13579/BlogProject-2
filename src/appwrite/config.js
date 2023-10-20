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

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error",error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error",error);
            return false;

        }
    }

    // file upload

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error",error);
            return false
        }
    }

    async deleteFile(fileId){
         try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
         } catch (error) {
            console.log("Appwrite Service :: fileId :: error",error);
            return false
         }
    }

    getFilePreview(fileId){
         return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
         )
    }
}

const service = new Service()
export default service;