# Homo post Machina · GPPN 2027 Pitch

Arbeitsordner für den Pitch (privat).

- `GPPN_Draft3_Long_Lux.html`, `GPPN_Draft_3_Lux.html`, `GPPN_VaniLong.html`, `GPPN_VaniShort.html`: Arbeitsdateien. Sie brauchen `deck.css`, `deck.js` und `assets/` neben sich.
- `Zum Teilen/`: je eine Einzeldatei mit eingebetteten Bildern, zum Verschicken.
- `Online-Version/`: eigenes, öffentliches Git-Repo mit der gehosteten Präsentation (nur `index.html`).
- `Old Drafts/`: frühere Entwürfe.

Nach Änderungen an einer Arbeitsdatei:

```bash
python3 build_share.py
cd Online-Version && git commit -am "Update" && git push
```
