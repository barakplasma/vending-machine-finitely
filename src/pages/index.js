import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/main.scss';

function Index() {
  const [date, setDate] = useState(null);
  useEffect(() => {
    async function getDate() {
      const res = await fetch('/api/date');
      const newDate = await res.text();
      setDate(newDate);
    }
    getDate();
  }, []);
  return (
    <main>
      <Helmet>
        <title>Vending Machine Demo</title>
      </Helmet>
      <h1>Vending Machine Demo</h1>
      <h2>
        Deployed with{' '}
        <a
          href="https://zeit.co/docs"
          target="_blank"
          rel="noreferrer noopener"
        >
          ZEIT Now
        </a>
        !
      </h2>
      <p>
        <a
          href="https://github.com/zeit/now-examples/blob/master/gatsby-node-typescript"
          target="_blank"
          rel="noreferrer noopener"
        >
          Built with the gatsby-node-now.sh boilerplate
        </a>{' '}
        is a <a href="https://www.gatsbyjs.org/">Gatsby</a> app with two
        directories, <code>/src</code> for static content and <code>/api</code>{' '}
        which contains a serverless{' '}
        <a href="https://nodejs.org/en/">Node.js (TypeScript)</a> function. See{' '}
        <a href="/api/date">
          <code>api/date</code> for the Date API with Node.js (TypeScript)
        </a>
        or <a href="/api/vendingMachineInventory">
          <code>api/vendingMachineInventory</code>
        </a>.
      </p>
      <br />
      <h2>The date according to Node.js (TypeScript) is:</h2>
      <p>{date ? date : 'Loading date...'}</p>
      <br />
      <div class="grid-container">
        <div class="banana">🍌</div>
        <div class="apple">🍎</div>
        <div class="toy-car">🚙</div>
        <div class="beer">🍺</div>
        <div class="shoe">👠</div>
      </div>
    </main>
  );
}

export default Index;
