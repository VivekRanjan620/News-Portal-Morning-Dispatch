import { ImageGravity } from "appwrite"
import { appwriteConfig, storage } from "./config"

//UPLOAD FILE
export async function uploadFile(file) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        )

        return uploadedFile
    } catch (error) {
        console.log(error)
    }
}

//Get File Url
export async function getFilePreview(fileId) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            ImageGravity.Top,
            100
        )

        if(!fileUrl) throw Error
        return fileUrl
        
    } catch (error) {
        console.log(error)
    }
}