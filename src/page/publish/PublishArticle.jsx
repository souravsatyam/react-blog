import React, {Component} from 'react';
import './PublishArticle.css';
import HeaderSegment from '../../segment/header/HeaderSegment';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertFromRaw, convertFromHTML, ContentState, CompositeDecorator } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import { CONFIG } from '../../config/config';
import CustomizedSnackbars from '../../component/snackBar/SnackBar';
import { Container, Select } from '@material-ui/core';
import AddBlog from '../../component/addBlog/AddBlog';
import FooterSegment from '../../segment/footer/footerSegment';

class PublishArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
          editorState: EditorState.createEmpty(),
          isEdit: false,
          data: {
              title: '',
              description: '',
              tags: []
          },
          tags: [],
          type: '',
          message: '',
          open: false,
        };
      }


      componentDidMount() {
          if (window.location.href.indexOf('?') >= 0) {
              let id = window.location.href.split('?')[1].split('=')[1];
              this.getBlogPostById(id).then((resp) => {
                    let data = resp.data.data[0];
                    let stateData = {...this.state.data};
                    stateData.title = data.title;
                    stateData.description = data.description;
                    stateData.tags =  data.tags;
                    this.setState({data: stateData, isEdit: true});
                }).catch((err) => {

                });
              
          }

          this.getTagList();
      }

      async getTagList() {
        const resp = await Axios.get('/api/v1/tag/get');
        this.setState({tags: resp.data.data});
     }

      getBlogPostById(id) {
        return Axios.get(CONFIG.url+'/api/v1/blog/get?_id='+id)
      }
    
      onEditorStateChange = (editorState) => {
        
        this.setState({
          editorState,
        });
        let data = {...this.state.data};
        data.description = stateToHTML(convertFromRaw(editorState));
      
        
        this.setState({data: data});
      };

      
      handleInputChange(type, event) {
     
        let data = {...this.state.data};
        data[type] = event.target.value;
        this.setState({data: data});
    }

    async submitBlog() {
        //Validate the blog value
        setTimeout(() => {this.setState({open: false})}, 2000)
        
        if (this.state.data) {
            if (this.state.data.title === "") {
                this.setState({
                    open: true, 
                    type: 'error', 
                    message: 'Title is required'}); 
                return false;
            }

            if (this.state.data.description === "") {
                this.setState({open: true, 
                    type: 'error', 
                    message: 'Blog description is required'});
                return false;
            }

        }



        try {
            let response = await Axios.post(CONFIG.url+'/api/v1/auth/blog/create', this.state.data, {headers: {token: window.localStorage.getItem('auth')}});
            this.setState({open: true, type: 'success', message: 'Your blog has been successfully published'});
        } catch (e) {
            this.setState({open: true, type: 'error', message: 'Some error occured while creating blog'});
        }
    }
    
    render() {
        
        const { type, message,  open, editorState } = this.state;

        const names = [
            'Oliver Hansen',
            'Van Henry',
            'April Tucker',
            'Ralph Hubbard',
            'Omar Alexander',
            'Carlos Abbott',
            'Miriam Wagner',
            'Bradley Wilkerson',
            'Virginia Andrews',
            'Kelly Snyder',
          ];
        const personName = names;
        return (
            <div>
                <CustomizedSnackbars type={type} message={message} open={open} />
                <HeaderSegment />
                <AddBlog tags={this.state.tags} props={this.props} data={this.state.data} isEdit={this.state.isEdit} />

                <FooterSegment />
            </div>
        )
    }
}

export default PublishArticle;