import React from 'react';

const SideBar = (props) => {
    return (
        <div className="col-lg-3">
                            <div className="sidebar card shadow-sm">

                                <ul className="nav flex-column sidemenu accordion" id="accordionExample">
                                    <li className="nav-item active">
                                        <a href="#" className="nav-link" onClick={() => props.filterOptions('my')}>My Blog</a>
                                    </li>
                                    
                                    <li className="nav-item ">
                                        <a href="#" className="nav-link" onClick={() => props.filterOptions('liked')}>Most Liked</a>
                                    </li>
                                    <li className="nav-item ">
                                        <a href="#" className="nav-link" onClick={() => props.filterOptions('recent')}>Recent</a>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
    )
}

export default SideBar;