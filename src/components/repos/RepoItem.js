import React from 'react'
import PropTypes from 'prop-types'

const RepoItem = ({ repo }) => {
    return (
        <div className="card" >
            <a href={repo.html_url} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                <h3>
                    {repo.name}
                </h3>
                <div className="btn btn-dark">
                    <a href={repo.html_url} style={{ color: '#fff' }}>Visit Profile</a>
                </div>
            </a>
        </div>
    )
}


RepoItem.propTypes = {
    repo: PropTypes.object.isRequired,
}
export default RepoItem
