import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class StaticDataService {
	private staticData = {};

	constructor(private http: HttpClient) { }

	getStaticData() {
		return this.http.get('./assets/configs/config-static-data.json');
	}
}
