#!/usr/bin/env python3
"""Baut aus den Arbeitsdateien je EINE HTML-Datei zum Teilen (Bilder, CSS und JS eingebettet).
Aufruf im Hauptordner:  python3 build_share.py
Ergebnis: "Zum Teilen/<Name>.html" fuer jedes Deck und index.html (= die Seite hinter dem oeffentlichen Link).
Danach veroeffentlichen mit:  git add -A && git commit -m Update && git push"""
import base64,glob,mimetypes,os,re
here=os.path.dirname(os.path.abspath(__file__));out=os.path.join(here,'Zum Teilen');os.makedirs(out,exist_ok=True)
ONLINE='GPPN_Draft3_Long_Lux.html'  # diese Datei aus "Newest Version/" wird als oeffentliche Seite veroeffentlicht
DECKS=sorted(glob.glob(os.path.join(here,'Newest Version','*.html'))+glob.glob(os.path.join(here,'Alternatives','*.html')))
rd=lambda p,m='r':open(os.path.join(here,p),m,**({} if 'b' in m else {'encoding':'utf-8'})).read()
def data(m):
    p='Design/'+m.group(1);mime=mimetypes.guess_type(p)[0] or 'application/octet-stream'
    return 'src="data:%s;base64,%s"'%(mime,base64.b64encode(rd(p,'rb')).decode())
for path in DECKS:
    f=os.path.basename(path);h=rd(path)
    h=h.replace('<link rel="stylesheet" href="../Design/deck.css">','<style>\n'+rd('Design/deck.css')+'</style>')
    js=rd('Design/deck.js');assert '</script' not in js
    h=h.replace('<script src="../Design/deck.js"></script>','<script>\n'+js+'\n</script>')
    h=re.sub(r'src="\.\./Design/(assets/[^"]+)"',data,h)
    h=re.sub(r'  Needs the Design/ folder[^\n]*','  Single-file copy for sharing: images, CSS and JS are embedded. Edit the working file, then run build_share.py again.',h)
    assert '../Design/' not in h,f
    open(os.path.join(out,f),'w',encoding='utf-8').write(h);print('Zum Teilen/'+f,round(len(h)/1024),'KB')
    if f==ONLINE:
        open(os.path.join(here,'index.html'),'w',encoding='utf-8').write(h.replace('<meta charset="UTF-8">','<meta charset="UTF-8">\n<meta name="robots" content="noindex">',1));print('index.html (Online-Version) aktualisiert')
