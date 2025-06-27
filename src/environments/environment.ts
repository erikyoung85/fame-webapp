// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  microserviceUrl: 'https://api.thefamesports.com',
  supabase: {
    url: 'https://rcqdlekpvweemrojyheo.supabase.co',
    anonKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjcWRsZWtwdndlZW1yb2p5aGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNjYwNjgsImV4cCI6MjA1OTc0MjA2OH0.k2r4R5hZkFzCrvrf1NDzK6BMoDHHNC6Oq99-WFoJqYw',
  },
  stripe: {
    publishableKey:
      'pk_test_51RLWKOReZNkJB8y7RLOKn8uqYqAfYpXCtgZ9BxJPIQkZzbvllpdxMafWEXBg9f8I79wtuY2EeloTWsL2Ovtgsfli00QFHTqayA',
    secretKey:
      'sk_test_51RLWKOReZNkJB8y7vVzK2eMLQn7LOv8owkW6kDIY7YwsIrRogmOvxtICgkQ8VNVufETsewRLQSBxeSZwd2mynlSY007ilNyU8W',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
