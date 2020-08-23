import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {    
    blogService.create(blogObject)
    setBlogs(blogs.concat(blogObject))
    setBlogFormVisible(false)
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      console.log("Kirjautuminen ei onnistunut :(")
    }
  }

  const handleLogout = () =>{
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }
//LOGIN FORM POIS
  const loginForm = ()=>(
    <form onSubmit = {handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({target}) => setUsername(target.value)}
        />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({target}) => setPassword(target.value)}
        />
    </div>
    <button type="submit">login</button>
  </form>
  )
/////////////////////BLOGFORM
const blogForm = () => {
  const hideWhenVisible = {display: blogFormVisible ? 'none' : ''}
  const showWhenVisible = {display: blogFormVisible ? '' : 'none'}
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>new note</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm createBlog= {addBlog}/>
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
    </div>
  )
}


  return (
    <div>
      {user === null
      ? loginForm()
      :<div>
    <h2>blogs</h2>
    <p>Logged in as {user.name} {<button onClick = {handleLogout}>logout</button>}</p>

        {blogForm()}

        {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
        </div>
      }
    </div>
  )
}

export default App