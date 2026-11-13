#!/usr/bin/env python3
"""Baut aus den Arbeitsdateien je EINE HTML-Datei zum Teilen (Bilder, CSS und JS eingebettet).
Aufruf im Ordner:  python3 build_share.py      Ergebnis landet in "Zum Teilen/".
Die Online-Version wird danach mit  git add -A && git commit -m Update && git push  veroeffentlicht."""
import base64,mimetypes,os,re
here=os.path.dirname(os.path.abspath(__file__));out=os.path.join(here,'Zum Teilen');os.makedirs(out,exist_ok=True)
DECKS=['GPPN_Draft3_Long_Lux.html','GPPN_Draft_3_Lux.html','GPPN_VaniLong.html','GPPN_VaniShort.html']
ONLINE='GPPN_Draft3_Long_Lux.html'  # diese Datei wird als oeffentliche Seite veroeffentlicht
rd=lambda p,m='r':open(os.path.join(here,p),m,**({} if 'b' in m else {'encoding':'utf-8'})).read()
def data(m):
    p=m.group(1);mime=mimetypes.guess_type(p)[0] or 'application/octet-stream'
    return 'src="data:%s;base64,%s"'%(mime,base64.b64encode(rd(p,'rb')).decode())
for f in DECKS:
    h=rd(f)
    h=h.replace('<link rel="stylesheet" href="deck.css">','<style>\n'+rd('deck.css')+'</style>')
    js=rd('deck.js');assert '</script' not in js
    h=h.replace('<script src="deck.js"></script>','<script>\n'+js+'\n</script>')
    h=re.sub(r'src="(assets/[^"]+)"',data,h)
    h=h.replace('  Needs deck.css, deck.js and the assets/ folder next to this file.','  Single-file copy for sharing: images, CSS and JS are embedded. Edit the working file, then run build_share.py again.')
    assert 'src="assets/' not in h and 'deck.css"' not in h and 'src="deck.js"' not in h
    open(os.path.join(out,f),'w',encoding='utf-8').write(h);print('Zum Teilen/'+f,round(len(h)/1024),'KB')
    if f==ONLINE:  # index.html im Hauptordner = die Seite hinter dem oeffentlichen Link
        open(os.path.join(here,'index.html'),'w',encoding='utf-8').write(h.replace('<meta charset="UTF-8">','<meta charset="UTF-8">\n<meta name="robots" content="noindex">',1));print('index.html (Online-Version) aktualisiert')
