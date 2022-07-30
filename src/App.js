import "./App.css";
import React from "react";

const MEMBERS = `
query{
  findMembers(fields:{
  }){
    _id
    discordName
  }
}
`;

function App() {
  const [members, setMembers] = React.useState([]);

  React.useEffect(() => {
    fetch("https://oasis-bot-test-deploy.herokuapp.com/graphql/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: MEMBERS,
      }),
    })
      .then((response) => response.json())
      .then((data) => setMembers(data.data.findMembers));
  }, []);
  return (
    <div>
      <h1>SOIL MEMBERS</h1>
      <ul>
        {members.map((member) => (
          <li key={member._id}>{member.discordName}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
