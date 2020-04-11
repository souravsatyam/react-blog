import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Chip from '@material-ui/core/Chip';
import { Link, Divider, Badge } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  typography: {
    fontSize: '10pt'
  },
  badge: {
    marginTop: 10
  }
}));

export default function TagPage({ blog }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item s container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="title" gutterBottom>
                  <Link href="#" style={{ fontStyle: 'serif', color: "#000" , fontWeight: 600}}>{blog.title}</Link>
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.badge}>
              <Typography variant="subtitle1">
                {blog.tags.map(tag => {
                  return <Chip label={tag} variant="outlined" />
                })}
              </Typography>
          </Grid>
          <Grid item xs container className={classes.badge}>
            <Grid item xs={6} className={classes.typography}>{blog.createDate.split('T')[0]}</Grid>
            
            
            <Grid item xs={12} container>
               <Grid item xs={6}></Grid>
               <Grid item xs={3}></Grid>
               <Grid item xs={3}>
                
                <Badge badgeContent={blog.like_count} color="default">
                    <ThumbUpAltIcon style={{fill: "#7e907e"}}/>
                </Badge>
                {/* <ThumbDownIcon  style={{fill: "#7e907e"}}/> 0 */}
               </Grid>
               
               
               
               
            </Grid>
                
          </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}