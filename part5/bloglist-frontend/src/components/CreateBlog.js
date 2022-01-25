const CreateBlog = ({ blog }) => {
  const { newBlog, setNewBlog, handleNewBlog } = blog
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => handleNewBlog(e, newBlog)}>
        <div>
          <label>
            title:
            <input
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              type='text'
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              value={newBlog.author}
              onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
              type='text'
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input value={newBlog.url} onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })} type='text' />
          </label>
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default CreateBlog
