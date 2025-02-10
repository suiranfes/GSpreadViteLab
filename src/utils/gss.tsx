import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const GoogleSheetsComponent: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          setIsSignedIn(true);
        } else {
          authInstance.signIn().then(() => {
            setIsSignedIn(true);
          });
        }
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  const handleSignIn = () => {
    if (!isSignedIn) return;

    const params = {
      spreadsheetId: import.meta.env.VITE_GOOGLE_SPREADSHEET_ID,
      range: '1!A1',
      valueInputOption: 'RAW',
      resource: {
        values: [['Hello', 'World']],
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gapi.client.sheets.spreadsheets.values.update(params).then((response: any) => {
      console.log('Data updated:', response);
    });
  };

  const handleAddSheet = () => {
    if (!isSignedIn) return;

    const params = {
      spreadsheetId: import.meta.env.VITE_GOOGLE_SPREADSHEET_ID,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: 'UMA',
              },
            },
          },
        ],
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gapi.client.sheets.spreadsheets.batchUpdate(params).then((response: any) => {
      console.log('Sheet added:', response);
    });
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign In and Update Sheet</button>
      <button onClick={handleAddSheet}>Add New Sheet</button>
    </div>
  );
};

export default GoogleSheetsComponent;
