import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { EditorState, convertFromRaw, convertFromHTML, ContentState, CompositeDecorator } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Axios from 'axios';
import CustomizedSnackbars from '../snackBar/SnackBar';



  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(16),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(8)
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
}));

export default function AddBlog({tags, props, data, isEdit}) {
    
    const contentState = {
        entityMap: {},
        blocks: [{
          key: '18ql9',
          text: data.description,
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
        }],
    };
    
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(contentState)));
    const [description, setDescription] = useState('');
    const [personName, setPersonName] = React.useState([]);
    const [type, setType] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [names, setNames] = useState([]);
    const setBlogTitle = (evt) => {
        setTitle(evt.target.value);
    }


    useEffect(() => {
        let temp_name = [];
        tags.map((tag) => {
            temp_name.push(tag.title);
        });
        setNames(temp_name);
    }, [tags])

    useEffect(() => {
        let temp_name = [];
        data.tags.map((tag) => {
            temp_name.push(tag);
        });
        setPersonName(temp_name);
    }, [data.tags])

    useEffect(() => {
       setTitle(data.title);
    }, [data.title])

    useEffect(() => {
        const contentState = {
            entityMap: {},
            blocks: [{
              key: '18ql9',
              text: data.description,
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
            }],
        };
        console.log(contentState);
        //const convertedState = convertFromRaw(JSON.parse(data.description))
        //console.log("convertedState", convertedState);
        const editorValue = EditorState.createWithContent(convertFromRaw(contentState));
        setEditorState(editorValue);
        setDescription(data.description);
     }, [data.description])

    

    const theme = useTheme();

    const onEditorStateChange = editorState => {
        setEditorState(editorState);
        setDescription(stateToHTML(convertFromRaw(editorState)));
    }

    const handleChange = (event) => {
        setPersonName(event.target.value);
    };

    function getStyles(name, personName, theme) {
        return {
          fontWeight:
            personName.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }

    const submitBlog = async () => {
        if (title == "") {
            setError(true);
            return false;
        }
        try {
            const data = {
                title: title,
                description: description,
                tags: personName
            }
            let res = await  Axios.post('/api/v1/auth/blog/create', data, {headers: {token: window.localStorage.getItem('auth')}});
            setType('success');
            setOpen(true);
            setMessage("Blog successfully created");

            
            setTimeout(() => {
                setOpen(false)
                props.history.push('/blog?blog_id='+res.data.blog._id)   
            }, 2000);


        } catch (e) {
            setType('error');
            setOpen(true);
            setMessage("Some error occured while creating blog");
        }
        
    }

    const updateBlog = async () => {

        try {
            const blog_id = window.location.href.split('=')[1];
            const blogEditData = {
                title: title,
                description: description,
                tags: personName,
                blog_id: blog_id
            }
            await Axios.put('/api/v1/auth/blog/update', blogEditData);
            setType('success');
            setOpen(true);
            setMessage("Blog successfully updated");

            
            setTimeout(() => {
                setOpen(false)
                props.history.push('/blog?blog_id='+blog_id)   
            }, 2000);
            
        } catch(e) {
            setType('error');
            setOpen(true);
            setMessage("Some error occured while updating blog");
        }
    }

    const deleteBlog = async () => {
        try {
            const blog_id = window.location.href.split('=')[1];
            await Axios.delete('/api/v1/auth/blog/delete', {params: {blogId: blog_id}});
            setType('error');
            setOpen(true);
            setMessage("Blog successfully Deleted");

            
            setTimeout(() => {
                setOpen(false)
                props.history.push('/article');   
            }, 2000);

        } catch (e) {

        }
    }
    return (
        <Container component="main" maxWidth="s">
            <CustomizedSnackbars type={type} open={open} message={message} />
            <CssBaseline />
            <div className={classes.paper}>
            <Typography variant="h6" gutterBottom>
                Create your own blogger
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Typography>
                <form className={classes.form} noValidate>

                <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
                    <Select
                        fullWidth
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <div className={classes.chips}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>

                    
                    <TextField
                        error={error}
                        id="standard-full-width"
                        label="Add a suitable title for your blog"
                        style={{ margin: 8 }}
                        helperText={(error) ? "Blog title is required" : "Example : Cost Functions descriptions, Linear Regression"}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={title}
                        onChange={setBlogTitle}
                    />

                    <Editor
                        error
                        defaultEditorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onContentStateChange={onEditorStateChange}
                        editorStyle={{ height: "300px" }}

                    />

                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                        {!isEdit ? <Button className={classes.noLabel} variant="contained" color="primary" disableElevation  onClick={submitBlog}>
                        SUBMIT BLOG
                    </Button>: <Button className={classes.noLabel} variant="contained" color="primary" disableElevation  onClick={updateBlog}>
                        UPDATE BLOG
                    </Button>}
                        </Grid>
                        <Grid item xs={3}>
                            {isEdit && <Button className={classes.noLabel} variant="contained" color="secondary" onClick={deleteBlog}>
                                Delete Blog
                                </Button>}
                        </Grid>
                    </Grid>
                    

                    
                    

                </form>
            </div>

        </Container>
    );
}