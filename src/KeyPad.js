import React from 'react';
import styled from 'styled-components';

const KeyPad = ({ value, onChangeText, confirm, cancel }) => {
	const btns = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''];

	const AppBtn = ({ value, onClick }) => {
		return (
			<Btn onClick={onClick} style={{ opacity: value === '' ? 0 : 1 }}>
				{value}
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
		margin: 10px 0;
	}
`;

const Btn = styled.button`
	background: white;
	color: black;
	border: none;
	width: 40px;
	height: 40px;
`;

const FuncBtn = styled.button`
	/* margin: 10px; */
	width: 100%;
	height: 100%;
`;

export default KeyPad;
