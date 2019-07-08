import React from 'react'
import PropTypes from 'prop-types'

import './repos.css';

const RepoItem = ({ repo }) => {
    return (
        <div className="card" >
            <a href={repo.html_url} className="repos">
                <h3>
                    {repo.name}
                </h3>
                <div className="btn btn-dark">
                    <a href={repo.html_url} style={{ color: '#fff', marginTop: '1rem' }}>Visit Profile</a>
                </div>
            </a>
        </div>
    )
}


RepoItem.propTypes = {
    repo: PropTypes.object.isRequired,
}
export default RepoItem
