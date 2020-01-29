import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class StaticDataService {
	private _staticData: any = {};
	get staticData() {
		return this._staticData;
	}
	set staticData(data) {
		this._staticData = data;
	}

	constructor(private http: HttpClient) { }

	getStaticData() {
		return this.http
			.get('./assets/configs/config-static-data.json')
			.subscribe(data => {
				this.staticData = data;
			});
	}
}

export const initStaticData = (staticDataService: StaticDataService) => () => staticDataService.getStaticData()
