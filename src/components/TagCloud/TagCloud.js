import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function setDeleteIcon(chip){
    if(chip.active === true){
        return(<DeleteIcon />);
    }
    else{
        return(<AddCircleIcon />);
    }
}


export default function ChipsArray() {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: 0, active: true, color: "primary", label: '#gasleak' },
    { key: 1, active: true, color: "primary", label: '@coned' },
    { key: 2, active: true, color: "primary", label: '#help' }
  ]);

    //this arrow function returns ANOTHER arrow function
    //so the handler has to be passed an argument
    // handleDelete(chip) gets you a function to delete the chip
    // so it isn't executed immediately (as might be the case if
    // the function returned a primitive like a number or object or something
    const handleDelete = chipToDelete => () => {
        setChipData(chips => chips.map(chip =>{
                if(chip.key === chipToDelete.key){

                    if(chip.active === true){
                        return {...chip, active:false, color: '#b3b3b3'};
                    }
                    else{
                        return {...chip, active:true, color: 'primary'};                        
                    }
                }
                else {
                    return chip
                }
            }

        ));
      };


    // not using the disabled prop because that makes it impossible to click the tag
    // to reactivate it. 
    return (
        <div className={classes.root}>
          {chipData.map(chip => {

            return (
              <Chip
                key={chip.key}
                label={chip.label}
                onDelete={handleDelete(chip)}
                className={classes.chip}
                color={chip.color}
                deleteIcon={setDeleteIcon(chip)}
              />
            );

          })}
        </div>
    );
}