import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPlayers } from "../API/index";

export default function AllPlayers() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function updatePlayers() {
      try {
        const playersData = await getAllPlayers();
        console.log('players', playersData);
        setPlayers(playersData);
      } catch (e) {
        console.error(e);
      }
    }
    updatePlayers();
  }, []);

  function searchHandler(e) {
    setSearch(e.target.value);
  }

  let filteredPlayers = players;
  if (search !== "") {
    filteredPlayers = players.filter((player) => {
      const lowerCasePlayerName = player.name.toLowerCase();
      const lowerCaseSearch = search.toLowerCase();
      return lowerCasePlayerName.includes(lowerCaseSearch);
    });
  }

  return (
    <main>
      <input name="search" value={search} onChange={searchHandler} />
      {filteredPlayers.map((player) => (
        <article key={player.id}>
          <h2 onClick={() => navigate(`/players/${player.id}`)}>
            <img src={player.imageUrl} alt={player.name} />
            {player.name}
          </h2>
        </article>
      ))}
    </main>
  );
}
