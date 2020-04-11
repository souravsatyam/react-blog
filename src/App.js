import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import BlogPost from './page/story/BlogPost/BlogPost';
import LoginComponent from './page/login/LoginComponent';
import ArticlePage from './page/article/ArticlePage';
import PublishArticle from './page/publish/PublishArticle';
import Axios from 'axios';
import TagPage from './page/tag/TagPage';

Axios.defaults.baseURL = 'http://localhost:9000/';
Axios.defaults.headers.common['token'] = localStorage.getItem('auth');
function App() {
  return (
    <div className="App">
        <Router>
          <Route exact path="/blog" component={BlogPost} />
          <Route exact path="/login" component= {LoginComponent} />
          <Route exact path="/register" component= {LoginComponent} />
          <Route exact path="/article" component= {ArticlePage} />
          <Route exact path="/myarticle" component={ArticlePage} />
          <Route exact path="/publish" component= {PublishArticle} />
          <Route exact path="/edit" component= {PublishArticle} />
         
        </Router>
    </div>
  );
}

export default App;
