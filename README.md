# Picada 🎣

**Una eina per comparar quan i on poden ser més favorables les condicions per pescar des de costa al Mediterrani.**

[Català](#catala) · [Español](#espanol) · [English](#english)

[Repositori](https://github.com/Guirigall/Picada)

<a id="catala"></a>
## Català

### Què és Picada?

Picada combina previsions meteorològiques i marines amb les característiques de cada punt de pesca i de l’espècie objectiu. Mostra una **puntuació orientativa d’1 a 10**, un rànquing de punts i les franges horàries més favorables dins d’un horitzó de set dies.

La interfície és en català i s’adapta a ordinadors i mòbils. L’aplicació funciona al navegador, sense compte d’usuari ni servidor propi de dades.

### Què permet fer?

- Comparar **18 punts inicials de la costa catalana**, de l’Alt Empordà al Montsià.
- Triar entre **9 espècies**: orada, sarg, llobarro, mabre, oblada, boga, corball, lliri i calamar.
- Explorar un mapa amb capes de **satèl·lit i carrers**.
- Consultar el rànquing per a l’espècie i l’hora seleccionades.
- Veure onatge, període i direcció de les onades, vent, ratxes, temperatura de l’aigua i tendència de pressió.
- Entendre quins factors afavoreixen o penalitzen la puntuació.
- Consultar una cinta de set dies i fins a cinc finestres destacades.
- Afegir, editar i eliminar punts propis, desats al navegador.
- Rebre avisos orientatius sobre condicions dures i possibles espais protegits o zones portuàries.

### Com s’utilitza?

1. **Tria l’espècie** a la barra superior. Les notes es recalculen segons el seu perfil.
2. **Mou el selector d’hora** per explorar la previsió. El botó **Ara** torna a l’hora més propera a l’actual.
3. **Compara el rànquing** o toca un marcador del mapa.
4. Obre **Detall** per veure la nota, les condicions, el desglossament de factors i les millors finestres.
5. Toca una finestra o la cinta temporal per situar-te en aquella hora.
6. Prem **↻** per tornar a consultar les previsions.

Per crear un punt, prem **+ Punt** i toca el mapa. Escriu-ne el nom, selecciona el fons —sorra, mixt o roca— i orienta la brúixola **des del punt cap a mar obert**. Aquesta orientació permet distingir vent de mar, de terra o paral·lel a la costa. També pots indicar posidònia, un canal o desembocadura, o un port/moll amb llum.

Desa’l amb **Desa el punt**. Els punts propis tenen el botó **Edita aquest punt**, des d’on també es poden eliminar. Els punts inicials no ofereixen aquest editor.

### Com es calcula la nota?

El model és una **heurística**, no una probabilitat de captura. Cada espècie té preferències, llindars i pesos propis per a:

| Factor | Què considera el model |
| --- | --- |
| Onatge | Alçada, període i estabilitat de la mar |
| Vent | Velocitat i direcció respecte de l’orientació del punt |
| Remoguda | Estimació a partir de l’energia de les onades i el vent de mar |
| Llum | Altura solar, dia, nit, alba, capvespre i nuvolositat |
| Transicions | Canvis d’onatge, vent i pressió en hores properes |
| Pressió | Tendència baromètrica de les darreres tres hores |
| Temperatura | Adequació de la temperatura superficial de l’aigua a l’espècie |
| Lluna | Un pes generalment petit; més rellevant al perfil del calamar |

La combinació es modifica segons el fons i les característiques del punt. També s’apliquen penalitzacions tèrmiques i límits de puntuació davant d’onatge o ratxes elevades. **La marea no forma part del càlcul.** La remoguda i la terbolesa són estimacions, no mesures directes de l’aigua.

Les millors finestres es detecten a partir d’una nota inicial d’almenys **6,8**, es mantenen mentre la nota sigui d’almenys **6,3** i no hi hagi avisos, i han de contenir com a mínim dos valors horaris. Es mostren les cinc amb el pic més alt.

Els perfils del lliri i del calamar incorporen avisos sobre el caràcter més experimental del model i les tècniques de pesca específiques. Una nota alta no garanteix captures ni seguretat.

### Dades, privacitat i mode de demostració

- **Open-Meteo Marine API**: onatge i temperatura superficial de l’aigua.
- **Open-Meteo Forecast API**: pressió, vent, ratxes i nuvolositat.
- **Esri**, amb **Leaflet 1.9.4**: cartografia de satèl·lit i carrers.
- **OpenStreetMap / Overpass**: comprovació orientativa de possibles parcs, reserves i zones portuàries quan s’obre l’editor d’un punt.
- **Google Fonts / cdnjs**: tipografies i biblioteca del mapa.

El codi consulta set dies de previsió amb el fus `Europe/Madrid` i no demana claus API. Omple alguns valors absents per interpolació o amb valors de reserva.

Si les consultes meteorològiques fallen, passa a **dades simulades de demostració** i ho indica amb una franja visible. En aquest mode, **les notes no són una previsió real**. Prem ↻ per intentar recuperar les dades reals.

Els punts propis es desen a `localStorage`, amb la clau `spots:custom`: no se sincronitzen entre dispositius i es poden perdre en esborrar les dades del navegador. Per obtenir previsions i comprovacions, les coordenades dels punts s’envien als serveis externs corresponents.

Els avisos cartogràfics **no certifiquen que s’hi pugui pescar**. Una consulta sense coincidències tampoc és una autorització. Consulta [OnPescar](https://agricultura.gencat.cat/ca/ambits/pesca/pesca-recreativa/mapa-onpescar/) i la informació oficial aplicable al lloc i al moment de la sortida. Els avisos del model no substitueixen l’observació del mar ni els avisos meteorològics oficials.

### Executar i publicar

Estructura esperada per publicar la web i la PWA:

```text
Picada/
├── index.html
├── manifest.json
├── service-worker.js
├── icon-192.png
├── icon-512.png
├── icon-maskable-512.png
└── README.md
```

No cal instal·lar paquets ni compilar. Amb Python 3, des de la carpeta del projecte:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Obre `http://localhost:8000/`. La previsió, les comprovacions geogràfiques, el mapa i les dependències externes necessiten connexió.

Per publicar a GitHub Pages: **Settings → Pages → Deploy from a branch**, tria la branca que contingui aquests fitxers i la carpeta **/(root)**, i desa. Consulta l’URL que mostri GitHub; si s’utilitza el domini de projecte per defecte, tindria la forma `https://guirigall.github.io/Picada/`. [Instruccions oficials](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

### Instal·lar com a app

La pàgina inclou un manifest i registra `service-worker.js` quan se serveix amb un context compatible. Publica-la amb **HTTPS** i obre-la al mòbil. A Android/Chrome, utilitza «Afegeix a la pantalla d’inici» o «Instal·la l’aplicació» si el navegador ho ofereix; a iPhone/Safari, Compartir → Afegeix a la pantalla d’inici.

Cal publicar també les tres icones: el service worker les inclou a la càrrega inicial de la memòria cau, que pot fallar si en falta alguna.

**L’ús sense connexió és parcial:** el service worker desa la carcassa del mateix origen, però no les previsions, les tessel·les d’Esri ni les dependències externes de Leaflet i les fonts. No s’ha de donar per garantit el funcionament complet sense Internet. Les dades de demostració tampoc substitueixen una previsió descarregada.

<a id="espanol"></a>
## Español

### ¿Qué es Picada?

Picada combina previsiones meteorológicas y marinas con las características de cada punto de pesca y de la especie objetivo. Muestra una **puntuación orientativa de 1 a 10**, una clasificación de puntos y las franjas horarias más favorables dentro de un horizonte de siete días.

La interfaz está en catalán y se adapta a ordenadores y móviles. Funciona en el navegador, sin cuenta de usuario ni servidor propio de datos.

### Funciones y uso

- Incluye **18 puntos iniciales de la costa catalana**, desde el Alt Empordà hasta el Montsià.
- Permite seleccionar **9 especies**: dorada, sargo, lubina, herrera, oblada, boga, corvallo, anjova y calamar. Los botones conservan sus nombres en catalán.
- Ofrece mapa de **satélite y calles**, clasificación, detalle de las condiciones, desglose de factores, una banda temporal de siete días y hasta cinco ventanas destacadas.
- Permite guardar puntos propios y muestra avisos orientativos sobre condiciones duras y posibles espacios protegidos o zonas portuarias.

Selecciona la especie, mueve el control de hora y toca un punto del mapa o de la clasificación. En **Detall** puedes consultar la nota, el oleaje, su periodo y dirección, el viento, las rachas, la temperatura del agua y la tendencia de presión. Toca una ventana o la banda temporal para ir a esa hora. **Ara** vuelve a la hora más cercana a la actual y **↻** actualiza las previsiones.

Para crear un punto, pulsa **+ Punt** y toca el mapa. Introduce un nombre, elige fondo de arena, mixto o roca, y orienta la brújula **desde el punto hacia mar abierto**. Esta orientación diferencia el viento de mar, de tierra o paralelo a la costa. También puedes indicar posidonia, un canal o desembocadura, o un puerto/muelle iluminado.

Guarda con **Desa el punt**. Solo los puntos propios ofrecen **Edita aquest punt**, desde donde también puedes eliminarlos.

### Puntuación y mejores ventanas

El modelo es una **heurística, no una probabilidad de captura**. Cada especie tiene sus propios pesos y preferencias para oleaje, viento respecto a la costa, agitación, luz, cambios del estado del mar, tendencia de presión en tres horas, temperatura y fase lunar. La luz se estima mediante altura solar y nubosidad; la agitación y turbidez se estiman a partir del oleaje y del viento, no se miden directamente. **La marea no interviene.**

El fondo y las características del punto modifican el resultado. Se aplican penalizaciones por temperatura y límites de puntuación por oleaje o rachas elevados. La Luna tiene generalmente poco peso, salvo en el perfil del calamar. Los perfiles de anjova y calamar incluyen avisos sobre su carácter más experimental y las técnicas específicas.

Una ventana empieza con una nota de al menos **6,8**, continúa mientras haya al menos **6,3** y no existan avisos, y debe contener como mínimo dos valores horarios. Se muestran las cinco con el pico más alto. Una nota alta no garantiza capturas ni seguridad.

### Datos, privacidad y demostración

- **Open-Meteo Marine API**: oleaje y temperatura superficial del agua.
- **Open-Meteo Forecast API**: presión, viento, rachas y nubosidad.
- **Esri y Leaflet 1.9.4**: mapa de satélite y calles.
- **OpenStreetMap / Overpass**: consulta orientativa de parques, reservas y zonas portuarias al abrir el editor de un punto.
- **Google Fonts / cdnjs**: tipografías y biblioteca del mapa.

El código solicita siete días con el huso `Europe/Madrid`, sin pedir claves API. Algunos valores ausentes se interpolan o se sustituyen por valores de reserva.

Si fallan las consultas meteorológicas, aparece un aviso y se utilizan **datos simulados de demostración**. Sus puntuaciones **no son una previsión real**. Pulsa ↻ para volver a intentarlo.

Los puntos propios se guardan en `localStorage`, bajo `spots:custom`: no se sincronizan entre dispositivos y pueden perderse al borrar los datos del navegador. Las coordenadas se envían a los servicios externos utilizados para obtener previsiones y comprobaciones.

Los avisos geográficos **no certifican que esté permitido pescar** y la ausencia de coincidencias tampoco es una autorización. Consulta [OnPescar](https://agricultura.gencat.cat/ca/ambits/pesca/pesca-recreativa/mapa-onpescar/) y la información oficial aplicable al lugar y a la fecha. Los avisos del modelo no sustituyen la observación del mar ni los avisos meteorológicos oficiales.

### Ejecutar, publicar e instalar

Mantén juntos `index.html`, `manifest.json`, `service-worker.js`, `icon-192.png`, `icon-512.png` e `icon-maskable-512.png`, además de este README. No hace falta compilar ni instalar paquetes.

Con Python 3, desde la carpeta del proyecto:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Abre `http://localhost:8000/`. Las previsiones, comprobaciones geográficas, mapas y dependencias externas necesitan conexión.

En GitHub Pages: **Settings → Pages → Deploy from a branch**, elige la rama con estos archivos y **/(root)**, y guarda. Usa la URL indicada por GitHub; con la dirección de proyecto por defecto tendría la forma `https://guirigall.github.io/Picada/`. [Documentación oficial](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Para instalar la PWA, publícala con **HTTPS** y ábrela en el móvil. En Android/Chrome: «Añadir a pantalla de inicio» o «Instalar aplicación», si está disponible. En iPhone/Safari: Compartir → Añadir a pantalla de inicio. El manifiesto define la app y la página registra `service-worker.js`. Las tres imágenes de icono deben estar publicadas; si falta alguna, la preparación de la caché puede fallar.

**El modo sin conexión es parcial:** el service worker guarda la estructura del mismo origen, pero no las previsiones, las imágenes de Esri ni las dependencias externas de Leaflet y las fuentes. No se garantiza el funcionamiento completo sin Internet. Los datos de demostración no sustituyen una previsión descargada.

<a id="english"></a>
## English

### What is Picada?

Picada combines weather and marine forecasts with the characteristics of each fishing spot and target species. It displays an **indicative score from 1 to 10**, a ranking of spots and promising time windows over a seven-day horizon.

The interface is in Catalan and adapts to desktop and mobile screens. It runs in the browser without a user account or a dedicated data server.

### Features and use

- **18 initial spots along the Catalan coast**, from Alt Empordà to Montsià.
- **9 target species**: gilthead seabream, white seabream, European seabass, striped seabream, saddled seabream, bogue, brown meagre, bluefish and European squid. The buttons retain their Catalan names.
- **Satellite and street maps**, rankings, detailed conditions, factor breakdowns, a seven-day timeline and up to five highlighted windows.
- User-defined spots, plus indicative warnings about rough conditions and potential protected areas or port zones.

Select a species, move the time slider and tap a map marker or ranking entry. **Detall** shows the score, wave height, period and direction, wind, gusts, water temperature and pressure trend. Tap a highlighted window or the timeline to select that hour. **Ara** returns to the hour closest to the current time; **↻** refreshes forecasts.

To add a spot, press **+ Punt** and tap the map. Enter a name, choose sand, mixed or rocky bottom, and point the compass **from the spot towards the open sea**. This bearing distinguishes onshore, offshore and alongshore wind. You can also mark nearby seagrass, a channel or river mouth, or an illuminated port/pier.

Save with **Desa el punt**. Only user-defined spots have **Edita aquest punt**, where they can also be deleted.

### Scoring and time windows

The model is a **heuristic, not a catch probability**. Each species has its own weights and preferences for waves, wind relative to the coast, water agitation, light, changing sea conditions, three-hour pressure trends, temperature and lunar phase. Light uses solar elevation and cloud cover; agitation and turbidity are estimated from waves and wind rather than measured directly. **Tides are not included.**

Bottom type and spot characteristics modify the result. Temperature penalties and score caps for high waves or gusts also apply. Lunar influence is generally small, except in the squid profile. Bluefish and squid profiles include notes about their more experimental assumptions and specific fishing techniques.

A window starts at a score of at least **6.8**, continues while the score stays at least **6.3** without warnings, and must contain at least two hourly values. The five windows with the highest peaks are shown. A high score does not guarantee catches or safe conditions.

### Data, privacy and demo mode

- **Open-Meteo Marine API**: waves and sea surface temperature.
- **Open-Meteo Forecast API**: pressure, wind, gusts and cloud cover.
- **Esri and Leaflet 1.9.4**: satellite and street maps.
- **OpenStreetMap / Overpass**: indicative checks for parks, reserves and port zones when opening a spot’s editor.
- **Google Fonts / cdnjs**: fonts and the mapping library.

The code requests seven days using the `Europe/Madrid` time zone and does not ask for API keys. Some missing values are interpolated or replaced with fallback values.

If forecast requests fail, the app displays a banner and uses **simulated demonstration data**. Scores in that mode **are not real forecasts**. Press ↻ to retry.

Custom spots are stored in `localStorage` under `spots:custom`. They do not sync between devices and may be lost if browser site data is cleared. Spot coordinates are sent to the external services used for forecasts and geographic checks.

Geographic warnings **do not certify that fishing is permitted**, and finding no matching areas is not an authorization either. Check [OnPescar](https://agricultura.gencat.cat/ca/ambits/pesca/pesca-recreativa/mapa-onpescar/) and official information applicable to the location and date. Model warnings do not replace observing actual sea conditions or consulting official weather warnings.

### Running, publishing and installing

Keep `index.html`, `manifest.json`, `service-worker.js`, `icon-192.png`, `icon-512.png` and `icon-maskable-512.png` together, along with this README. No build step or package installation is needed.

With Python 3, from the project folder:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://localhost:8000/`. Forecasts, geographic checks, maps and external dependencies need Internet access.

For GitHub Pages: **Settings → Pages → Deploy from a branch**, choose the branch containing these files and **/(root)**, then save. Use the URL GitHub provides; the default project address would take the form `https://guirigall.github.io/Picada/`. [Official instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

To install the PWA, publish it over **HTTPS** and open it on your phone. On Android/Chrome, choose “Add to home screen” or “Install app” if available. On iPhone/Safari: Share → Add to Home Screen. The manifest defines the app and the page registers `service-worker.js`. All three icon files must be published; a missing icon can cause cache setup to fail.

**Offline support is partial:** the service worker stores the same-origin app shell, but not forecasts, Esri tiles or external Leaflet and font dependencies. Full functionality without Internet access is not guaranteed. Demo data is not a replacement for a downloaded forecast.
