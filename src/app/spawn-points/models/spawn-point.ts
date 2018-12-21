export class SpawnPoint {
    lat: number;
    long: number;
    link: URL;
    name: string;
    attributes: string;

    constructor(name: string, attributes: string, lat: number, long: number, link: URL) {
        this.name = name;
        this.attributes = attributes;
        this.lat = lat;
        this.long = long;
        this.link = link;
    }
}
