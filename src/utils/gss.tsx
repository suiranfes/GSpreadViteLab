import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

const GoogleSheetsComponent: React.FC = () => {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
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
    });
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign In and Update Sheet</button>
    </div>
  );
};

export default GoogleSheetsComponent;
