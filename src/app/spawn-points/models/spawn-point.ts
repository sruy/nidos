export class SpawnPoint {
    pointId: string;
    lat: number;
    long: number;
    link: URL;
    name: string;
    attributes: string;
    nestId: string;

    constructor(name: string, attributes: string, lat: number, long: number, link: URL, nestId: string) {
        this.name = name;
        this.attributes = attributes;
        this.lat = lat;
        this.long = long;
        this.link = link;
        this.nestId = nestId;

    }
}
