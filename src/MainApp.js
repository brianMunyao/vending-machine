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
	{
		id: 107,
		title: '7up',
		price: 50,
		src: require('./images/7up.png'),
		available: 12,
	},
	{
		id: 108,
		title: 'Monster',
		price: 50,
		src: require('./images/monster.png'),
		available: 1,
	},
	{
		id: 109,
		title: 'Sprite',
		price: 50,
		src: require('./images/sprite.png'),
		available: 6,
	},
];

const MainApp = () => {
	const [moneyInserted, setMoneyInserted] = useState(false);
	const [moneyAvailable, setMoneyAvailable] = useState(0);
	const [completed, setCompleted] = useState(false);
	const [play] = useSound(coinSound);
	const [boughtItems, setBoughtItems] = useState([]);
	const [transacting, setTransacting] = useState(false);
	const [coins, setCoins] = useState([
		{
			value: 10,
			src: require('./images/10sh.png'),
			animate: false,
		},
		{
			value: 20,
			src: require('./images/20sh.png'),
			animate: false,
		},
		{
			value: 40,
			src: require('./images/40sh.png'),
			animate: false,
		},
	]);

	const [itemCode, setItemCode] = useState('');
	const [codeCheck, setCodeCheck] = useState({});

	const insertMoney = (val = 0) => {
		if (!transacting) {
			setTransacting(true);
		}
		play();
		setMoneyInserted(true);
		setMoneyAvailable(moneyAvailable + val);
		setCoins(
			[...coins].map((c) =>
				c.value === val ? { ...c, animate: true } : c
			)
		);
		setTimeout(() => {
			setCoins(
				[...coins].map((c) =>
					c.value === val ? { ...c, animate: false } : c
				)
			);
		}, 500);
	};

	const handleConfirm = () => {
		if (transacting) {
			const item = items.filter((itm) => itm.id.toString() === itemCode);
			if (item.length > 0) {
				if (moneyAvailable >= item[0].price) {
					setMoneyAvailable(moneyAvailable - item[0].price);

					setCodeCheck({
						success:
							'Bought: ' + item[0].title + ' -> ' + item[0].price,
					});
					boughtItems.push(item[0].src);
					setItemCode('');
				} else {
					setCodeCheck({ error: 'Insufficent amount' });
				}
			} else {
				setCodeCheck({ error: 'Invalid Code. Try Again.' });
				setItemCode('');
			}
		}
	};

	const returnChange = () => {
		if (transacting) {
			setCompleted(true);
			setTimeout(() => {
				setCodeCheck({});
				setCompleted(false);
				setItemCode('');
				setMoneyAvailable(0);
				setMoneyInserted(false);
				setBoughtItems([]);
			}, 3000);
		}
		// if ( else {

		// }!completed) {
		// }
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

					<div className="bought">
						{boughtItems.map((itm) => (
							<img src={itm} alt="itm" />
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
										</div>
									) : (
										<></>
									)}
									<p className="succ-more">
										Press:
										{/* &ensp;Confirm - to continue */}
										<br /> &ensp;Cancel - to exit
									</p>
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
						onChangeText={(txt) => {
							if (transacting) setItemCode(txt);
						}}
					/>

					{/* <div className="coin-slot"></div> */}
				</div>
			</div>

			<div className="coins">
				{coins.map((coin, i) => (
					<img
						key={i}
						style={{
							animation: coin.animate
								? 'coinMove .5s linear 1'
								: 'none',
						}}
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
			margin: 5px 10px 15px 15px;
			padding-top: 10px;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 80px;
			row-gap: 15px;

			.items-row {
				border-radius: 20px;
				background: #614943;
				border: 3px solid #1568bb;
				display: grid;
				grid-auto-rows: 80px;
				row-gap: 50px;
				grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
			}
			.bought {
				background: #2d2c2c;
				padding: 10px;
				margin: 0 10px;
				overflow: auto;
				display: flex;
				flex-direction: row;
				border-radius: 20px;

				&::-webkit-scrollbar {
					display: none;
				}

				img {
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					@keyframes drop {
						from {
							transform: translateY(-30px);
						}
						to {
							transform: translateY(0);
						}
					}
					animation: drop 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 1;
				}
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
							margin-top: 30px;
							font-size: 18px;
							font-family: DigitalThinItalic;
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
				height: 80px;
				width: 10px;
			}
		}
	}
	.coins {
		position: absolute;
		right: 10px;
		/* bottom: 10px; */
		top: 50%;
		transform: translateY(-50%);
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
			cursor: pointer;
			margin: 0;
			height: 90px;
			margin: 10px 10px 10px 0;
			transition: all 0.2s linear;
			@keyframes coinMove {
				0% {
					transform: translate(0, 0);
				}
				50% {
					transform: translate(-200px, 0);
					opacity: 1;
				}
				55% {
					opacity: 0;
				}
				98% {
					opacity: 0;
				}
				100% {
					opacity: 1;
					transform: translate(0, 0);
				}
			}

			&:hover {
				transform: rotateY(20deg);
			}
			/* &:active {
				transform: rotateY(40deg);
			} */
		}
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
