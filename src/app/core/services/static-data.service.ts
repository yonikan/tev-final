import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

	getData(name: string, category?: string): Observable<Object> {
		let url = `./assets/configs/config-${name}.json`;
		if (category)
			url = `./assets/configs/${category}/config-${name}.json`;

		return this.http.get(url);
	}
}

export const initStaticData = (staticDataService: StaticDataService) => () => staticDataService.initStaticData()
