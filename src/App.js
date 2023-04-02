import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './Configuration';
import Title from "./Title";
import SearchQuery from "./SearchQuery";
Amplify.configure(awsExports);

function App() {
  return (
    <div>
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
            <Title></Title>
            <SearchQuery></SearchQuery>
          </main>
        )}
      </Authenticator>
    </div>)
}

export default App;
