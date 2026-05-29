CookieConsent.run({
  cookie: {
    name: 'cc_imc',
    expiresAfterDays: 365
  },

  guiOptions: {
    consentModal: {
      layout: 'bar',
      position: 'bottom center',
      equalWeightButtons: false,
      flipButtons: false
    },
    preferencesModal: {
      layout: 'box',
      equalWeightButtons: true,
      flipButtons: false
    }
  },

  categories: {
    necessary: {
      readOnly: true
    },
    analytics: {
      autoClear: {
        cookies: [
          { name: /^_ga/ },
          { name: '_gid' }
        ]
      },
      services: {
        ga4: {
          label: 'Google Analytics 4',
          onAccept: function () {
            gtag('consent', 'update', { analytics_storage: 'granted' });
          },
          onReject: function () {
            gtag('consent', 'update', { analytics_storage: 'denied' });
          }
        }
      }
    }
  },

  language: {
    default: 'en',
    translations: {
      en: {
        consentModal: {
          title: 'A quick note on cookies',
          description: 'We use Google Analytics to understand which content is most useful — no ads, no selling data. Click <b>Accept</b> to allow analytics, or <b>Decline</b> to browse without tracking.',
          acceptAllBtn: 'Accept',
          acceptNecessaryBtn: 'Decline',
          showPreferencesBtn: 'Manage preferences',
          footer: '<a href="/privacy-policy.html">Privacy Policy</a>'
        },
        preferencesModal: {
          title: 'Cookie preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Decline all',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close',
          sections: [
            {
              title: 'Essential',
              description: 'Required for basic site functionality. Cannot be disabled.',
              linkedCategory: 'necessary'
            },
            {
              title: 'Analytics',
              description: 'Google Analytics 4 (property G-TDM2QFDQGJ) helps us understand how visitors use this site. No personally identifiable information is collected or shared with third parties.',
              linkedCategory: 'analytics',
              cookieTable: {
                caption: 'Cookie table',
                headers: {
                  name: 'Cookie',
                  domain: 'Domain',
                  desc: 'Description'
                },
                body: [
                  {
                    name: '_ga',
                    domain: 'imarketingclub.com',
                    desc: 'Main Google Analytics identifier, expires after 2 years.'
                  },
                  {
                    name: '_ga_*',
                    domain: 'imarketingclub.com',
                    desc: 'Session state for Google Analytics 4, expires after 2 years.'
                  }
                ]
              }
            }
          ]
        }
      }
    }
  }
});
