import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpawnPointsService } from '../spawnpoints.service';
import { SpawnPoint } from '../models/spawn-point';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscriber } from 'rxjs';
import { CitiesService } from 'src/app/nest-reports/cities.service';
import { City } from 'src/app/nest-reports/models/city';

@Component({
  selector: 'app-sp-crud',
  templateUrl: './sp-crud.component.html',
  styleUrls: ['./sp-crud.component.css']
})
export class SpCrudComponent implements OnInit {
  form: FormGroup;
  name: string = '';
  description: string = '';
  lat: number;
  long: number;
  link: URL = null;
  paramPoint: SpawnPoint;
  city: City;
  cities: {label: string, value: any}[] = [];
  thirdPartyNestId: any = '';
  thirdPartyService: any = '';
  thirdPartyLink: any = '';

  constructor(private fb: FormBuilder, private spService: SpawnPointsService, private messageService: MessageService,
    private route: ActivatedRoute, private router: Router, private citiesService: CitiesService) { }

  ngOnInit() {
    this.citiesService.getAllCities().subscribe(cities => {
      cities.forEach(city => {
        this.cities.push({label: city.name, value: city});
      });
    });

    this.form = this.fb.group({
      city: [this.city, Validators.required],
      name: [this.name, Validators.required],
      description: [this.description],
      link: [this.link, Validators.required],
      lat: [this.lat],
      long: [this.long],
      thirdPartyNestId: [this.thirdPartyNestId],
      thirdPartyService: [this.thirdPartyService],
      thirdPartyLink: [this.thirdPartyLink]
    });

    let pointId = this.route.snapshot.paramMap.get('pointId');

    if (pointId) {
      this.spService.getSpawnPoint(pointId).subscribe(point => {
        this.paramPoint = point;

        this.form.setValue({
          city: point.city,
          name: point.name,
          description: point.description || '',
          link: point.link,
          lat: Number.parseFloat(point.lat) || 0,
          long: Number.parseFloat(point.long) || 0,
          thirdPartyNestId: point.thirdPartyNestId || '',
          thirdPartyService: point.thirdPartyService || '',
          thirdPartyLink: point.thirdPartyLink || ''
        });
      });
    }
  }

  savePoint(event) {
    if (this.form.valid) {
      const { name, description, lat, long, link, thirdPartyLink, thirdPartyNestId, thirdPartyService, city } = this.form.value;

      let saveSub;
      if (this.paramPoint) {
        saveSub = this.spService.editSpawnPoint(this.paramPoint.pointId, this.form.value, this.messageService);
      } else {
        // New Point
        saveSub = this.spService.newSpawnPoint(new SpawnPoint(
          name, description, lat, long, link, thirdPartyNestId, thirdPartyService, thirdPartyLink, city
        ), this.messageService);

        this.clearPointForm();
      }

      saveSub.subscribe(result => {
        window.setTimeout(() => {
          this.router.navigate(['points']);
        }, 2500);
      })
    } else {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Chequea que los campos con (*) hayan sido rellenados.' });
    }
  }

  clearPointForm() {
    this.form.reset();
  }

  backToList() {
    window.history.back();
  }
}
