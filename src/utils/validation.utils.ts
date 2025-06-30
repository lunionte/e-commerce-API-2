import { ValidationError } from "../errors/validation.error.js";

export const isStorageUrlValid = (urlString: string): boolean => {
    try {
        const url = new URL(urlString);
        if (url.origin !== "https://ymevvwcalqcinjkquajc.supabase.co") {
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
