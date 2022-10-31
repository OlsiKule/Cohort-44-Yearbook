// config details
import "./App.css";
import firebaseConfig from "./firebase";
// NPM modules
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import image from "./assets/image.jpg";
import Comment from "./Comment";

// this is a component not a fxn
function App() {
  // this state will track comments from our database

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
      // createing a array to store our data
      const newState = [];
      // storing the returned data as a variable
      const data = response.val();
      // console.log(data)
      console.log("data", data);
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
    console.log(typeof commentInput);
    console.log(nameInput);
    push(databaseRef, {
      comment: commentInput,
      name: nameInput,
      likes: 0,
    });
    // push(databaseRef, nameInput)
    setCommentInput("");
    setNameInput("");
  };

  // const sequence = Math.floor(Math.random() * 4);
  // console.log(sequence);

  return (
    <div className="App">
      <h1>Cohort #44 Yearbook</h1>
      <img src={image} alt="" />
      {/* I want to be able to add a comments  */}
      {/* <h2></h2> */}
      <div className="form">
        <form action="submit">
          <label htmlFor="comment">Your comments </label>
          <textarea
            cols={70}
            rows={5}
            className="userComments"
            id="comment"
            type="text"
            onChange={handleCommentChange}
            value={commentInput}
          />
          <label htmlFor="name">name </label>
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

// function App() {

// useEffect(() => {
//   // create a variable that holds our database details
//   const database = getDatabase(firebase)

//   // we then create a variable that makes reference to our database
//   const dbRef = ref(database)

//   // add an event listener to that variable that will fire
//   // from the database, and call that data 'response'.
//   onValue(dbRef, (response) => {
//      // here we use Firebase's .val() method to parse our database info the way we want it
//     console.log(response.val());
//   })
// }, [])

//   return (
//     <div className="App">
//      <ul>
//       {comments.map((comment) => {
//         return(
//           <li>
//             <p>{comment}</p>
//           </li>
//         )
//       })}
//      </ul>
//     </div>
//   );
// }

// export default App;
