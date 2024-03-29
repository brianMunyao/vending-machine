import React, { useState } from 'react';
import styled from 'styled-components';

import Item from './Item';
import AppButton from './AppButton';
import AppBtnAlt from './AppBtnAlt';

const items = [
	{
		title: 'Coke',
		price: 50,
		src: require('./images/coke.png'),
		available: 12,
	},
	{
		title: 'Coke Zero',
		price: 50,
		src: require('./images/coke_zero.png'),
		available: 12,
	},
	{
		title: 'Fanta',
		price: 50,
		src: require('./images/fanta.png'),
		available: 18,
	},
	{
		title: 'Pepsi',
		price: 50,
		src: require('./images/pepsi.png'),
		available: 12,
	},
	{
		title: 'Mirinda',
		price: 50,
		src: require('./images/mirinda.png'),
		available: 1,
	},
	{
		title: 'Mountain Dew',
		price: 50,
		src: require('./images/mountain_dew.png'),
		available: 6,
	},
];

const App = () => {
	const [moneyInserted, setMoneyInserted] = useState(false);
	const [moneyAvailable, setMoneyAvailable] = useState(0);
	const [pickedItems, setPickedItems] = useState([]);

	const insertMoney = (money = 0) => {
		setMoneyAvailable(moneyAvailable + money);
	};

	const pickItem = (item) => {
		const tempItems = [...pickedItems];
		const itemExists = tempItems.filter((i) => i.title === item.title);

		if (itemExists.length > 0) {
			const obj = itemExists[0];
			obj.quantity = obj.quantity + 1;
			tempItems.map((i) => (i.title === obj.title ? obj : i));
		} else {
			tempItems.push({
				title: item.title,
				price: item.price,
				quantity: 1,
			});
		}
		setPickedItems(tempItems);
	};

	const getGrandTotal = (arr = []) => {
		let total = 0;
		arr.forEach((a) => {
			total += a.price * a.quantity;
		});
		return total;
	};

	const isMoneySufficient = () => {
		return moneyAvailable - getGrandTotal(pickedItems) < 0;
	};

	return (
		<Container insufficient={isMoneySufficient()}>
			<div className="list">
				{items.map((item) => (
					<Item {...item} onClick={() => pickItem(item)} />
				))}
			</div>

			<div className="controls">
				<h2 className="c-title">Vending Machine</h2>

				{!moneyInserted ? (
					<AppButton
						title="Insert Money"
						onClick={() => setMoneyInserted(true)}
					/>
				) : (
					<div className="more">
						<div className="available-coins">
							<AppBtnAlt
								title="Ksh 10"
								onClick={() => insertMoney(10)}
							/>
							<AppBtnAlt
								title="Ksh 20"
								onClick={() => insertMoney(20)}
							/>
							<AppBtnAlt
								title="Ksh 40"
								onClick={() => insertMoney(40)}
							/>
						</div>

						<p className="money-available">
							<b>Money Inserted:</b> Ksh {moneyAvailable}
						</p>

						{pickedItems.length > 0 ? (
							<div className="my-items">
								<table>
									<tr>
										<th>Item</th>
										<th className="right">Price</th>
										<th className="right">Quantity</th>

										<th className="right">Subtotal</th>
									</tr>
									{pickedItems.map((item) => (
										<tr>
											<td>{item.title}</td>
											<td className="right">
												{item.price}
											</td>
											<td className="right">
												{item.quantity}
											</td>

											<td className="right">
												{item.price * item.quantity}
											</td>
										</tr>
									))}

									<tr>
										<th colSpan={3}>Grand Total</th>
										<th className="total right insufficient">
											Ksh {getGrandTotal(pickedItems)}
										</th>
									</tr>
								</table>
							</div>
						) : (
							<p className="pick-item">No Items Selected</p>
						)}

						<p className="change insufficient">
							<b>Balance:</b> Ksh{' '}
							{moneyAvailable - getGrandTotal(pickedItems)}
						</p>

						{/* {JSON.stringify(pickedItems)} */}

						<AppButton
							title="Buy"
							disabled={isMoneySufficient()}
							onClick={() => alert(0)}
						/>
					</div>
				)}
			</div>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: grid;
	grid-template-columns: 1fr 300px;
	grid-template-rows: 1fr;
	table {
		width: 100%;
		padding: 10px 0;
		td,
		th {
			padding: 7px 0;
		}
		td {
			border-bottom: 1px solid #dfdfdf;
		}
	}
	.right {
		text-align: right;
	}
	.total {
		/* text-decoration: double; */
	}
	.insufficient {
		color: ${({ insufficient }) => (insufficient ? 'tomato' : 'initial')};
	}

	.list {
		padding: 10px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-auto-rows: 200px;
		grid-gap: 20px;
		overflow: auto;
	}

	.controls {
		/* background: #ebebeb;
		border-radius: 50px 0 0 50px;
		margin-left: 10px; */
		border-left: 4px solid #e3e3e3;
		text-align: center;

		.more {
			text-align: left;
			display: flex;
			flex-direction: column;
			border: 2px solid black;
			margin: 10px;
			padding: 15px;
			border-radius: 10px;
			& > * {
				/* padding: 10px 0; */
			}
			.available-coins {
				display: flex;
				justify-content: space-evenly;
			}

			.pick-item {
				background: #f0f0f0;
				color: grey;
				padding: 20px 10px;
				border-radius: 10px;
				border: 2px dashed #dfdfdf;
				opacity: 0.7;
			}
		}
	}
`;

export default App;
