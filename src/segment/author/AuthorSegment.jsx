import React from 'react';
import './AuthorSegment.css';
const authorSegment = () => {
    return (
        <div className="article-meta">
            <img src="https://picsum.photos/200/200" alt="Author" />
            <div className="meta-data">
                <span className="meta-author">Jake</span><br />
                <span className="meta-date">August 30, 2019</span>
            </div>
            <hr />
        </div>
    )
}

export default authorSegment;