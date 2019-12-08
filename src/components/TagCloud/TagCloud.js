import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import ChipInput from 'material-ui-chip-input'
import { UserStateContext } from '../../context/UserContext'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		padding: theme.spacing(0.5),
	},
	chip: {
		margin: theme.spacing(0.5),
	},
}))

function setDeleteIcon(chip) {
	if (chip.active === true) {
		return <DeleteIcon />
	}

	return <AddCircleIcon />
}

export default function ChipsArray() {
	const classes = useStyles()
	// [
	// 	{ key: 0, active: true, color: 'primary', label: '#gasleak' },
	// 	{ key: 1, active: true, color: 'primary', label: '@coned' },
	// 	{ key: 2, active: true, color: 'primary', label: '#help' },
	// ]

	// this arrow function returns ANOTHER arrow function
	// so the handler has to be passed an argument
	// handleDelete(chip) gets you a function to delete the chip
	// so it isn't executed immediately (as might be the case if
	// the function returned a primitive like a number or object or something
	const handleDelete = (tagToDelete, context) => () => {
		context.onHashtagsChange(hashtags =>
			hashtags.map(hashtag => {
				if (hashtag.key === tagToDelete.key) {
					if (hashtag.active === true) {
						return {
							...hashtag,
							active: false,
							color: '#b3b3b3',
						}
					}
					return {
						...hashtag,
						active: true,
						color: 'primary',
					}
				}
				return hashtag
			}),
		)
	}

	// not using the disabled prop because that makes it impossible to click the tag
	// to reactivate it.
	return (
		<div className={classes.root}>
			<UserStateContext.Consumer>
				{context => {
					context.settings.hashtags.map(chip => {
						return (
							<Chip
								key={context.settings.hashtags.key}
								label={context.settings.hashtags.label}
								onDelete={handleDelete(chip, context)}
								className={classes.chip}
								color="primary"
								deleteIcon={setDeleteIcon(chip)}
							/>
						)
					})

					return (
						<ChipInput
							defaultValue={context.state.settings.hashtags}
							label="Persistent Settings Hashtags"
							onChange={handleDelete}
							disableUnderline
						/>
					)
				}}
			</UserStateContext.Consumer>
		</div>
	)
}
