import React from 'react';
import styled from 'styled-components';

const ItemAlt = ({ id, title = '', src, price = 0, onClick }) => {
	return (
		<Container>
			<div className="img">
				<img src={src} alt="img" />
			</div>

			<div className="name">
				<span className="title">{id}</span>
			</div>
		</Container>
	);
};

const Container = styled.div`
	.img {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			height: 100%;
		}
	}
	.name {
		background: #e8a539;
		/* text-align: center; */
		position: relative;
		height: 30px;
		/* height: 15px; */
		margin-top: -2px;
		.title {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			background: #dfdede;
			border-radius: 2px;
			font-weight: 400;
			font-size: 14px;
			letter-spacing: 0.2px;
			padding: 3px 5px;
			width: max-content;
			margin-top: 2px;
		}
	}
`;

export default ItemAlt;
