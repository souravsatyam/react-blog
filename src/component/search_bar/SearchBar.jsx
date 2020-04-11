import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();
    const [search_input, setSearchInput] = useState('')

    const searchData = evt => {
        setSearchInput(evt.target.value);
    }

    

  return (
    <Paper component="form" className={classes.root}>
     
      <InputBase
        className={classes.input}
        placeholder="Search with any keywords"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={search_input}
        onChange={searchData}
      />
      <IconButton className={classes.iconButton} aria-label="search" onClick={() => props.searchData(search_input)}>
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      
    </Paper>
  );
}
