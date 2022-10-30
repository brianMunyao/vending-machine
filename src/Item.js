import React from 'react';
import styled from 'styled-components';

const Item = ({ title = '', src, price = 0, onClick }) => {
	return (
		<Container onClick={onClick}>
			<div className="img">
				<img src={src} alt="img" />
			</div>
			<div className="info">
				<span className="name">{title}</span>
				<span className="price">KSh {price}</span>
			</div>
		</Container>
	);
};

const Container = styled.div`
	/* width: 100%;
	height: 100%; */
	height: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 40px;
	background: white;
	overflow: auto;
	box-shadow: 1px 2px 10px #e1e1e1;
	border-radius: 10px;
	cursor: pointer;
	transition: all 0.2s linear;

	&:hover {
		box-shadow: 1px 2px 15px #bbbbbb;
	}

	.img {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			height: 130px;
		}
	}

	.info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		background: #cfe4fa;
	}

	.name {
		font-weight: 600;
	}
	.price {
		color: green;
		background: #c4f4c9;
		font-weight: 600;
		font-size: 13px;
		padding: 2px 4px;
		border-radius: 4px;
	}
`;

export default Item;
