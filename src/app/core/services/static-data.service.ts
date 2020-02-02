import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class StaticDataService {
	private staticData: any = {};
	public getStaticData() {
		return this.staticData;
	}

	constructor(private http: HttpClient) { }

	initStaticData() {
		this.http
			.get('./assets/configs/config-static-data.json')
			.subscribe(data => {
				this.staticData = data;
			});
	}
}

export const initStaticData = (staticDataService: StaticDataService) => () => staticDataService.initStaticData()
