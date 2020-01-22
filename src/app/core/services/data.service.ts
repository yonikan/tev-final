import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	private _metadata: any = {};
	get metadata() {
		return this._metadata;
	}
	set metadata(metadata) {
		this._metadata = metadata;
	}

	constructor(private http: HttpClient) { }

	getMetadata() {
		return this.http
			.get('./assets/features-configuration/metadata.json')
			.subscribe(data => {
				this.metadata = data;
			});
	}

}

export const initMetadata = (dataService: DataService) => () => dataService.getMetadata()
