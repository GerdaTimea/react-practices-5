import { useState } from 'react';
import './App.css';

/*
const sampleData = [
  { title: "Cím 1", content: "Tartalom 1", date: "dátum 1" },
  { title: "Cím 2", content: "Tartalom 2", date: "dátum 2" },
  { title: "Cím 3", content: "Tartalom 3", date: "dátum 3" },
];
*/

const BlogPost = ({ blogPost, editBlogPost, removeBlogPost }) => {

  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");

  return (
    <article>
      <h2>{blogPost.title}</h2>
      <p>{blogPost.content}</p>
      <p>{blogPost.date}</p>
      <input type="text" placeholder="Title" value={editTitle} onChange={(event) => setEditTitle(event.target.value)} />
      <input type="text" placeholder="Content" value={editText} onChange={(event) => setEditText(event.target.value)} />
      <button onClick={() => {
        editBlogPost(blogPost.date, editTitle, editText);
        setEditTitle("");
        setEditText("");
        }}>Edit</button>
      <button>Save</button>
      <button>Cancel</button>
      {/* <button onClick={removeBlogPost}>Remove</button>  */}
      <button onClick={() => removeBlogPost(blogPost.date)}>Remove</button>
    </article>
  );
};

function App() {

  // const [blogPosts, setBlogPosts] = useState(sampleData);
  const [blogPosts, setBlogPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const postBlogPost = () => {
    setBlogPosts([
      ...blogPosts,
      // { title: "Cím 1", content: "Tartalom 1", date: "dátum 1" },
      { title: title, content: text, date: new Date().toString() },
    ]);
    setTitle("");
    setText("");
  };

  const editBlogPost = (uniqueId, editTitle, editText) => {
    console.log(uniqueId);

    const currentList = blogPosts;
    const nextList = [];

    //todo
    for (const post of currentList) {
      if (post.date !== uniqueId) {
        nextList.push(post);
      } else {
        nextList.push(
          { title: editTitle, content: editText, date: post.date }
        );
      }
    }
    setBlogPosts(nextList);
  };

  const deleteBlogPosts = () => {
    setBlogPosts([]);
  };

  const removeBlogPost = (uniqueId) => {
    /* console.log("törlöm");
    console.log(uniqueId); */

    /* const list = [];
    for (const blogPost of blogPosts) {
      if (blogPost.date !== uniqueId) {
        list.push(blogPost)
      }
    }
    setBlogPosts(list)*/

    setBlogPosts(blogPosts.filter((b) => b.date !== uniqueId))
  };

  // console.log(setTitle);

  return (
    <main>
      <input type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
      <input type="text" placeholder="Content" value={text} onChange={(event) => setText(event.target.value)} />
      <button onClick={postBlogPost}>Post</button>
      <h1>Posztok</h1>
      {blogPosts.map((blogPost, index) => (
        <BlogPost key={index} blogPost={blogPost} editBlogPost={editBlogPost} 
        removeBlogPost={removeBlogPost} />
      ))}
      <button onClick={deleteBlogPosts}>Delete All</button>
    </main>
  );
}

export default App;



// new Date().toISOString().split("T")[0]

// const actualDate = `Dátum: ${newDate.getDate()}-${newDate.getMonth()+1}-${newDate.getFullYear()}, Időpont:  ${newDate.getHours()}:${newDate.getMinutes()}`;


