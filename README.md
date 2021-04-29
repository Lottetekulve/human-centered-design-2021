# Human Centered Design @cmda-minor-web · 2020/21

# Like link:
https://emotions-chat.herokuapp.com/

## Table of Contents
- Beschrijving 
- Drie Concepten
- Gekozen Concept
- Moscow
- Real time Events
- API
  - Welke API heb ik gebruikt
  - API Inhoud
  - Hoe gebruikt
  - API key
- Used Packages
- Install project


### Beschrijving
Dit vak draait om human centered design. Iedereen ontwerpt voor een user. Ik ontwerp voor Eric. 
Eric is 48 jaar en woont in Amsterdam. Hij heeft Interaction Design aan de HKU gestudeerd. Eric zelf zit in een elektrische rolstoel. Hij heeft niet de beschikking over de fijne motoriek. Voor Eric ga ik een chat ontwerpen waarbij bodylanguage wordt overgebracht, omdat emoji's niet genoeg spreken of verkeerd geinterpreteerd worden.


### Drie Concepten
#### Concept 1: Emotie en Kleur
Voor het eerste concept heb ik bedacht om met de emotie detectie API emoties af te lezen van de gebruiker en per emotie een kleur in te stellen. Wanneer je dan een bericht stuurt krijgt het bericht de kleur van de emotie die jij op dat moment voelt en uit. 
![](./public/images/concept1.png)

##### Hoe te bouwen:
- Begin met HTML, CSS en JS opzetten
- API call
- Render homepage
- Maak chat functie
- Stel kleuren per emoties in


#### Concept 2: Snapshots
Voor dit concept leek het mij een goed idee om een foto van jezelf te sturen naar de persoon waarmee je chat. Zodat deze persoon direct kon zien hoe een bericht bedoelt wordt.

![](./public/images/concept2.png)


##### Hoe te bouwen:
- Begin met HTML, CSS en JS opzetten
- API call
- Render homepage
- Maak chat functie
- Maak snapshot en stuur naar gebruiker

#### Concept 3: Snapshot en kleur per emotie
Voor dit concept wil ik de vorige twee concepten combineren. Dus je leest de emotie af met de API en hierdoor veranderd de kleur van je bericht per emotie. En voor een extra beeld ook een image die het nog duidelijker maakt wat de emoties is die je wilt overbrengen.

![](./public/images/concept3.png)

##### Hoe te bouwen:
- Begin met HTML, CSS en JS opzetten
- API call
- Render homepage
- Maak chat functie
- Stel kleuren per emoties in
- Maak snapshot en stuur naar gebruiker

### Gekozen concept
<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->
![](./public/images/)
....
#### Features:
- chat
- Emotie detectie
- Aan of uit buttons
- kleur per emotie
- snapshot


### Moscow
#### Must have:
- [x] Chat
- [x] Api connectie
- [x] Met socket.io chat beheren
- [x] snapshot sturen
- [x] Kleur per emotie

#### Should have:
- [x] aan en uit buttons kleur
- [x] optie voor snapshot wel of niet

#### Could have:
- [ ] keuze uit vaste emotie hoofden van jezelf of snapshot op het moment

#### Would have:
- [ ] Meer doen aan uiterlijk website

### API
#### Welke API:
Face-api.min.js in de public file.


#### Hoe gebruikt:
- loadFacialRecognition function: 
```
async function loadFacialRecognition() {
  await Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('./models'), faceapi.nets.faceLandmark68Net.loadFromUri('./models'), faceapi.nets.faceRecognitionNet.loadFromUri('./models'), faceapi.nets.faceExpressionNet.loadFromUri('./models')])
```
- detectEmotion function:
```
setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
```



#### Real-Time Events
- Connection: <br>
Wanneer de webpagina wordt geopent, wordt er een connectie gemaakt met socket.io. Dit event roept alle andere real time events aan, message en disconnect.
```
io.on('connection', async socket => {
```
- Message:<br>
Het message event zorgt er voor dat de alle berichten en usernames, naar alle servers worden gestuud.
```
socket.on('message', (message) => {
    io.emit('message', message)
  })
```

```
socket.on('message', function(message) {
  const element = document.createElement('li')
  element.textContent = message.value
  element.style.setProperty('--background', `var(--${message.emotion})`)
  messages.appendChild(element)
  messages.scrollTop = messages.scrollHeight
})
````

- Disconnect:
Wanneer iemand het spel verlaat wordt er een bericht getoont dat een speler het spel verlaten heeft.
```
socket.on('disconnect', () => {
    console.log('user disconnected')
  })
```


### Used Packages
- express
- socket.io
- dotenv
- handlebars
- nodemon

Install:
1. npm install
2. npm install express, socket.io, dotenv, handlebars
3. npm install -D nodemon
4. require: `const ... = require('...')`


### Install project
1. clone repo: 
``` 
https://github.com/Lottetekulve/human-centered-design-2021.git
```
2. Install used packages: 
```
npm install
```
3. Start op het web: 
```
npm run dev
```
4. Te vinden op: http://localhost:5000/


