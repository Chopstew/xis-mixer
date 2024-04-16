# [xis-mixer](https://xis-mixer.surge.sh/) (← Link zur Demo)
- de: X-is-finished-Prototyp eines simplen 2D-Audiomixers für das Einstellen räumlicher Klangverteilung.
- en: X-is-finished prototype of a simple 2D mixing overlay for basic spatial audio.

Der Name dieses Programms ist ein Wortspiel aus "X-is-finished" und "Axis Mixer".

![xis_mixer](https://github.com/Chopstew/xis-mixer/assets/116070302/dd578172-1a3d-4f79-8a28-a27a453cb96c)

## Ziel

Das Hauptziel dieser Bedienungsoberfläche ist das schnelle Erstellen von Audiomixes im Onlinechor.
Angeboten werden jene Funktionalitäten, welche von Chorteilnehmenden bei der Befragung mit Audioprototypen
als wichtig empfunden wurden:
1. Lautstärke der einzelnen Stimmen
2. Panning von Links nach Rechts für jede Stimme
3. Hinzufügen und Entfernen eines künstlichen Halles, wobei ein komplettes Entfernen des Halls möglich sein muss.

Diese Parameter müssen für vier Chorregister und eine Begleitstimme eingestellt werden können. Entsprechend
können fünf Klangquellen (dargestellt als beschriftete, farbige Kreise) über Drag & Drop im Raum (dargestellt durch den Bildschirm) platziert werden. Unten in der Mitte
befindet sich eine vordefinierte Hörposition, dargestellt als Kopf.
Die Klangquellen befinden sich beim Öffnen alle links oben. Diese werden am besten im "Raum" platziert, bevor auf "Play/Pause" gedrückt wird.

Zur Wahrung des Copyrights der ursprünglich verwendeten Choraufnahmen wurden in der [Demo](https://xis-mixer.surge.sh/) für Bildungszwecke frei verfügbare Aufnahmen verwendet. Deren Quelle ist im Abschnitt "Quelle der Audiodateien im Deployment" aufgeführt.

## Funktionen
Für jede dargestellte Klangquelle können die oben beschriebenen Parameter einzeln angepasst werden.
Dies geschieht wie folgt:
- Die **Lautstärke der Klangquelle** wird anhand dem **euklidischen Abstand zur Hörposition** bestimmt. 
Diese wird stets relativ zur Bildschirmbreite der verwendenden Person berechnet, um die Anwendung flexibel
anwendbar zu halten.
- Das **Panning** wird durch den **Winkel der Klangquelle zur Hörposition** bestimmt. Dabei entspricht die
Blickrichtung des dargestellten Kopfes einem Winkel von 0°. Entsprechend ist eine Klangquelle bei dieser
Positionierung auf beiden Stereokanälen (Links und Rechts) gleich laut, also gerade von vorne, zu hören.
- Der **Hall** kann über einen einfachen **Schieberegler** beigemischt werden. Dabei wird mit zwei separaten
Audioeinspielungen gearbeitet, eine ohne Hall und eine ausschlesslich mit Hall. Bei der mit "0%" gekennzeichneten
Position ist keinerlei Hall im Audiosignal vorhanden, entsprechend ist nur die Einspielung ohne Hall zu hören.
Auf 100% sind beide Klangquellen gleich stark vertreten, wobei jede Klangquelle mit 50% der möglichen Lautstärke
abgespielt wird.

*Notiz: Der Hall ist bewusst stark gewählt, um dessen akustischen Effekt gut hörbar zu machen.*

## Demonstration
Eine Version der Bedienungsoberfläche ist [hier](https://xis-mixer.surge.sh/) verfügbar. Dabei wurden die Audiodateien ersetzt, um nicht gegen das Urheberrecht der Choraufnahmen zu verstossen. Die im Deployment verwendete Version ist im Branch "deployment" zu finden.

## Quelle der Audiodateien im Deployment
Das Copyright der verwendeten Audioaufnahmen liegt bei der Band Secretariat.
Die Audiodateien sind [hier](https://cambridge-mt.com/rs2/bkg/) verfügbar und können zu Bildungszwecken verwenet werden.<br>
**Readme**: Backing stem package created from the raw multitrack of Secretariat's 'Over The Top'. This file is provided for educational purposes only, and the material contained in it should not be used for any commercial purpose without the express permission of the copyright holders. Please refer to www.cambridge-mt.com for further details.

## Installation
1. Repository lokal klonen:
```shell
git clone https://github.com/Chopstew/xis-mixer.git
```
2. Neu erstellter Ordner öffnen
3. index.html mit einem Webbrowser öffnen → *Empfohlen wird Chrome*
4. Fertig!

## Anmerkungen zur Verwendung
- Die Bedienungsoberfläche wird idealerweise im **Vollbildmodus** des Browsers verwendet. Dieser kann über 
die Taste **F11** aktiviert werden. Nach der Aktivierung des Vollbildmodus sollte die Ansicht über Drücken
der **F5**-Taste neu geladen werden, da ansonsten Positionen falsch berechnet werden können.
- Bei Fehlern in der Wiedergabe empfielt sich ein neues Laden der Seite über die **F5**-Taste. → Die Positionen
der Klangquellen werden dadurch zurückgesetzt!

## Mögliche Probleme
### Audio spielt nicht ab
- Klangquellen in der Nähe der Hörposition platzieren
- Lautstärke des Wiedergabegeräts erhöhen
- Nach dem Drücken der Play/Pause-Taste etwas länger warten → Die Audiodateien müssen zuerst geladen werden, was ein paar Sekunden dauern kann.
- Seite über Drücken der F5-Taste neu laden, **1x** auf "Play/Pause" klicken, kurz abwarten.
- Konsole auf Fehlermeldungen überprüfen: Bei Fehlermeldungen aufgrund des CORS-Protokolls kann kein verlässlicher Lösungsansatz geboten werden, da es sich dabei um ein wichtiges Sicherheitsprotokoll des Webbrowsers handelt.

### Die Audiospuren sind nicht synchron, sondern zueinander verschoben
Die Wiedergabe der Audiodateien kann nicht verlässlich zum exakt gleichen Zeitpunkt gestartet werden. Aus diesem Grund empfiehlt sich ein erneutes Laden der Webseite durch Drücken der F5-Taste.

### Mögliche Lösung bei Fehlern aufgrund des CORS-Protokolls:
1. Ordner "xis-mixer" als Projekt in einer IDE öffnen (z.B. WebStorm)
2. xls-mixer.html über integrierte Vorschau-Funktion der IDE öffnen

CORS-Protokoll sollte dadurch umgangen werden, da viele IDEs für das Preview einen lokalen Server starten.
