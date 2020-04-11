import React from 'react';
import {Link} from 'react-router-dom';
import './HeaderSegment.css';
import PublishIcon from '@material-ui/icons/Publish';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ListIcon from '@material-ui/icons/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Typography } from '@material-ui/core';

const headerSegment = () => {
    let links = [];
    let access_token = window.localStorage.getItem('auth');
    if (access_token) {
        links = [{name: 'Article', link: '/article', icon: <ListIcon />}, {name: 'My Article', link: '/myarticle', icon: <NoteAddIcon />},
                {name: 'Publish Article', link: '/publish' , icon: <PublishIcon />}, {name: 'Logout', link: '/login?type=logout', icon: <ExitToAppIcon />}];
    } else {
        links = [{name: 'Article', link: '/article'}, {name: 'Login', link: '/login'}, {name: 'Register', link: '/register'}];
    }

    const link  = links.map((l) => {
        return <li><Link to={l.link}>
                <Typography variant="subtitle2">
                    {l.name || l.name}
                </Typography>
        </Link></li>
    })
    return (
        <header className="header">
            
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label className="menu-icon" for="menu-btn"><span className="navicon"></span></label>
            <ul className="menu">
                {link}
            </ul>
            
        </header>
    )
}
export default headerSegment;