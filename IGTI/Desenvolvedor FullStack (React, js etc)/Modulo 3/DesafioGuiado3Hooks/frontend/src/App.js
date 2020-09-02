import React, { useState, useEffect }  from 'react';
import Header from './components/Header';
import Spinner from './components/Spinner';
import Candidates from './components/Candidates';

export default function App() {
const [candidates, setCandidates] = useState([]);
const [previousVotes, setPreviousVotes] = useState([]);
const [previousPercentages, setpreviousPercentages] = useState([])

useEffect(() => {
  const interval = setInterval(() => {
        fetch('http://localhost:8080/votes')
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            const localpreviousVotes = candidates.map(({ id, votes }) => {
              return { id, votes };
            });

            const localpreviousPercentages = candidates.map(
              ({ id, percentage }) => {
                return { id, percentage };
              }
            );

            setCandidates(json.candidates);
            setPreviousVotes(localpreviousVotes);
            setpreviousPercentages(localpreviousPercentages);

          });
      }, 1000);

  return () => {
    return clearInterval(interval);
  };
}, [candidates])

  if (candidates.length === 0) {
    return <Spinner description="Carregando..." />;
  }

    return (
      <div className="container">
        <Header>Votação</Header>
        <Candidates
          previousPercentages={previousPercentages}
          previousVotes={previousVotes}
          candidates={candidates}
        />
      </div>
    );
  
}
