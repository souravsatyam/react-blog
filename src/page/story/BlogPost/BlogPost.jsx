import React, { Component } from 'react';
import './BlogPost.css';
import HeaderSegment from '../../../segment/header/HeaderSegment';
import AuthorSegment from '../../../segment/author/AuthorSegment';
import Axios from 'axios';
import { CONFIG } from '../../../config/config';
import renderHTML from 'react-render-html';
import Button from '@material-ui/core/Button';
import { Typography, Divider, Badge, Chip, Grid, IconButton } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import FooterSegment from '../../../segment/footer/footerSegment';

class BlogPost extends Component {
  constructor() {
    super();
    this.state = { bloggerData: {}, blogs: [] };
  }

  componentDidMount() {
    if (window.location.href.indexOf('=') > -1) {
      let id = window.location.href.split('?')[1].split('=')[1];
      this.getBlogPostById();
      this.getBlogPostById(id);
    } else {
      this.props.history.push('/article');
    }


  }



  async getBlogPostById(id) {
    if (id == undefined) {
      const resp = await Axios.get(CONFIG.url + '/api/v1/blog/get', { params: { search: '' } });
      this.setState({ blogs: resp.data.data });
      console.log("Resp", resp.data.data);
    } else {
      const resp = await Axios.get(CONFIG.url + '/api/v1/blog/get?_id=' + id);
      this.setState({ bloggerData: resp.data.data[0] });
    }


  }

  modifyDocument() {
    let id = window.location.href.split('?')[1].split('=')[1];
    this.props.history.push('/edit?blog_id=' + id);
  }

  async likeUserBlog(type) {
    let id = window.location.href.split('?')[1].split('=')[1];
    const resp = await Axios.put('/api/v1/auth/blog/like?blog_id='+id, {blog_id: id, type: type});
    this.getBlogPostById(id);
    
  }

  navigateToEdit() {
      this.props.history.push('/edit?id='+this.state.bloggerData._id);
  }

  render() {

    let bloggerList = [];
    
    if (this.state.blogs.length > 0) {
      bloggerList = this.state.blogs.map((blog, index) => {
        return (
          <div onClick={() => this.props.history.push('/blog?blog_id=' + blog._id)} key={index}>
            <Divider />
            <div className="foot-block">

              <Typography variant="subtitle1">{blog.title}</Typography>

              <p><a href="#">Continue reading...</a></p>

            </div>

          </div>

        )
      })
    }
    let styles = {};
   
    if (this.state.bloggerData.userId) {
      if (this.state.bloggerData.liked_user.indexOf(localStorage.getItem('id_user')) > -1) {
          styles = {fill: 'rgb(162, 51, 51)'};
      } else {
        styles = {fill: ''};
      }
    }


    return (
      <div>
        <HeaderSegment />
        <div className="main_nav">
          <div className="wrapper">


            <Typography variant="h5">
              {this.state.bloggerData.title}
            </Typography>

            {this.state.bloggerData.tags && this.state.bloggerData.tags.map((tag) => {
              return (
                    <Chip label={tag} />
                )

            })}

            <Divider />
            <Typography variant="subtitle2" style={{fontSize: '12px'}}>
                <AccessTimeIcon /> {this.state.bloggerData.createDate && this.state.bloggerData.createDate.split('T')[0]}
            </Typography>
            <span style={{ fontSize: '14pt', marginTop: '10%' }}>
              {(this.state.bloggerData.description) ? renderHTML(this.state.bloggerData.description) : ''}
            </span>

            <IconButton>
              <Typography variant="subtitle2" onClick={() => this.likeUserBlog('like')}>
                <ThumbUpIcon style={styles}/> {this.state.bloggerData.like_count}
                
              </Typography>
            </IconButton>
            
            <IconButton>
                <ShareIcon />
            </IconButton>
            <IconButton>
              { (this.state.bloggerData.userId) ? (this.state.bloggerData.userId._id == localStorage.getItem('id_user') )? 
              <EditIcon onClick={this.navigateToEdit.bind(this)}/> : '' : ''}
            </IconButton>
          </div>



         


          <div className="prefooter">

            <div className="wrapper">

              <p className="section-hl">More Reading ...</p>

              {bloggerList}

            </div>

          </div>


          <FooterSegment />

        </div>

      </div>





    )
  }
}

export default BlogPost;
