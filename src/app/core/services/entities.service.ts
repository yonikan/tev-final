import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class EntitiesService {
	private entities = {};

	constructor(private http: HttpClient) { }

	getEntities() {
		return this.http
			.get('./assets/configs/config-entities.json');
			// .subscribe(entitiesData => {
			// 	this.entities = entitiesData;
			// });
	}
}
