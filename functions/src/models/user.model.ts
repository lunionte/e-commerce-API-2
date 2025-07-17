import { Joi } from "celebrate";
import { DocumentData, FirestoreDataConverter } from "firebase-admin/firestore";

// modelos de tratamento de dados obtidos pelo celebrate

export class User {
    id: string;
    nome: string;
    email: string;
    password?: string;

    constructor(data: User | any) {
        this.id = data.id;
        this.nome = data.nome;
        this.email = data.email;
        this.password = data.password;
    }
}

export const newUserSchema = Joi.object().keys({
    nome: Joi.string().uppercase().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).required(),
});

export const updateUserSchema = Joi.object().keys({
    nome: Joi.string().uppercase().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6),
});

export const authLoginSchema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).required(),
});

export const authRecoverySchema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
});

export const userConverter: FirestoreDataConverter<User> = {
    toFirestore: (user: User): DocumentData => {
        return {
            nome: user.nome,
            email: user.email,
        };
    },
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot): User => {
        return new User({
            id: snapshot.id,
            ...snapshot.data(),
        });
    },
};
