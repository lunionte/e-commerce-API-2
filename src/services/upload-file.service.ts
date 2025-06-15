import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { fileTypeFromBuffer } from "file-type";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseApiKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseApiKey) {
    throw new Error("VARIAVEIS SUPABASE NÃO DEFINIDAS");
}

const supabase = createClient(supabaseUrl, supabaseApiKey);

export class UploadFileService {
    constructor(private path: string = "") {}

    async upload(base64: string) {
        const fileBufer = Buffer.from(base64, "base64"); // transforma aquela string gigante em uma imagem em binário
        const fileType = await fileTypeFromBuffer(fileBufer);
        const fileName = `${this.path}${randomUUID()}.${fileType?.ext}`; // o ext é a extensão do arquivo (png, jpeg)

        await supabase.storage.from("companies-upload").upload(fileName, fileBufer); // faz o upload da imagem na 'pasta virtual' images/nomeDaimg

        const { data } = supabase.storage.from("companies-upload").getPublicUrl(fileName);

        return data.publicUrl;
    }
}
