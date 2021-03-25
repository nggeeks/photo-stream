import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchPhotoInfo } from '../../services/photos';

const PhotoInfo = ({ photoId }) => {
	const [photoInfo, setPhotoInfo] = useState(null);

	useEffect(() => {
		fetchPhotoInfo(photoId).then(({ data: { photo, stat } }) => {
			if (stat === 'ok') {
				const { description, owner, tags, title, urls } = photo;
				const allTags = tags.tag.map(({ _content }) => _content);
				const {
					url: [photoLink],
				} = urls;

				setPhotoInfo({
					description: description._content,
					ownerRealname: owner.realname,
					nsid: owner.nsid,
					tags: allTags.length > 2 ? allTags.slice(2) : allTags,
					title: title._content,
					photoLink: photoLink._content,
				});
			}
		});
	}, []);

	const PhotoSummaryContainer = styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #626262;
	`;

	const DescriptionWrapper = styled.div`
		font-size: 12px;
		overflow: hidden;
		color: #626262;
	`;

	return (
		<>
			{photoInfo && (
				<PhotoSummaryContainer>
					<div>
						<a href={photoInfo.photoLink} target="_blank">
							{photoInfo.title}
						</a>{' '}
						by{' '}
						<a
							href={`https://www.flickr.com/people/${photoInfo.nsid}`}
							target="_blank"
						>
							{photoInfo.ownerRealname}
						</a>
					</div>
					<DescriptionWrapper>
						Description: {photoInfo.description.substring(0, 10)}
					</DescriptionWrapper>
					<div>
						Tags:{photoInfo.tags.toString()}{' '}
						{photoInfo.tags.length > 2 ? '...' : ''}
					</div>
				</PhotoSummaryContainer>
			)}
		</>
	);
};

const Image = ({ id, secret, url, server, farm }) => {
	const Wrapper = styled.div`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	`;
	const Image = styled.img`
		width: 326px;
		height: 261px;
	`;
	return (
		<Wrapper>
			<div>
				<a href="" target="_blank">
					<Image
						srcSet={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_z.jpg`}
						src={url}
					/>
				</a>
			</div>

			<PhotoInfo photoId={id} />
		</Wrapper>
	);
};

const Photo = ({ id, farm, server, url, secret }) => {
	return (
		<div
			style={{
				width: '350px',
				padding: '20px',
				border: '1px solid black',
				margin: '10px',
			}}
		>
			<Image id={id} farm={farm} server={server} url={url} secret={secret} />
		</div>
	);
};

export default Photo;
