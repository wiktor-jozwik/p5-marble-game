*&copy; Wiktor Jóźwik Politechnika Warszawska 2022*

# Marble Game

### Plansza do gry:

<img width="1194" alt="image" src="https://user-images.githubusercontent.com/25511662/174115944-1b221aa8-596a-4d3d-bb88-f21f2bcd1afd.png">


### Zasady gry:
- Dwóch graczy naprzemiennie strzela kulkami do celu. Im bliżej środka tym więcej punktów otrzymuje dany gracz. Punktacja poczynając od najbardziej zewnętrznego koła:
  -  6 pkt
  -  10 pkt
  -  12 pkt
  -  20 pkt
-  Każdy gracz ma 10 kulek, wygrywa ten, który po ostatnim uderzeniu posiada więcej punktów na liczniku.
-  Kulki z pewnym prawdopodobieństwem mogą być wylosowane jako naelektryzowane o pewnej wartości **q** (dodatniej), także losowej. Użytkownik wie, że kulka została naelektryzowana, gdyż jest ona oznaczona małą kropką w środku kulki, aczkolwiek nie wie jaka jest siła oddziaływania (może być ledwo odczuwalna).
-  Na planszy umieszczone są punkty oddziaływania magnetycznego, oznaczone małymi kropkami czerwonymi (dodatnie) i niebieskimi (ujemne), gdy poruszająca się kulka z ładunkiem **q** wpadnie w pole tego punktu zacznie być przyciągana lub odpychana, w zależności w jaki punkt wpadnie i jej tor ruchu zmieni się. Gracze nie wiedzą jak silne jest to oddziaływanie, ponieważ ono także jest losowane.
-  Namagnesowanych punktów jest 4 na planszy, pojawiają się one za każdym razem w innym miejscu - mniej więcej w środkowej części planszy.
-  Wszystkich naelektryzowanych kulek może być równocześnie 5 na planszy, bez względu, do którego gracza należą.
-  Kulki posiadają domyślną wartość tarcia, aczkolwiek ono także jest delikatnie losowane i zmieniane przy każdym rzuceniu kulki, aby urozmaicić rozgrywkę.
-  Kulki odbijają się zarówno od siebie jak i od band.


### Plansza po wyrzuceniu większości kulek:

<img width="1195" alt="image" src="https://user-images.githubusercontent.com/25511662/174116209-f9bf6443-3bcd-4e0b-9779-168178251568.png">

### Plansza po wyrzuceniu wszystkich kulek i zakończeniu rozgrywki:

<img width="1195" alt="image" src="https://user-images.githubusercontent.com/25511662/173401102-0531500d-165f-48f0-97bd-1ad5c6128cfc.png">

Grę w każdym momencie można zresetować poprzez przycisk **Reset** na górze planszy:

<img width="1195" alt="image" src="https://user-images.githubusercontent.com/25511662/174116350-d70906de-38bb-473b-b5ec-268fbef19e78.png">


### Aby uruchomić grę należy

- uruchomić serwer na konkretnym porcie np. Live Server w Visual Studio Code będąc w folderze z projektem
- przejść pod adres http://127.0.0.1:{port} np. http://127.0.0.1:5500
- przejść do widniejącego folderu *marble-game*
