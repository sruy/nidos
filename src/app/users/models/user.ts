export class User {
    id: number;
    discordId: string;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    role: any; // ToDo: add Role model
    jwt: string;
}