import * as moment from 'moment';
import { Status } from 'src/app/models/status';

export class Notification {
    notifId: number;
    date: moment.Moment;
    title: string;
    richMessage: string;
    user: any;
    status: Status;

    constructor(options: {notifId: number, date: moment.Moment, title: string, richMessage: string, user: any, status?: Status}) {
        this.notifId = options.notifId;
        this.date = options.date;
        this.title = options.title;
        this.richMessage = options.richMessage;
        this.user = options.user;
        this.status = options.status || new Status(1, 'Enabled');
    }
}
