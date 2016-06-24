import React from 'react';

function Html() {
  return (
    <html>
      <head>
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

      </head>
      <body>
        <div id="root"></div>
        <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script src="http://materializecss.com/bin/materialize.js"></script>
        <script src="/bundle.js" />
      </body>
    </html>
  );
}

export default Html;
