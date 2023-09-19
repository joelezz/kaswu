# BOT2.0

KASWU -AI Valmennusbotin Dokumentaatio


Johdanto

Tämä dokumentaatio käsittelee laaja-alaista ohjelmointiprojektia, jonka tavoitteena on toteuttaa monipuolinen ohjelmisto moduulissa, joka keskittyy ohjelmistokehittämisen perusteisiin. Projektissa on otettu huomioon tietoturva ja projektinhallinta, ja siinä hyödynnetään erilaisia ohjelmointikieliä ja teknologioita kuten HTML, CSS, JavaScript ja Python.

Projektin Tavoitteet

Tämän projektin päätavoitteena on tarjota kokonaisvaltainen esimerkki ohjelmistokehitysprosessista, joka huomioi tietoturvanäkökohdat sekä kattavan projektinhallinnan. Lisäksi projektissa käytetään eri ohjelmointikieliä ja -tekniikoita, mikä mahdollistaa monipuolisen ohjelmiston toteuttamisen. Projektin puitteissa käytettyjen ohjelmointikielien ja -tekniikoiden sisällyttäminen auttaa ymmärtämään niiden roolia ja toimintaa ohjelmistossa.

Käytetyt Ohjelmointikielet ja Teknologiat

Tässä projektissa käytetään useita erilaisia ohjelmointikieliä ja teknologioita, jotka mahdollistavat monipuolisen ohjelmiston toteutuksen:

    HTML (Hypertext Markup Language): HTML on käytössä ohjelmiston käyttöliittymän rakentamisessa. Se määrittelee sivun rakenteen ja elementit, kuten otsikot, tekstikappaleet ja linkit.
    CSS (Cascading Style Sheets): CSS vastaa ohjelmiston visuaalisesta ilmeestä. Se mahdollistaa sivun tyylin ja ulkoasun määrittämisen, kuten värityksen, fontit ja asettelun.
    JavaScript: JavaScript tuo interaktiivisuutta ohjelmistoon. Sitä käytetään dynaamisten elementtien luomiseen ja toiminnallisuuksien lisäämiseen, kuten lomakkeiden tarkistuksiin ja animaatioihin.
    Python: Python on käytössä ohjelmiston taustaprosessien toteuttamisessa. Se mahdollistaa datan käsittelyn, tietokantayhteydet ja monimutkaisemmat laskutoimitukset.

Tämän dokumentaation edetessä käsitellään yksityiskohtaisesti, miten kunkin ohjelmointikielen ja teknologian käyttö vaikuttaa projektin eri osa-alueisiin, kuten käyttöliittymään, tietoturvaan, projektinhallintaan ja julkaisuun.
Tietoturva: HTML, CSS, JavaScript ja Pythonin rooli

Tietoturva on projektissamme huomioitu. HTML, CSS, JavaScript ja Python ovat kaikki keskeisiä komponentteja tietoturvan näkökulmasta. Esimerkiksi, HTML-sivujen kautta käyttäjien syöttämät tiedot on asianmukaisesti puhdistettava ja tarkistettava mahdollisten haitallisten skriptien estämiseksi (cross-site scripting, XSS). Pythonissa käytetään tärkeiden tietojen suojaamiseen .env -tiedostoa.

Projektinhallinta ja Versionhallinta

Käytämme Git-versionhallintaa tallentaaksemme ja seurataksemme koodimuutoksia. Gitin avulla voimme helposti hallita koodin versioita, tehdä yhteistyötä tiimin jäsenten kanssa ja palauttaa aikaisempia versioita tarvittaessa.
Käyttöliittymä ja Julkaisu

HTML, CSS ja JavaScript muodostavat yhdessä käyttöliittymän rakenteen, ulkoasun ja interaktiivisuuden. HTML määrittelee sivun rakenteen, CSS hoitaa visuaalisen ilmeen ja JavaScript tuo mukaan dynaamisuutta. Käyttöliittymän testaus ja on jatkuvasti läsnä projektissa varmistaaksemme, että käyttäjille tarjotaan sujuva ja toimiva kokemus. Kun käyttöliittymä on valmis ja ohjelma testattu kattavasti, se julkaistaan tuotantoympäristöön. Tulevaisuudessa käytämme Pythonia varmistamaan, että sekä testaus että julkaisuprosessi on automatisoitu. Näin voimme varmistaa, että ohjelma toimii luotettavasti ja tehokkaasti käyttäjille.
Chatbot-ohjelman Dokumentaatio

