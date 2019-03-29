import * as moment from 'moment';
export class Migration {
    id: string;
    visibleName: string;
    startDate: moment.Moment;
    endDate: moment.Moment;
    comments: string;

    constructor(id: string, visibleName: string, startDate: moment.Moment, endDate?: moment.Moment, comments?: string) {
        this.id = id;
        this.visibleName = visibleName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.comments = comments;
    }
}
