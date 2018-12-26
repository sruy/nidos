import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpawnPointsService } from '../spawnpoints.service';
import { SpawnPoint } from '../models/spawn-point';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-sp-crud',
  templateUrl: './sp-crud.component.html',
  styleUrls: ['./sp-crud.component.css']
})
export class SpCrudComponent implements OnInit {
  form: FormGroup;
  name: string;
  attributes: string;
  lat: number;
  long: number;
  link: URL;
  nestId: string;
  paramPoint: SpawnPoint;
  static lastSaved = 100// debug only
  point$;

  constructor(private fb: FormBuilder, private spService: SpawnPointsService, private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let pointId = this.route.snapshot.paramMap.get('pointId');

    this.point$ = this.spService.getSpawnPoint(pointId);

    if (pointId) {
      this.point$.subscribe().map(point => {
        this.name = point.name;
        this.attributes = point.attributes;
        this.link = point.link;
        this.lat = point.lat;
        this.long = point.long;
        this.nestId = point.nestId;
      });
    }

    this.form = this.fb.group({
      name: [this.name, Validators.required],
      attributes: [this.attributes],
      link: [this.link, Validators.required],
      lat: [this.lat],
      long: [this.long],
      nestId: [this.nestId]
    });
  }

  savePoint(event) {
    if (this.form.valid) {
      const { name, attributes, lat, long, link, nestId } = this.form.value;

      if (this.point$) {
        //this.spService.editSpawnPoint(this.point$.pointId, this.form.value);
      } else {
        // New Point
        this.spService.newSpawnPoint(new SpawnPoint(
          name, attributes, lat, long, link, nestId
        ), this.messageService);
      }
      this.clearPointForm();
    } else {
      console.log('form invalid');
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Chequea que los campos con (*) hayan sido rellenados.' });
    }
  }

  clearPointForm() {
    this.form.reset();
  }
}
