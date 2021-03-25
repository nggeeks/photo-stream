import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchPhotos } from '../../services/photos';
import Photo from '../photo/';

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	flex-wrap: wrap;
	justify-content: center;
`;

export function PhotoContainer() {
	const [loading, setLoading] = useState(true);
	const [allPhotos, setPhotos] = useState([]);

	useEffect(() => {
		fetchPhotos().then(response => {
			const photos = response.data.photos.photo || [];
			setLoading(false);
			setPhotos(photos);
		});
	}, []);

	return (
		<Wrapper>
			{loading && <p>Loading...</p>}
			{allPhotos.map(({ id, title, farm, owner, url_o, server, secret }) => (
				<Photo
					key={id}
					id={id}
					farm={farm}
					owner={owner}
					title={title}
					server={server}
					url={url_o}
					secret={secret}
				/>
			))}
		</Wrapper>
	);
}
