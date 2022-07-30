import "./App.css";
import React from "react";

const LAUNCHES_QUERY = `
{
  launchesPast(limit:10){
    id
    mission_name
  }
}
`;

function App() {
  const [launches, setLaunches] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.spacex.land/graphql/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: LAUNCHES_QUERY,
      }),
    })
      .then((response) => response.json())
      .then((data) => setLaunches(data.data.launchesPast));
  }, []);
  return (
    <div>
      <h1>SpaceX Launches</h1>
      <ul>
        {launches.map((launch) => (
          <li key={launch.id}>{launch.mission_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
