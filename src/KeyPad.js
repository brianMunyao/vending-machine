import React from 'react';
import styled from 'styled-components';

const KeyPad = ({ money, value, onChangeText, confirm, cancel }) => {
	const btns = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''];

	const AppBtn = ({ value, onClick }) => {
		return (
			<Btn onClick={onClick} style={{ opacity: value === '' ? 0 : 1 }}>
				<span class="button-82-shadow"></span>
				<span class="button-82-edge"></span>
				<span class="button-82-front text">{value}</span>
			</Btn>
		);
	};

	return (
		<Container>
			<div className="funcs">
				<FuncBtn onClick={cancel}>Cancel</FuncBtn>
				<FuncBtn onClick={confirm}>Confirm</FuncBtn>
			</div>
			<div className="nums">
				{btns.map((bt) => (
					<AppBtn
						value={bt}
						onClick={
							bt !== ''
								? () => onChangeText(value + '' + bt)
								: null
						}
					/>
				))}
			</div>
		</Container>
	);
};

const Container = styled.div`
	position: absolute;
	top: 270px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 1;

	.nums {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
	}
	.funcs {
		display: grid;
		grid-template-rows: 30px;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin: 10px 0 15px;
	}
`;

const Btn = styled.button`
	/* background: white;
	color: black;
	border: none;
	width: 40px;
	height: 40px; */

	/* <!-- HTML !-->
<button class=&" role="button">
  
</button> */

	position: relative;
	border: none;
	background: transparent;
	padding: 0;
	cursor: pointer;
	outline-offset: 4px;
	transition: filter 250ms;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	width: 40px;

	.button-82-shadow {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 12px;
		background: hsl(0deg 0% 0% / 0.25);
		will-change: transform;
		transform: translateY(2px);
		transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
	}

	.button-82-edge {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 12px;
		background: linear-gradient(
			to left,
			hsl(340deg 100% 16%) 0%,
			hsl(340deg 100% 32%) 8%,
			hsl(340deg 100% 32%) 92%,
			hsl(340deg 100% 16%) 100%
		);
	}

	.button-82-front {
		display: block;
		position: relative;
		padding: 5px; //27px;

		border-radius: 12px;
		font-size: 1.1rem;
		color: white;
		background: hsl(345deg 100% 47%);
		will-change: transform;
		transform: translateY(-4px);
		transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
	}

	/* @media (min-width: 768px) {
		.button-82-front {
			font-size: 1.25rem;
			padding: 12px 42px;
		}
	} */

	&:hover {
		filter: brightness(110%);
		-webkit-filter: brightness(110%);
	}

	/* &:hover .button-82-front {
		transform: translateY(-6px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	} */

	&:active .button-82-front {
		transform: translateY(-2px);
		transition: transform 34ms;
	}

	&:hover .button-82-shadow {
		transform: translateY(4px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}

	&:active .button-82-shadow {
		transform: translateY(1px);
		transition: transform 34ms;
	}

	&:focus:not(:focus-visible) {
		outline: none;
	}
`;

const FuncBtn = styled.button`
	/* margin: 10px; */
	width: 100%;
	height: 100%;
`;

export default KeyPad;
