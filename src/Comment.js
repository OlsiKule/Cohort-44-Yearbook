function Comment(props) {
  return (
    <li>
      <p>{props.name}</p>
      <span>{props.text}</span>
      <button
        onClick={() => {
          props.removeComment(props.id);
        }}
      >
        Remove
      </button>
    </li>
  );
}

export default Comment;
