import { FirebaseError } from "firebase/app";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error.js";
import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { User } from "../models/user.model.js";
import { FirebaseAuthError, getAuth, UpdateRequest, UserRecord } from "firebase-admin/auth";
import {
    getAuth as getFirebaseAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    UserCredential,
} from "firebase/auth";

// 🔐 Serviço responsável por gerenciar a autenticação de usuários usando Firebase Authentication.
// Cria usuários com email, senha e displayName no Firebase Auth, garantindo login seguro,
// controle de senhas e recuperação de conta.
// Também trata erros específicos, como tentativa de criar usuário com email já existente.
export class AuthService {
    async create(user: User): Promise<UserRecord> {
        try {
            return await getAuth().createUser({
                email: user.email,
                password: user.password,
                displayName: user.nome,
            });
        } catch (err) {
            if (err instanceof FirebaseAuthError && err.code === "auth/email-already-exists") {
                throw new EmailAlreadyExistsError();
            }
            throw err;
        }
    }

    async update(id: string, user: User) {
        const props: UpdateRequest = {
            displayName: user.nome,
            email: user.email,
        };

        if (user.password) {
            props.password = user.password;
        }

        await getAuth().updateUser(id, props);
    }

    async login(email: string, password: string): Promise<UserCredential> {
        try {
            // signInWithEmailAndPassword é do próprio firebase/auth
            return await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
        } catch (error) {
            if (error instanceof FirebaseError && error.code === "auth/invalid-credential") {
                throw new UnauthorizedError("Email ou senha inválidos");
            }
            throw error;
        }
    }

    async delete(id: string) {
        await getAuth().deleteUser(id);
    }

    async recovery(email: string) {
        await sendPasswordResetEmail(getFirebaseAuth(), email);
    }
}
