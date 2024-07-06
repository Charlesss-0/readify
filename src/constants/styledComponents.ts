import styled from 'styled-components'
import { theme } from './theme'

export const ListItemContainer = styled.ul`
	position: absolute;
	width: 100%;
	margin-top: 0.75rem;
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	border-radius: 0.5rem;
	background-color: ${theme['base-200']};
	user-select: none;
	border: 1px solid ${theme.neutral};
`

export const ListItem = styled.li`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem;
	border-radius: 0.375rem;
	transition: all 200ms;
	cursor: pointer;

	&:hover {
		background-color: ${theme['secondary-content']};
	}

	&:active {
		transform: scale(0.98);
	}
`
