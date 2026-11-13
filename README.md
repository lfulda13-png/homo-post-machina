# Homo post Machina · GPPN 2027 Pitch

Arbeitsordner für den Pitch. Präsentation online: https://lfulda13-png.github.io/homo-post-machina/

- `GPPN_Draft3_Long_Lux.html`, `GPPN_Draft_3_Lux.html`, `GPPN_VaniLong.html`, `GPPN_VaniShort.html`: Arbeitsdateien. Sie brauchen `deck.css`, `deck.js` und `assets/` neben sich.
- `Zum Teilen/`: je eine Einzeldatei mit eingebetteten Bildern, zum Verschicken.
- `index.html`: die gehostete Präsentation hinter dem Link (Einzeldatei, wird aus `GPPN_Draft3_Long_Lux.html` erzeugt).
- `Old Drafts/`: frühere Entwürfe.

Nach Änderungen an einer Arbeitsdatei:

```bash
python3 build_share.py
git add -A && git commit -m "Update" && git push
```
