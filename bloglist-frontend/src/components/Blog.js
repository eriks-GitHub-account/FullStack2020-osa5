import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => (
  <div className='blog'>
    {blog.title} {blog.author}
  </div>
)

Blog.propTypes = {
  title: PropTypes.string.isRequired
}

export default Blog
