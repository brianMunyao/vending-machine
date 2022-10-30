import React from 'react';
import styled from 'styled-components';

const AppButton = ({ title = '', disabled, onClick }) => {
	return (
		<Container disabled={disabled} onClick={onClick} role="button">
			{title}
		</Container>
	);
};

const Container = styled.button`
	appearance: none;
	background-color: #393939;
	border: 2px solid #393939;
	border-radius: 15px;
	box-sizing: border-box;
	color: #ffffff;
	cursor: pointer;
	display: inline-block;
	font-family: Roobert, -apple-system, BlinkMacSystemFont, 'Segoe UI',
		Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
		'Segoe UI Symbol';
	font-size: 16px;
	font-weight: 600;
	line-height: normal;
	margin: 0;
	min-height: 40px;
	min-width: 0;
	outline: none;
	padding: 10px 20px;
	text-align: center;
	text-decoration: none;
	transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	/* width: 30px; */
	will-change: transform;

	&:disabled {
		cursor: not-allowed;
		/* pointer-events: none; */
		background: #c7c7c7;
		border: 2px solid #c7c7c7;
	}

	&:hover {
		box-shadow: ${({ disabled }) =>
			disabled ? '' : 'rgba(0, 0, 0, 0.25) 0 8px 15px'};
		transform: ${({ disabled }) => (disabled ? '' : 'translateY(-2px)')};
	}

	&:active {
		box-shadow: none;
		transform: translateY(0);
	}
`;

export default AppButton;
