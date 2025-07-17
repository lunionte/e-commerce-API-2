import { ValidationError } from "../errors/validation.error.js";

export const isStorageUrlValid = (urlString: string): boolean => {
    try {
        const url = new URL(urlString);
        if (url.host !== "firebasestorage.googleapis.com") {
            throw new ValidationError("URL de origem invalida");
        }
        return true;
    } catch (error) {
        if (error instanceof ValidationError) {
            throw error;
        }
        return false;
    }
};
