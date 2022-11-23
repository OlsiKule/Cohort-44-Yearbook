// config details
import "./App.css";
import firebaseConfig from "./firebase";
// NPM modules
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import image from "./assets/cohort44.png";
import Comment from "./Comment";

// this is a component not a fxn
function App() {
  // this state will track comments from our database/firebase
  const [comments, setComments] = useState([]);

  // this state will track user inputs from the form
  const [commentInput, setCommentInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    // create a variable that will hold on to our database values
    const database = getDatabase(firebaseConfig);
    // create a variable that makes reference to our database
    const databaseRef = ref(database);
    // grabbing the info from our database
    onValue(databaseRef, (response) => {
      // creating an array to store our data
      const newState = [];
      // storing the returned data as a variable
      const data = response.val();
      // loop through the return object
      for (let key in data) {
        const { comment, name } = data[key];
        newState.push({ id: key, comment, name });
      }
      setComments(newState);
    });
  }, []);

  // creating a fxn that takes care of the update input logic
  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
  };
  const handleNameChange = (event) => {
    setNameInput(event.target.value);
  };

  // this will remove the comment from the list
  const handleRemoveComment = (commentId) => {
    const database = getDatabase(firebaseConfig);
    const databaseRef = ref(database, `/${commentId}`);
    // this will remove the specific values from our database
    remove(databaseRef);
  };

  // creating the fxn that subits the value to firebase
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // preventing the default action of the form
    const database = getDatabase(firebaseConfig);
    const databaseRef = ref(database);
    if (commentInput !== "" && nameInput !== "") {
      push(databaseRef, {
        comment: commentInput,
        name: nameInput,
        // will work on the like button at a later time
        likes: 0,
      });
      // push(databaseRef, nameInput)
      setCommentInput("");
      setNameInput("");
    }
  };

  // prevent empty submitions

  return (
    <div className="App">
      <h1>Cohort #44 Yearbook</h1>
      <img src={image} alt="" />
      {/* I want to be able to add a comments  */}
      {/* <h2></h2> */}
      <div className="form">
        <form action="submit">
          <label htmlFor="comment">Comments </label>
          <textarea
            cols={70}
            rows={5}
            className="userComments"
            id="comment"
            type="text"
            onChange={handleCommentChange}
            value={commentInput}
          />
          <label htmlFor="name">Name </label>
          <input
            className="userName"
            id="comment"
            type="text"
            onChange={handleNameChange}
            value={nameInput}
          />

          <button onClick={handleFormSubmit}>Post</button>
        </form>
        <ul className="postedComments">
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                name={comment.name}
                text={comment.comment}
                removeComment={handleRemoveComment}
                id={comment.id}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;

// be comfortable with your skillsets
// the need to working full time
