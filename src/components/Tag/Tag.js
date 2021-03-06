import React, {Component} from 'react'
import Chip from '@material-ui/core/Chip'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'


export default class Tag extends Component {

	state = {
		isDisable: false,
	}

	toggleHandler = () => {
		const {isDisable} = this.state
		if (!isDisable) {
			this.props.onDisable(this.props.label)
		}else {
			this.props.onEnable(this.props.label)
		}		
		this.setState(({isDisable})=>({
			isDisable:!isDisable
		}))
	}

	render(){
		return (
			<Chip
				key={this.props.id}				
				label={this.props.label}
				onDelete={this.toggleHandler}
				deleteIcon={this.state.isDisable ? <AddCircleIcon /> : <HighlightOffIcon />}
				color={this.state.isDisable ? 'default' : 'primary'}
				className={this.props.className}
			/>
		)
	}
}