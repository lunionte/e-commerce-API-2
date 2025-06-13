import fs from "fs";

export class UploadFileService {
    constructor(/*private path: string = "" */) {}

    async upload(base64: string) {
        const fileBufer = Buffer.from(base64, "base64"); // transforma aquela string gigante em uma imagem em binário
        fs.writeFileSync("image.png", fileBufer);
    }
}
