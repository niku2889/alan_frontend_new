// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAjBEmYvm717jgFXxVkzu6ikPIU5YNFZMw',
    authDomain: 'embryo-iron.firebaseapp.com',
    databaseURL: 'https://embryo-iron.firebaseio.com',
    projectId: 'embryo-iron',
    storageBucket: 'embryo-iron.appspot.com',
    messagingSenderId: '527436866836'
  },
  //apiURL: 'http://localhost:3000/api/',
  //apiURL: 'http://ec2-35-178-53-54.eu-west-2.compute.amazonaws.com:4000/api/',
  apiURL: 'https://web-node-api.herokuapp.com/api/',
  imageURL: 'https://s3.eu-west-2.amazonaws.com/carpart-images-all/',
  cartelURL: 'https://www.cartell.ie/secure/xml/findvehicle?'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
