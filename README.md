# Homo post Machina · GPPN 2027 Pitch

Präsentation online: https://lfulda13-png.github.io/homo-post-machina/

| Ordner | Inhalt |
|---|---|
| `Newest Version/` | aktuelle Präsentation (`GPPN_Draft3_Long_Lux.html`), hier wird gearbeitet |
| `Alternatives/` | andere Fassungen (kurze Lux-Version, VaniLong, VaniShort) und `Old Drafts/` |
| `ToR Material/` | Aufgabenstellung (Call for Proposals) und unser Proposal |
| `Zum Teilen/` | jede Fassung als Einzeldatei mit eingebetteten Bildern, zum Verschicken |
| `Design/` | gemeinsames Aussehen und Technik aller Fassungen (`deck.css`, `deck.js`, Bilder in `assets/`) |

`index.html` ist die gehostete Präsentation hinter dem Link. Sie und `Zum Teilen/` werden erzeugt, also nicht von Hand bearbeiten.

## Nach Änderungen

```bash
python3 build_share.py
git add -A && git commit -m "Update" && git push
```

Tasten in der Präsentation: → weiter · ← zurück · N Sprechernotizen · T Timer · F Vollbild
