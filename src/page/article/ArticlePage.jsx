import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ArticlePage.css';
import HeaderSegment from '../../segment/header/HeaderSegment';
import Axios from 'axios';
import { CONFIG } from '../../config/config';
import renderHTML from 'react-render-html';
import ArticleSegment from '../../component/articleSegment/ArticleSegment';
import { Grid, TablePagination, Divider, Typography, TextField, LinearProgress } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import SideBar from '../../component/sidebar/SideBar';
import TagPage from '../tag/TagPage';
import Alert from '@material-ui/lab/Alert';
import SearchBar from '../../component/search_bar/SearchBar';
import FooterSegment from '../../segment/footer/footerSegment';




class ArticlePage extends Component {
    constructor() {
        super();
        this.state = {
            blog: [],
            tags: [],
            choosen_category: '',
            search_blog: '',
            isLoading: false
        };
    }

    componentDidMount() {
        let bloggerData = { ...this.state.blog };
        this.getTagList();
        this.getBloggerList();
    }

    async getBloggerList(tags, type) {
       
       
        let params = {};
        if (type) {
            params = { filter: true, data: tags };
        } else {
            params = { tags: tags };
            params.search = this.state.search_blog;
        }

        if (this.props.location.pathname == '/myarticle') {
            params.user = localStorage.getItem('id_user');
        }


        this.setState({ isLoading: true });
        const resp = await Axios.get(CONFIG.url + '/api/v1/blog/get', { params: params });

        this.setState({ blog: resp.data.data, choosen_category: tags, isLoading: false });

    }

    navigateTo(blog_id) {
        this.props.history.push('/blog?blog_id=' + blog_id);
    }

    async getTagList() {
        const resp = await Axios.get('/api/v1/tag/get');
        this.setState({ tags: resp.data.data });
    }

    changeText(evt) {

    }

    clearData() {
        // this.setState({search_blog: ''});
        // this.getBloggerList();
        window.location.reload();
    }

    setSearchData(search_text) {
        this.setState({ search_blog: search_text });
        this.getBloggerList();
    }

    filter(type) {
        this.getBloggerList(type, 'filter');
    }


    render() {
        let bloggerList = [];
        if (this.state.blog.length > 0) {
            bloggerList = this.state.blog.map((blog, index) => {
                return (
                    <div onClick={() => this.props.history.push('/blog?blog_id=' + blog._id)} key={index}>
                        <Divider />
                        <ArticleSegment blog={blog} />
                    </div>

                )
            })
        } else {
            bloggerList = <Alert severity="error">No blog found for {this.state.choosen_category} tag</Alert>
        }


        return (
            <div className="product__resources ">
                {this.state.isLoading && <LinearProgress />}

                <HeaderSegment />
                <div class="searchbox">
                    <SearchBar searchData={this.setSearchData.bind(this)} />
                </div>

                {/* <div class="searchbox">
                    <input id="search" 
                        type="text" 
                        placeholder="Search based on keywords" 
                        name="search" 
                        class="search" 
                        value={this.state.search_blog}
                        onChange={this.changeText.bind(this)} />
                    <button class="btn-search">
                        <img src="https://img.icons8.com/cotton/24/000000/search--v2.png" onClick={() => {this.getBloggerList()}}/>
                    </button>
                </div> */}

                <Grid container spacing={3}>
                    <Grid xs={12}>
                    </Grid>
                    <Grid xs={3} item>
                        {/* <SideBar filterOptions= {this.filter.bind(this)}/> */}
                    </Grid>

                    <Grid xs={6} item>
                        {this.state.choosen_category &&
                            <Typography>
                                {this.state.choosen_category}
                                <Link href="#" onClick={() => this.clearData()}>clear</Link>
                            </Typography>}
                        {bloggerList}
                    </Grid>

                    <Grid xs={3} item>
                        <Grid direction={'column'} item xs container spacing={2}>
                            {this.state.tags.map((tag, index) => {
                                return <Grid item xs key={index}>
                                    <Link href="#" onClick={() => this.getBloggerList(tag.title)}>
                                        <Typography variant="subtitle2" gutterBottom>
                                            {tag.title} ({tag.total_post}) Posts
                                    </Typography>
                                    </Link>
                                </Grid>
                            })}



                        </Grid>
                    </Grid>






                </Grid>


                <FooterSegment />
            </div>
        )
    }
}

export default ArticlePage;
