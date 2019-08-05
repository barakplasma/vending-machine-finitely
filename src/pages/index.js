import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/main.scss';
import VendingMachine from './VendingMachine';

function Index() {
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
        This app was built with
        <a
          href="https://github.com/zeit/now-examples/tree/master/gatsby-functions"
          target="_blank"
          rel="noreferrer noopener"
        >
          the gatsby-node-now.sh boilerplate
        </a>{' '}
        and is a <a href="https://www.gatsbyjs.org/">Gatsby</a> app with two
        directories, <code>/src</code> for static content and <code>/api</code>{' '}
        which contains a serverless{' '}
        <a href="https://zeit.co/docs/v2/serverless-functions/introduction">Node.js (TypeScript)</a> function for generating a mock vending machine inventory.
      </p>
      <br />
      <VendingMachine />
    </main>
  );
}

export default Index;
