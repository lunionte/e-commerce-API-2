import fs from "node:fs";
import { getStorage, getDownloadURL } from "firebase-admin/storage";
import { fileTypeFromBuffer } from "file-type";
import { randomUUID } from "node:crypto";
import { ValidationError } from "../errors/validation.error.js";

export class UploadFileService {
    constructor(private path: string) {}

    async upload(base64: string): Promise<string> {
        const fileBuffer = Buffer.from(base64, "base64");

        const fileType = await fileTypeFromBuffer(fileBuffer);
        if (!fileType) {
            throw new ValidationError("A extensão do arquivo não é válida!");
        }

        if (fileType.mime !== "image/jpeg" && fileType.mime !== "image/png") {
            throw new ValidationError("A imagem precisa ser PNG ou JPEG!");
        }

        const fileName = `${randomUUID().toString()}.${fileType?.ext}`;
        fs.writeFileSync(fileName, fileBuffer);

        const bucket = getStorage().bucket();
        const uploadResponse = await bucket.upload(fileName, {
            destination: this.path + fileName,
        });

        fs.unlinkSync(fileName);

        return getDownloadURL(uploadResponse[0]);
    }
}
