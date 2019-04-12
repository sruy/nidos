import * as moment from 'moment';
import { Status } from 'src/app/models/status';
export class Migration {
    migrationId: string;
    visibleName: string;
    startDate: moment.Moment;
    endDate: moment.Moment;
    comments: string;
    status: Status;

    constructor(id: string, visibleName: string, startDate: moment.Moment, endDate?: moment.Moment, comments?: string,
        status?: Status) {
        this.migrationId = id;
        this.visibleName = visibleName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.comments = comments;
        this.status = status || new Status(1, 'Enabled'); 
    }
}
