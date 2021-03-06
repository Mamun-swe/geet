import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

const Index = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-12 pt-2">
                        <div className="d-flex flex-row-reverse">
                            <div>
                                <Link to="/help">Help</Link>
                            </div>
                            <div className="mx-2 px-2 boder-link">
                                <Link to="/privacy-policy">Privacy Policy</Link>
                            </div>
                            <div>
                                <Link to="/term">Term of Use</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;