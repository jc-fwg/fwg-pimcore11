/*
Standardmäßig lädt Klaro die Konfiguration aus einer globalen
'klaroConfig'-Variablen. Sie können dies ändern, indem Sie das Attribut 'data-
klaro-config' in Ihrem Skript angeben: <script src="klaro.js" data-klaro-
config="myConfigVariableName"
*/

// Config Beispiel: https://klaro.org/de/doku/integration/kommentierte-konfiguration

var klaroConfig = {
    testing: false,
    elementID: 'klaro',
    storageMethod: 'cookie',
    storageName: 'klaro',
    htmlTexts: true,
    //cookieDomain: '.example.com',
    cookieExpiresAfterDays: 30,
    default: false,
    mustConsent: false,
    acceptAll: true,
    hideDeclineAll: false,
    hideLearnMore: false,

    translations: {
        /*
        Der Schlüssel `zz` enthält Standardübersetzungen, die als Fallback-Werte
            verwendet werden. Dies kann z.B. nützlich sein, um eine Ersatz-URL für die
            Datenschutzrichtlinie zu definieren.
        */
        zz: {
            privacyPolicyUrl: '/impressum-und-datenschutz',

        },
        de: {
            consentNotice: {
                description: "<strong>Es gibt Kekse!</strong><br />Wir nutzen ein paar Dienste, um Die als User wichtige Funktionen anzubieten und die Inhalte des Blogs richtig darzustellen und um unsere Besucher besser kennenzulernen (Analytics). Dürfen wir diese aktivieren? Du kannst Deine Zustimmung später jederzeit ändern oder zurückziehen!",
            },
            purposes: {
                analytics: {
                    title: 'Besucher-Statistiken'
                },
                functional: {
                    title: 'Website-Funktionalität'
                }
            },
            consentNotice: {
                learnMore: 'Weitere Informationen',
                acceptAll: 'Alle akzeptieren',
            },
            ok: 'Ich stimme zu, gebt mir Kekse!',
            save: 'Speichern',
            decline: 'Ich lehne ab. Keine Kekse für mich.',
        }
    },

    services: [
        {
            name: 'klaro',
            default: true,
            translations: {
                zz: {
                    title: 'Klaro Cookie Consent',
                },
                de: {
                    description: 'Klaro ist ein Open-Source Cookie Consent Manager, der Dir die Kontrolle über Deine Privatsphäre gibt. Er speichert keine personenbezogenen Daten und hilft Dir, die Kontrolle über Ihre Privatsphäre zu behalten.'
                }
            },
            purposes: ['functional'],

            cookies: [
                /*
                entweder nur einen Cookie-Namen oder einen regulären Ausdruck (regex) oder eine
                Liste bestehend aus einem Namen oder einem regulären Ausdruck, einem Pfad und
                einer Cookie-Domäne angeben. Die Angabe eines Pfades und einer Domäne ist
                erforderlich, wenn Sie Dienste haben, die Cookies für einen Pfad, der nicht "/"
                ist, oder eine Domäne, die nicht die aktuelle Domäne ist, setzen. Wenn Sie diese
                Werte nicht richtig setzen, kann das Cookie von Klaro nicht gelöscht werden, da
                es keine Möglichkeit gibt, auf den Pfad oder die Domäne eines Cookies in JS
                zuzugreifen. Beachten Sie, dass es nicht möglich ist, Cookies zu löschen, die
                auf einer Domäne eines Drittanbieters gesetzt wurden, oder Cookies, die das
                Attribut HTTPOnly haben: https://developer.mozilla.org/en-
                US/docs/Web/API/Document/cookie#new-cookie_domain
                */

                /*
                Diese Regel passt auf Cookies, die die Zeichenfolge '_pk_' enthalten und die auf
                den Pfad '/' und die Domäne 'klaro.kiprotect.com' gesetzt sind.
                */
                [/^_pk_.*$/, '/', 'klaro.kiprotect.com'],

                /*
                Dasselbe wie oben, nur für die Domäne 'localhost'.
                */
                [/^_pk_.*$/, '/', 'localhost'],

                /*
                Diese Regel trifft auf alle Cookies mit dem Namen 'piwik_ignore' zu, die auf dem
                Pfad '/' auf der aktuellen Domain gesetzt sind
                */
                'klaro_ignore',
            ],
            required: true,
            optOut: false,
            onlyOnce: true,
        },
        {
            name: 'leaflet',
            default: true,
            translations: {
                zz: {
                    title: 'Leaflet Maps mit Open Street Map',
                },
                de: {
                    description: 'Leaflet ist eine Open-Source-JavaScript-Bibliothek zur Erstellung interaktiver Karten. Leaflet selbst setzt keine Cookies ein, um einzelne Nutzer zu identifizieren. Allerdings werden technische und personenbezogene Informationen – beispielsweise die IP-Adresse – vom Browser an die Server des Anbieters übermittelt, damit die Kartendarstellung funktioniert.<br><br>OpenStreetMap stellt Kartenmaterial bereit, das auf der Website eingebunden und dort angezeigt wird. Zwar werden auf dem Endgerät des Nutzers keine Cookies im eigentlichen Sinne gespeichert, jedoch werden technische und personenbezogene Informationen – beispielsweise die IP-Adresse – vom Browser an die Server des Anbieters übermittelt, damit die Kartendarstellung funktioniert.'
                }
            },
            purposes: ['functional'],

            cookies: [
                /*
                entweder nur einen Cookie-Namen oder einen regulären Ausdruck (regex) oder eine
                Liste bestehend aus einem Namen oder einem regulären Ausdruck, einem Pfad und
                einer Cookie-Domäne angeben. Die Angabe eines Pfades und einer Domäne ist
                erforderlich, wenn Sie Dienste haben, die Cookies für einen Pfad, der nicht "/"
                ist, oder eine Domäne, die nicht die aktuelle Domäne ist, setzen. Wenn Sie diese
                Werte nicht richtig setzen, kann das Cookie von Klaro nicht gelöscht werden, da
                es keine Möglichkeit gibt, auf den Pfad oder die Domäne eines Cookies in JS
                zuzugreifen. Beachten Sie, dass es nicht möglich ist, Cookies zu löschen, die
                auf einer Domäne eines Drittanbieters gesetzt wurden, oder Cookies, die das
                Attribut HTTPOnly haben: https://developer.mozilla.org/en-
                US/docs/Web/API/Document/cookie#new-cookie_domain
                */

                /*
                Diese Regel passt auf Cookies, die die Zeichenfolge '_pk_' enthalten und die auf
                den Pfad '/' und die Domäne 'klaro.kiprotect.com' gesetzt sind.
                */
                [/^_pk_.*$/, '/', 'klaro.kiprotect.com'],

                /*
                Dasselbe wie oben, nur für die Domäne 'localhost'.
                */
                [/^_pk_.*$/, '/', 'localhost'],

                /*
                Diese Regel trifft auf alle Cookies mit dem Namen 'piwik_ignore' zu, die auf dem
                Pfad '/' auf der aktuellen Domain gesetzt sind
                */
                'leaflet_ignore',
            ],
            required: false,
            optOut: false,
            onlyOnce: true,
            callback: function (consent, service) {
                if (consent) {
                    const scriptUrls = [
                        'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js',
                        'https://unpkg.com/@raruto/leaflet-elevation/dist/leaflet-elevation.js',
                        'https://cdn.jsdelivr.net/npm/leaflet-gpx@1.7.0/gpx.min.js'
                    ];

                    const loadScriptSequentially = (urls, index = 0) => {
                        if (index >= urls.length) {
                            console.log('All Leaflet scripts loaded');
                            leafletInit();
                            return;
                        }

                        const script = document.createElement('script');
                        script.src = urls[index];
                        script.onload = () => loadScriptSequentially(urls, index + 1);
                        script.onerror = (e) =>
                            console.error('Fehler beim Laden von', urls[index], e);
                        document.head.appendChild(script);
                    };

                    loadScriptSequentially(scriptUrls);
                } else {
                    console.log('Leaflet consent declined');
                }
            },
        },
        {
            name: 'comments',
            default: true,
            translations: {
                zz: {
                    title: 'Kommentare',
                },
                de: {
                    description: 'Unsere von uns entwickelter Kommentarfunktion speichert keine Cookies im eigentlichen Sinne, jedoch werden technische und personenbezogene Informationen – beispielsweise die IP-Adresse – vom Browser an den Server übermittelt, damit die Kommentarfunktion funktioniert. Zusätzlich werden beim Absenden eines Kommentars die von Dir eingegebenen Daten (Name, E-Mail-Adresse, Website und Kommentartext) gespeichert. Deine E-Mail-Adresse wird nur zur Benachrichtigung der Freischaltung Deines Kommentars verwendet. '
                }
            },
            purposes: ['functional'],

            cookies: [
                /*
                entweder nur einen Cookie-Namen oder einen regulären Ausdruck (regex) oder eine
                Liste bestehend aus einem Namen oder einem regulären Ausdruck, einem Pfad und
                einer Cookie-Domäne angeben. Die Angabe eines Pfades und einer Domäne ist
                erforderlich, wenn Sie Dienste haben, die Cookies für einen Pfad, der nicht "/"
                ist, oder eine Domäne, die nicht die aktuelle Domäne ist, setzen. Wenn Sie diese
                Werte nicht richtig setzen, kann das Cookie von Klaro nicht gelöscht werden, da
                es keine Möglichkeit gibt, auf den Pfad oder die Domäne eines Cookies in JS
                zuzugreifen. Beachten Sie, dass es nicht möglich ist, Cookies zu löschen, die
                auf einer Domäne eines Drittanbieters gesetzt wurden, oder Cookies, die das
                Attribut HTTPOnly haben: https://developer.mozilla.org/en-
                US/docs/Web/API/Document/cookie#new-cookie_domain
                */

                /*
                Diese Regel passt auf Cookies, die die Zeichenfolge '_pk_' enthalten und die auf
                den Pfad '/' und die Domäne 'klaro.kiprotect.com' gesetzt sind.
                */
                [/^_pk_.*$/, '/', 'frei-weg.com'],

                /*
                Dasselbe wie oben, nur für die Domäne 'localhost'.
                */
                [/^_pk_.*$/, '/', 'localhost'],

                /*
                Diese Regel trifft auf alle Cookies mit dem Namen 'piwik_ignore' zu, die auf dem
                Pfad '/' auf der aktuellen Domain gesetzt sind
                */
                'comments_ignore',
            ],

            required: false,
            optOut: false,
            onlyOnce: true,
        },
        {
            name: 'googleanalytics',
            default: false,
            translations: {
                zz: {
                    title: 'Google Analytics',
                },
                de: {
                    description: 'Google Analytics ist ein Analysewerkzeug, das hilft, das Verhalten und die Interaktionen der Website-Besucher im Detail auszuwerten. Hierbei werden Cookies eingesetzt, um einzelne Nutzer zu identifizieren, die Anzahl der Anfragen zu regulieren, Verbindungen zwischen der Client-ID und der AMP-Client-ID eines Nutzers herzustellen, kampagnenrelevante Informationen zu erfassen und Daten aus verschiedenen Seitenaufrufen miteinander zu verknüpfen.'
                }
            },
            purposes: ['analytics'],
            cookies: [
                /*
                entweder nur einen Cookie-Namen oder einen regulären Ausdruck (regex) oder eine
                Liste bestehend aus einem Namen oder einem regulären Ausdruck, einem Pfad und
                einer Cookie-Domäne angeben. Die Angabe eines Pfades und einer Domäne ist
                erforderlich, wenn Sie Dienste haben, die Cookies für einen Pfad, der nicht "/"
                ist, oder eine Domäne, die nicht die aktuelle Domäne ist, setzen. Wenn Sie diese
                Werte nicht richtig setzen, kann das Cookie von Klaro nicht gelöscht werden, da
                es keine Möglichkeit gibt, auf den Pfad oder die Domäne eines Cookies in JS
                zuzugreifen. Beachten Sie, dass es nicht möglich ist, Cookies zu löschen, die
                auf einer Domäne eines Drittanbieters gesetzt wurden, oder Cookies, die das
                Attribut HTTPOnly haben: https://developer.mozilla.org/en-
                US/docs/Web/API/Document/cookie#new-cookie_domain
                */

                /*
                Diese Regel passt auf Cookies, die die Zeichenfolge '_pk_' enthalten und die auf
                den Pfad '/' und die Domäne 'klaro.kiprotect.com' gesetzt sind.
                */
                [/^_pk_.*$/, '/', 'klaro.kiprotect.com'],

                /*
                Dasselbe wie oben, nur für die Domäne 'localhost'.
                */
                [/^_pk_.*$/, '/', 'localhost'],

                /*
                Diese Regel trifft auf alle Cookies mit dem Namen 'piwik_ignore' zu, die auf dem
                Pfad '/' auf der aktuellen Domain gesetzt sind
                */
                'googleanalytics_ignore',
            ],
            required: false,
            optOut: false,
            onlyOnce: true,
            callback: function(consent, service) {
                if (consent) {
                    // GA4 Script dynamisch laden (wichtig!)
                    let gaScript = document.createElement('script');
                    gaScript.async = true;
                    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-R7F3F4ZY8B';
                    document.head.appendChild(gaScript);

                    // Google Analytics initialisieren
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){ dataLayer.push(arguments); }
                    gtag('js', new Date());
                    gtag('config', 'G-R7F3F4ZY8B', { 'anonymize_ip': true });
                } else {
                    // Deaktivieren
                    window['ga-disable-G-R7F3F4ZY8B'] = true;
                }
            },
        }
    ],

    /*
    Sie können eine optionale Callback-Funktion definieren, die jedes Mal aufgerufen
    wird, wenn sich der Zustimmungsstatus für einen bestimmten Dienst ändert. Der
    Zustimmungswert wird als erster Parameter an die Funktion übergeben
    (true=zustimmend). Die `service` Konfiguration wird als zweiter Parameter
    übergeben.
    */
    callback: function(consent, service) {
        console.log(
            'User consent for service ' + service.name + ': consent=' + consent
        );
    },

};