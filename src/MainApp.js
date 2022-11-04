import React, { useState } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';

import ItemAlt from './ItemAlt';
import KeyPad from './KeyPad';
import coinSound from './sounds/coins.mp3';

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

const coins = [
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
];

const MainApp = () => {
	const [moneyInserted, setMoneyInserted] = useState(false);
	const [moneyAvailable, setMoneyAvailable] = useState(0);
	const [completed, setCompleted] = useState(false);
	const [play] = useSound(coinSound);
	// const [pickedItems, setPickedItems] = useState([]);

	const [itemCode, setItemCode] = useState('');
	const [codeCheck, setCodeCheck] = useState({});

	const insertMoney = (money = 0) => {
		play();
		setMoneyInserted(true);
		setMoneyAvailable(moneyAvailable + money);
	};

	// const [coords, setCoords] = useState([
	// {
	// 	value: 10,
	// 	src: require('./images/10sh.png'),
	// 	defaultPos: { x: 1104, y: -392 },
	// },
	// {
	// 	value: 20,
	// 	src: require('./images/20sh.png'),
	// 	defaultPos: { x: 1104, y: -322 },
	// },
	// {
	// 	value: 40,
	// 	src: require('./images/40sh.png'),
	// 	defaultPos: { x: 1104, y: -422 },
	// },
	// ]);
	// const targetSlot = {
	// 	x: 905,
	// 	y: -317,
	// };

	// const handleOnStopDrag = (e, data, value) => {
	// 	alert(JSON.stringify({ x: data.lastX, y: data.lastY }));
	// 	if (
	// 		Math.abs(data.lastX - targetSlot.x) < 30 &&
	// 		Math.abs(data.lastY - targetSlot.y) < 30
	// 	) {
	// 		insertMoney(value);
	// 		console.log({ x: data.lastX, y: data.lastY });
	// 	}
	// };

	const handleConfirm = () => {
		const item = items.filter((itm) => itm.id.toString() === itemCode);
		if (item.length > 0) {
			if (moneyAvailable >= item[0].price) {
				setMoneyAvailable(moneyAvailable - item[0].price);

				setCodeCheck({
					success:
						'Bought: ' + item[0].title + ' -> ' + item[0].price,
				});
				setItemCode('');
			} else {
				setCodeCheck({ error: 'Insufficent amount' });
			}
		} else {
			setCodeCheck({ error: 'Invalid Code. Try Again.' });
			setItemCode('');
		}
	};

	const returnChange = () => {
		if (!completed) {
			setCompleted(true);
		} else {
			setCodeCheck({});
			setCompleted(false);
			setItemCode('');
			setMoneyAvailable(0);
			setMoneyInserted(false);
		}

		// setInterval(() => {
		// }, 4000);
	};
	// const exitExit=()=>[

	// ]

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
				</div>

				<div className="right">
					<div className="line"></div>

					<div className="screen">
						{completed ? (
							<div className="final">
								{moneyAvailable > 0 && (
									<p className="red">
										Your Change is KSH{moneyAvailable}
									</p>
								)}
								<p className="blink red">Thank You.</p>
							</div>
						) : moneyInserted ? (
							<div className="screen-inner">
								<p className="balance">
									Balance: {moneyAvailable}
								</p>

								<p className="item-code">
									CODE:{' '}
									<span className="blue">{itemCode}</span>
									<span className="blink blue">_</span>
								</p>

								<p className="code-check">
									{codeCheck.error ? (
										<p className="error red">
											{codeCheck.error}
										</p>
									) : codeCheck.success ? (
										<div>
											<p className="success green">
												{codeCheck.success}
											</p>
											<p className="succ-more">
												Press:
												{/* &ensp;Confirm - to continue */}
												<br /> &ensp;Cancel - to exit
											</p>
										</div>
									) : (
										<></>
									)}
								</p>
							</div>
						) : (
							<div className="start-screen">
								<p className="red">Welcome.</p>
								<p className="red">All drinks are KSH50</p>
								<p className="blink red">INSERT MONEY</p>

								{/* <p className="balance blink red">
									KSH {moneyAvailable}
								</p> */}
							</div>
						)}
					</div>

					<KeyPad
						cancel={
							itemCode !== ''
								? () => setItemCode('')
								: () => returnChange()
						}
						confirm={handleConfirm}
						value={itemCode}
						onChangeText={(txt) => setItemCode(txt)}
					/>

					<div className="coin-slot"></div>
				</div>
			</div>

			<div className="coins">
				{coins.map((coin, i) => (
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

	.red {
		color: red;
	}
	.green {
		color: #0e9f0e;
	}
	.blue {
		color: dodgerblue;
	}

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
				top: 30px;
				transform: translateX(-50%);
				font-family: DigitalThin;
				font-size: 30px;
				text-align: center;
				/* overflow: hidden; */

				.start-screen {
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;
					* {
						margin: 10px 0;
					}
				}

				.balance {
					font-size: 30px;
				}
				.screen-inner {
					position: absolute;
					top: -0;
					left: 0;
					height: 100%;
					width: 100%;
					color: white;
					font-size: 20px;
					padding: 2% 5%;
					text-align: left;
					margin: 0%;
					/* background: #57131379; */

					.balance {
						font-size: 25px;
						letter-spacing: 1px;
						text-decoration: underline;
					}
					.item-code {
						font-size: 22px;
						letter-spacing: 1px;
						margin-top: 10px;
					}
					.code-check {
						margin-top: 20px;

						.success {
							margin-bottom: 10px;
						}
						.succ-more {
							font-size: 18px;
						}
					}
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
	.final {
		* {
			margin: 15px 0;
		}
	}
`;

export default MainApp;
