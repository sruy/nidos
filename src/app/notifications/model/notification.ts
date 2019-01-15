export class Notification {
    id: string;
    date: Date;
    title: string;
    richMessage: string;

    constructor(options: {id: string, date: Date, title: string, richMessage: string}) {
        this.id = options.id;
        this.date = options.date;
        this.title = options.title;
        this.richMessage = options.richMessage;
    }
}
