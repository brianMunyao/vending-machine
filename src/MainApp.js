import React, { useState } from 'react';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Draggable from 'react-draggable';

import Item from './Item';
import ItemAlt from './ItemAlt';
import KeyPad from './KeyPad';

const items = [
	{
		id: 101,
		title: 'Coke',
		price: 50,
		src: require('./images/coke.png'),
		available: 12,
	},
	{
		id: 102,
		title: 'Coke Zero',
		price: 50,
		src: require('./images/coke_zero.png'),
		available: 12,
	},
	{
		id: 103,
		title: 'Fanta',
		price: 50,
		src: require('./images/fanta.png'),
		available: 18,
	},
	{
		id: 104,
		title: 'Pepsi',
		price: 50,
		src: require('./images/pepsi.png'),
		available: 12,
	},
	{
		id: 105,
		title: 'Mirinda',
		price: 50,
		src: require('./images/mirinda.png'),
		available: 1,
	},
	{
		id: 106,
		title: 'Mountain Dew',
		price: 50,
		src: require('./images/mountain_dew.png'),
		available: 6,
	},
];

const MainApp = () => {
	const [moneyInserted, setMoneyInserted] = useState(true);
	const [moneyAvailable, setMoneyAvailable] = useState(0);
	const [pickedItems, setPickedItems] = useState([]);

	const [itemCode, setItemCode] = useState('');

	const insertMoney = (money = 0) => {
		setMoneyAvailable(moneyAvailable + money);
	};

	const [coords, setCoords] = useState([
		{
			value: 10,
			src: require('./images/10sh.png'),
			defaultPos: { x: 1104, y: -392 },
		},
		{
			value: 20,
			src: require('./images/20sh.png'),
			defaultPos: { x: 1104, y: -322 },
		},
		{
			value: 40,
			src: require('./images/40sh.png'),
			defaultPos: { x: 1104, y: -422 },
		},
	]);
	const targetSlot = {
		x: 905,
		y: -317,
	};

	const handleOnStopDrag = (e, data, value) => {
		alert(JSON.stringify({ x: data.lastX, y: data.lastY }));
		if (
			Math.abs(data.lastX - targetSlot.x) < 30 &&
			Math.abs(data.lastY - targetSlot.y) < 30
		) {
			insertMoney(value);
			console.log({ x: data.lastX, y: data.lastY });
		}
	};

	const handleConfirm = () => {
		const item = items.filter((itm) => itm.id.toString() === itemCode);
		if (item.length > 0) {
			alert('Bought ' + item[0].title);
			console.log(item);
		} else {
			alert('Invalid Code');
		}
	};

	return (
		// <DragDropContext>
		<Container>
			<div className="vending">
				<div className="left">
					<div className="items-row">
						{items.map((itm, i) => (
							<ItemAlt {...itm} key={i} />
						))}
					</div>

					{/* <div className="bottom-board">
						{items.slice(0, 4).map((itm, i) => (
							<span key={i}>{itm.title}</span>
						))}
					</div> */}
				</div>
				<div className="right">
					<div className="line"></div>

					<div className="screen">
						{moneyAvailable > 0 ? (
							<div className="screen-inner">
								<p className="item-code">
									{itemCode.length === 0 ? (
										<p>
											CODE: <p className="blink">_</p>
										</p>
									) : (
										<p>{itemCode}</p>
									)}
								</p>
							</div>
						) : (
							<>
								<p className="blink">INSERT MONEY</p>

								<p className="balance blink">
									KSH {moneyAvailable}
								</p>
							</>
						)}
					</div>

					<KeyPad
						cancel={() => setItemCode('')}
						confirm={handleConfirm}
						value={itemCode}
						onChangeText={(txt) => setItemCode(txt)}
					/>

					<div className="coin-slot"></div>
				</div>
			</div>

			<div className="coins">
				{coords.map((coin, i) => (
					<img
						height={100}
						src={coin.src}
						alt=""
						onClick={() => insertMoney(coin.value)}
					/>
				))}
			</div>
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 96vh;
	padding: 2vh 0;
	min-width: 1000px;

	.vending {
		background: #1e90ff;
		height: 100%;
		min-height: 500px;
		margin: auto;
		width: 700px;
		border-radius: 30px;
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr 300px;
		overflow: hidden;

		.left,
		.right {
			border-radius: 20px;
			position: relative;
		}

		.left {
			margin: 10px;
			background: #614943;
			padding-top: 10px;
			border: 3px solid #1568bb;
			.items-row {
				display: grid;
				grid-auto-rows: 80px;
				row-gap: 50px;
				grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
			}
			/* .bottom-board {
				background: burlywood;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				padding: 4px;
				span {
					font-weight: 600;
					font-size: 15px;
				}
			} */
		}
		.right {
			.line {
				position: absolute;
				top: 0;
				bottom: 0;
				width: 40px;
				left: 50%;
				transform: translateX(-50%);
				background: #7bb2ea;
				z-index: 1;
			}

			.screen {
				border-radius: 4px;
				position: absolute;
				background: #282727;
				width: 200px;
				height: 200px;
				z-index: 2;
				left: 50%;
				top: 40px;
				transform: translateX(-50%);
				font-family: DigitalThin;
				color: red;
				font-size: 30px;
				text-align: center;

				.screen-inner {
					position: absolute;
					height: 100%;
					width: 100%;
					color: white;
					font-size: 20px;
				}

				.balance {
					font-size: 30px;
				}
			}
			.coin-slot {
				position: absolute;
				right: 20px;
				top: 280px;
				border-radius: 4px;
				background: black;
				height: 70px;
				width: 10px;
			}
		}
	}
	.coins {
		position: absolute;
		right: 10px;
		bottom: 10px;
		display: flex;
		flex-direction: column;
		@keyframes rotat {
			0% {
				transform: rotateY(0deg);
			}
			50% {
				transform: rotateY(50deg);
			}
			100% {
				transform: rotateY(0deg);
			}
		}
		img {
			/* user-select: none; */
			cursor: pointer;
			margin: 0;
			height: 100px;
			margin: 10px 10px 10px 0;
			transition: all 0.2s linear;
			&:hover {
				transform: rotateY(20deg);
			}
			&:active {
				transform: rotateY(40deg);
			}
		}

		/* top: 0; */
		/* height: 0; */
		/* overflow: auto; */
	}

	.blink {
		@keyframes blink {
			0% {
				opacity: 1;
			}
			50% {
				opacity: 0.2;
			}
			100% {
				opacity: 1;
			}
		}
		animation: blink 1.5s linear infinite both;
	}
`;

export default MainApp;
