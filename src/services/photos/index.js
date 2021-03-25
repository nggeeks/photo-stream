import axios from 'axios';
import { apiKey, flickrPhotoSearchUrl, flickrPhotoInfoUrl } from '../../config';

export const fetchPhotoInfo = photoId => {
	return axios.get(
		`${flickrPhotoInfoUrl}&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`
	);
};

export const fetchPhotos = async query => {
	try {
		return axios.get(
			`${flickrPhotoSearchUrl}&api_key=${apiKey}&tags=${query}&per_page=24&extras=url_o&format=json&nojsoncallback=1`
		);
	} catch (error) {
		console.log('Error fetching and parsing data', error);
		return [];
	}
};