Tämä dokumentaatio kuvaa chatbot-ohjelmaa, joka on toteutettu Pythonin Flask-webkehystä ja OpenAI GPT-3.5-Turbo -mallia hyödyntäen. Chatbot tarjoaa käyttäjille mahdollisuuden viestiä tekoälybotin kanssa ja saada vastauksia erilaisiin kysymyksiin tai viesteihin. Ohjelma toimii yhteistyössä OpenAI:n API:n kanssa ja mahdollistaa vuorovaikutuksen botin kanssa web-käyttöliittymän kautta.
Teknologiat ja Riippuvuudet

    Flask: Kehys, joka mahdollistaa web-sovelluksen luomisen ja hallinnan.
    Flask-CORS: Lisäosa, joka sallii ristiriippuvuuden käsittelemisen Flask-sovelluksessa.
    OpenAI API: Käytetään tekoälyvastauksien generointiin.
    dotenv: Käytetään ympäristömuuttujien hallintaan.
    uuid: Pythonin kirjasto UUID:n generoimiseen.
    HTML, CSS ja JavaScript: Käytetään käyttöliittymän luomiseen ja interaktiivisuuden toteuttamiseen.

Sovelluksen Rakenne

Ohjelman rakenne voidaan jakaa seuraaviin osiin:

Backend:

    app.py: Tämä tiedosto sisältää Flask-sovelluksen määrittelyn ja reitit.
    .env: Ympäristömuuttujat tallennetaan tähän tiedostoon.
    data.json: Tiedosto, johon tallennetaan käyttäjien vastaukset.

Frontend:

    static/: Kansio sisältää staattiset tiedostot, kuten kuvat ja CSS.
    templates/: Kansio sisältää HTML-templatet, jotka muodostavat käyttöliittymän.

Käyttöliittymä:

    Käyttöliittymä on toteutettu HTML-, CSS- ja JavaScript-tekniikoilla.
    Chatbox tarjoaa käyttäjälle mahdollisuuden viestiä botin kanssa.
    Käyttäjän syöte lähetetään POST-pyynnöllä Flask-sovellukselle.

Backend-logiikka:

    app.py sisältää Python-koodin, joka käsittelee käyttäjän syötettä.
    Käyttäjän syöte lähetetään OpenAI API:lle, ja botin vastaus palautetaan käyttäjälle.

Asennus ja Käynnistys

    Asenna tarvittavat riippuvuudet suorittamalla komento pip install -r requirements.txt.
    Luo .env-tiedosto ja aseta ympäristömuuttujat GOOGLE_FORMS ja OPENAI_API_KEY.
    Käynnistä sovellus komennolla python app.py.
    Avaa selain ja siirry osoitteeseen http://127.0.0.1:5000/.

Käyttö

    Avaa selain ja siirry osoitteeseen http://127.0.0.1:5000/.
    Chatbox aukeaa oikeassa alakulmassa.
    Kirjoita viesti chatboxiin ja lähetä se painamalla "Send" -painiketta tai Enter-näppäintä.
    Botin vastaus näkyy chatboxissa.

Tekninen Tuki

Jos kohtaat ongelmia ohjelman asentamisessa tai käytössä, ota yhteyttä tekniseen tukeen sähköpostitse osoitteeseen kaswuoy@gmail.com.
Yhteenveto

Tämä dokumentaatio antaa yleiskuvan chatbot-ohjelman toiminnasta, rakenteesta ja asennuksesta. Seuraamalla ohjeita voit asentaa ohjelman ja käyttää sitä vuorovaikutukseen tekoälybotin kanssa. Ohjelma tarjoaa helppokäyttöisen käyttöliittymän ja mahdollistaa reaaliaikaisen vuorovaikutuksen botin kanssa.
