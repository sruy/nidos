export class Migration {
    id: string;
    visibleName: string;
    startDate: Date;
    endDate: Date;
    comments: string;

    constructor(id: string, visibleName: string, startDate: Date, endDate?: Date, comments?: string) {
        this.id = id;
        this.visibleName = visibleName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.comments = comments;
    }
}
