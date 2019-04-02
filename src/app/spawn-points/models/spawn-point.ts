import { City } from 'src/app/nest-reports/models/city';

export class SpawnPoint {
    pointId: string;
    lat: number;
    long: number;
    link: URL;
    name: string;
    attributes: string;
    thirdPartyNestId: string;
    thirdPartyService: string;
    thirdPartyLink: string;
    city: City;

    constructor(name: string, attributes: string, lat: number, long: number, link: URL, thirdPartyNestId: string,
        thirdPartyService: string, thirdPartyLink: string, city: any) {
        this.name = name;
        this.attributes = attributes;
        this.lat = lat;
        this.long = long;
        this.link = link;
        this.thirdPartyNestId = thirdPartyNestId;
        this.thirdPartyService = thirdPartyService;
        this.thirdPartyLink = thirdPartyLink;
        this.city = city;
    }
}
