/* Shared by homo-post-machina-full.html and homo-post-machina-short.html */
/* ---------- helpers ---------- */
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n)),mix=(a,b,t)=>a+(b-a)*t,sm=t=>{t=clamp(t);return t*t*(3-2*t)},ease=t=>{t=clamp(t);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2},TAU=Math.PI*2;

/* ---------- map data: hand-simplified outlines (lon,lat), rasterised into dots ---------- */
const LAND=[
[-168,65.5,-162,70,-156,71.3,-141,69.7,-128,70,-115,68.5,-108,68,-96,68.5,-94,72,-85,69.5,-81,68.5,-82,66,-87,64.5,-93,61.5,-94.5,58.7,-92.5,57,-85,55.3,-82,53,-80,51.3,-79,54.5,-77,57.5,-78,62.3,-73,62,-69.5,59,-65,60.3,-61.5,56.5,-56,52.5,-59,50.5,-66,50.2,-65,48.5,-64.5,47,-61,46,-61,45.3,-66,43.6,-70,43.7,-70,41.7,-74,40.5,-75.8,37.5,-76,35,-81,31.5,-80,26.5,-80.5,25.2,-82,26.5,-82.7,28.5,-84,30,-89,30.2,-94,29.5,-97.3,27.5,-97.7,22.5,-96,19,-94.5,18.3,-91,18.8,-90.4,21,-87,21.5,-87.6,18.3,-88.8,15.9,-83.5,15.3,-83.5,11,-82,9,-79.5,9.6,-77.3,8.7,-77.9,7.2,-80.5,7.3,-83,8.3,-85.7,10,-87.5,13,-91.5,14,-94.5,16.2,-97,15.8,-102,18,-105.5,20.2,-106,23.2,-109.4,26.5,-112.5,29.5,-114.7,31.6,-114.5,30,-112.5,27,-110,23.2,-112,24.8,-115,28.5,-117,32.5,-120.6,34.6,-122.5,37.7,-124.3,40.4,-124,46.5,-123,48.3,-125,50,-128,52.5,-130.5,54.8,-134,58,-138,59.5,-145,60.3,-151.5,59.3,-154,57.5,-158,56.5,-163,54.8,-158,58.6,-162,59.8,-165.5,61.5,-164.5,63.2,-161,64.5,-166.5,64.6],
[-73,78.2,-60,82,-33,83.5,-20,81,-18,76,-22,70.5,-32,68.2,-41,65,-43.5,60,-48.5,61,-52,64.5,-54,69,-58,75.5,-68,76.2],
[-80,73.7,-72,71.5,-62,66.5,-65,62,-73,64.5,-78,66,-73,68,-85,70,-89,73],[-117,71.5,-108,73,-102,71,-105,69,-115,69.3],[-92,81,-62,82.5,-70,79,-80,76.3,-90,76.5],
[-59.3,47.7,-55.5,51.5,-52.7,47.5,-56,46.8],[-85,22,-80,23.2,-74.2,20.2,-77.7,19.9,-82,21.5],[-74.4,18.4,-72.8,19.9,-68.4,18.6,-71,17.7],
[-77.3,8.7,-75.3,10.8,-71.5,12.4,-70,11.5,-68,10.5,-64,10.6,-61.8,10.7,-60,8.5,-57,6,-52,4.8,-50,1.5,-50,-.2,-44.5,-2.5,-40,-2.9,-37,-4.8,-35,-6.5,-35,-9,-38.7,-13,-39,-17.5,-41,-22,-44.5,-23.2,-48.5,-26,-48.7,-28.5,-52,-32.5,-54,-34.7,-57,-34.5,-58.4,-34,-57,-36.3,-57.6,-38.2,-62,-39,-65,-41,-63.7,-42.8,-65.5,-45,-67.5,-46.3,-66,-48,-69,-51,-68.4,-52.4,-65.2,-54.8,-67,-55.3,-71,-54,-74.5,-52,-75.5,-47,-73.5,-42,-73.6,-37.5,-71.5,-33,-71.4,-28.5,-70.3,-23.5,-70.3,-18.3,-75.5,-14.5,-77.2,-12,-79.5,-7.5,-81.3,-5.5,-80,-2.5,-80.9,-1,-80,.8,-78.8,1.5,-77.5,4.2,-77.4,7],
[-5.9,35.8,-2,35.1,3,36.9,10,37.3,11,35,10.2,33.8,15.3,32.3,19.5,30.3,20,32.6,25,31.7,31,31.5,32.3,31.2,32.5,29.9,34.2,27,35.6,24,37.2,21,37.4,18.7,39.5,15.5,42.8,12.8,43.3,11.5,44.5,10.4,51.2,11.9,50.8,9.5,48,4.5,44.5,1.5,41.6,-1.7,40.2,-2.8,39.2,-4.7,38.8,-6.5,39.5,-8,40.5,-10.5,40.6,-15,36.9,-17.9,34.8,-19.9,35.5,-23.5,32.9,-25.9,32.9,-28,30.9,-30,28,-33,25.7,-34,20,-34.8,18.4,-34.3,18.2,-32,15.2,-27,14.5,-22.5,11.8,-17.5,13.7,-11.5,12.2,-6,11.8,-4.5,9,-.7,9.5,1.2,9.7,3.8,8.5,4.5,6,4.3,4.5,6.3,1,5.9,-2,4.9,-4.5,5.2,-7.5,4.4,-9.3,5.5,-11.5,6.9,-13.3,8.6,-15,10.9,-16.8,12.5,-17.5,14.7,-16.5,16.3,-16.2,19,-17,21,-14.9,24.5,-13.2,27.7,-10,29.7,-9.7,31.5,-6.8,34],
[49.3,-12.2,50.4,-15.5,47.8,-24.5,45,-25.4,43.5,-22.5,44.3,-17.5,47.5,-15],
[-9,37,-9.4,38.8,-8.8,41.8,-9.2,43.1,-8,43.7,-3.8,43.5,-1.8,43.4,-1.2,45.8,-2.2,47.2,-4.7,48.2,-3,48.8,-1.6,48.7,-1.8,49.7,-1.2,49.4,.2,49.6,1.6,50.7,3.5,51.4,4.7,53,6.9,53.4,8.6,53.9,8.2,55.5,8.1,57.1,10.6,57.7,10.5,56.4,9.8,55,10.9,54,11.9,54.2,14.2,53.9,18.5,54.8,19.8,54.4,21,55.3,21,57,22.6,57.7,24.3,57.2,24.4,58.4,23.4,59.2,28,59.5,30.2,60,28.7,60.6,25,60.2,22.9,59.9,21.3,60.8,21.5,63,25.3,65.2,24.2,65.8,22.2,65.6,21.5,64.3,17.9,62.5,17.2,60.7,18.9,60,18,58.8,16.5,57,16,56.2,14.3,55.5,12.9,55.4,12.7,56.2,11.2,58.9,10.5,59.5,8,58.1,5.5,58.8,5,61,6,62.6,8.5,63.6,11.5,64.9,13,66.5,14.5,68.2,18,69.6,22,70.5,25.7,71.1,28.5,70.9,31,70.3,30,69.6,33,69.4,41,67.7,41,66.3,38,66.1,33.5,66.7,34.8,64.5,37.5,63.8,40,64.6,40.5,65.8,44,66.2,43.5,68.5,46,68.2,54,68.3,60,68.8,67,69,69,73,80,73.5,87,75.3,98,76.3,104.3,77.7,113,76,113.5,73.8,127,73.5,130,71,140,72.5,150,71.5,160,69.7,170,70,180,68.8,180,65,177.5,62.5,170.5,60,163.5,59.9,162,58,163,56,162,54.8,156.7,51,155.7,56.7,160.5,61.8,156.5,61.5,151.5,59.2,143,59.3,135.2,54.8,140.5,54,141.3,52.2,140.5,48.5,135.5,44,131.5,43,129.8,41.5,127.5,39.8,129.4,37,129.3,35.3,126.5,34.4,126.5,37.5,125,38,124.3,39.9,122.2,40.4,121.3,38.9,118,39.2,119,37.3,122.5,37.2,120,35.8,119.4,34.8,121.8,31.3,121.9,29.8,120,26.5,117,23.6,114,22.3,110.3,21.3,109.5,21.6,106.8,20.7,105.8,18.8,108.9,15.3,109.3,12,107,10.5,105,8.7,105,10.2,103.5,10.6,102.5,12.2,100.9,13.4,99.9,11.5,99.3,9.2,100.5,7.2,102.1,6.2,103.4,4.5,104.2,1.4,103.4,1.4,101.3,2.8,100.3,5.8,98.3,8,98.5,10.5,97.7,14.5,97.6,16.5,95.5,15.9,94.3,16.2,94.2,18.8,92.3,20.8,91.8,22.5,90.4,22.2,88.8,21.7,87,21.3,86.4,20,85,19.4,82.3,16.6,80.2,15.5,80.2,13.3,79.8,10.3,79,9.2,77.6,8.1,76.5,9,75.2,12,74,15,72.8,19.2,72.7,21.2,70.9,20.8,69,22.3,68.8,23.2,67.4,24.5,66.5,25.4,61.6,25.2,57.5,25.7,56.6,27.1,54.5,26.6,51.5,27.8,50.2,30,48.9,30.2,48,29.6,48.5,28.4,50.2,26.5,50.8,24.8,51.6,24.2,54,24.2,56.2,26.2,56.5,24.4,59.8,22.5,58.5,20.4,57.8,18.9,55,17,52.2,15.6,48.7,14,45,12.8,43.5,12.7,42.7,16.5,40.8,19.8,39.2,21.5,37.2,24.5,35,28.1,34.9,29.5,34.2,27.8,32.6,29.9,32.3,31.2,34.3,31.3,35,32.8,35.9,35.2,36.2,36.6,34.6,36.8,32.5,36.1,30.6,36.8,29.3,36.2,27.4,37,26.3,38.3,26.8,39.5,26.2,40,29,41,31.5,41.2,35,42,38,41,41.5,41.5,41.5,42.8,39.5,43.6,37,45,38.3,46.2,39.3,47.1,35.2,46.2,35,45.4,36.5,45.2,35.5,44.6,33.5,44.4,32.6,45.4,33.5,46.1,31.5,46.6,30.2,45.8,29.7,45.2,28.7,44,28,42.5,28.2,41.5,28.9,41.05,27.5,40.9,26.3,40.3,26,40.8,24,40.8,23.9,39.9,22.8,40.4,22.8,39.2,24,38,23.2,37.3,23.1,36.5,22.4,36.5,21.7,36.8,21.2,38.2,20.1,39.6,19.4,40.4,19.5,41.8,18.5,42.5,16,43.5,15,44.7,14.3,45.3,13.6,45.6,12.3,45.3,12.5,44.2,13.6,43.5,14.3,42.3,16,41.9,18.5,40.2,18.2,39.9,17,40.5,16.6,39.7,17.1,39,16.5,38.4,15.7,37.95,16,38.8,15.6,40,14.4,40.7,12.3,41.7,11,42.5,10.3,43.5,8.8,44.4,7.5,43.8,6,43.1,4.5,43.4,3.1,43.1,3.2,41.9,.8,40.9,-.3,39.4,.2,38.7,-.6,37.7,-2,36.8,-4.5,36.7,-5.6,36,-6.3,36.6,-7.4,37.2],
[-5.7,50.1,-3,50.7,1.4,51.2,1.7,52.7,.3,53,-.2,54.2,-1.6,55.6,-3.2,56,-1.8,57.6,-4,57.7,-3.1,58.6,-5,58.6,-6.2,57,-5.5,55.4,-4.8,54.8,-3.2,54.9,-3,53.5,-4.5,53.3,-4.3,52.3,-5.2,51.8,-3.2,51.4,-4.5,51.1],
[-10,51.6,-6.2,52.2,-6,53.5,-5.5,54.5,-6.2,55.2,-8.2,55.2,-10,54.2,-9.5,53],[-24,65.5,-22,66.4,-16,66.5,-13.6,65,-18.5,63.4,-22.5,63.9],
[12.4,38,15.6,38.3,15.1,36.7,12.5,37.6],[8.2,41.2,9.7,41,9.6,39.1,8.4,39],[8.6,42.9,9.5,43,9.4,41.4,8.7,41.6],[23.5,35.6,26.3,35.3,26.2,34.95,23.5,35.2],[32.3,35.1,34.5,35.6,33.9,34.9,32.5,34.7],
[51.5,71,56.5,71,68,76.5,60,76,54,73.5],
[129.8,33.2,130.5,31.2,131.8,32.8,132.5,34.3,135.2,33.5,136.9,34.5,139,35,140.9,35.7,141.9,39.5,141.3,41.4,140,40.6,139.5,38,136.8,37.2,136,35.7,132.5,35.5,131,34.4],[140,41.6,141.5,45.4,145.3,43.5,143,42,141,42.5],[142,46,143.5,49.5,142.5,54.3,142,50],
[120.2,23,121.5,25.2,121.9,24.5,120.9,22],[108.7,19.3,110.8,20,110.5,18.3,109,18.3],[79.8,8.5,80.2,9.8,81.8,7.5,81,6.2,80,6.1],
[119.9,16.3,120.6,18.5,122.2,18.5,122.2,16.2,121.6,14.9,123.9,13.8,124.1,12.6,122.7,13.2,121,13.7,120.6,14.5],[122,11.8,125.3,12.5,125.7,11,124.9,10,123.2,9.1,122.4,10.5],[122,7,123.5,8.6,125.5,9.7,126.5,7.5,125.6,5.7,124,6.5],[117.2,8.4,119.5,11.3,119.7,10.5,117.8,8.5],
[109.2,1.8,113,3.3,115.5,5.5,117,7,119,5.2,117.8,3.5,118.8,1,117.5,-.8,116.2,-3.8,114.5,-3.5,111.5,-3.2,110,-1.5,109,.3],[95.3,5.6,97.8,5.2,100.5,2.2,103.6,-1,106,-3,105.8,-5.8,104.3,-5.6,102,-3.8,100.3,-.8,98.5,1.8],[105.2,-6.7,108.6,-6.5,110.8,-6.4,114.5,-7.6,114.4,-8.6,108,-7.8,105.5,-7],
[119.5,-5.5,120.5,-2.8,119.8,.8,121,1.3,125,1.6,123,.4,121,.4,121.5,-1,123.3,-.9,121.7,-2,122.8,-4.8,121.5,-4.6,120.6,-5.6],
[131,-.8,134,-.8,135,-3.3,138,-1.6,141,-2.6,145,-4.3,147.8,-6,150.5,-10.5,147.5,-10,144.5,-7.7,142.5,-9.2,138.5,-8.2,137.7,-5.2,134,-3.9,132.8,-3,131.2,-1.3],
[114,-22,113.5,-26,115.7,-31.5,115,-34.3,118,-35,123.5,-33.9,129,-31.6,131.5,-31.5,134.5,-33,135.8,-34.8,137.8,-32.6,138,-35.6,140.5,-38,143.5,-38.8,146.3,-39,149.9,-37.5,151.3,-33.8,153.5,-28.2,153,-25.5,149.5,-22.3,146.2,-19,145.4,-15,143.5,-14.2,142.5,-10.7,141.6,-13,140.9,-17.5,139,-17.5,135.5,-15,136.8,-12.2,132.5,-11.5,130.5,-12.5,129.5,-15,127,-14,125,-15.5,122.2,-17.2,121.5,-19.5,117,-20.7],
[144.7,-40.8,148.3,-40.9,148,-43.3,146,-43.6,145.3,-42.3],[172.7,-34.5,175.5,-36.5,178.5,-37.7,177,-39.5,175.3,-41.6,174.7,-39.3,173.8,-39.2],[172.7,-40.5,174.3,-41.8,173,-43.2,170.5,-46,168.3,-46.6,166.5,-45.8,168.5,-44,171,-42.3]
];
const LAKES=[[47,45,51,47,53,46.5,53,42,54,37,50,37,49,41,47.3,43.2],[31.8,-.6,32.8,.3,34,.3,34.1,-.3,34,-1.5,33.4,-2.6,32,-2.6,31.7,-1.5]];
const KENYA=[34,4.2,35.9,4.6,36.1,4.45,38.1,3.6,39.5,3.4,40.8,4.2,41.9,3.95,41,2.8,41,-.85,41.56,-1.67,40.9,-2.3,40.2,-2.9,39.67,-4.05,39.2,-4.68,37.75,-3.55,37.6,-3,34.05,-1.05,33.9,.1,34.5,1.1,35,1.7,34.45,3.2];
const VEN=[-60,8.6,-61.3,6,-60.7,5.2,-62.7,3.7,-64.6,4.1,-63.5,2.2,-65.5,.7,-67.1,1.2,-67.4,2.2,-67.8,4.3,-67.5,6.2,-70,7,-72,7.1,-72.5,8.4,-73.3,9.2,-72.5,11.2,-71.3,12.6,-68,11.2,-64,11.2,-61.5,11];
const IND=[68.2,23.6,71,24.5,69.7,27,73,29.8,74.5,32.7,74,34.6,77.8,35.4,79,32.5,81,30.2,80.2,28.8,84,27.4,88.1,26.4,88.2,27.9,89,26.9,92,26.9,92.2,27.8,97,28.3,97.1,27.1,95.2,26,94.5,24.6,93.3,24,93.2,22.2,92.3,23.2,91.3,23.2,92.2,25,89.9,25.3,89.8,26,88.3,25.9,88.2,25,88.9,23.2,89,21.5,87,20.6,86.5,19.6,84.5,18.3,82.5,16.1,80.6,15.2,80.6,13.2,80.1,10,79.3,8.8,77.6,7.7,76.2,9,74.6,12.5,73.1,16.5,72.4,19.2,72.3,21.3,70.6,20.4,68.6,22.3];
const EU_MAIN=[-10,36,-5.6,36,-2,36.2,3,38,9,38.3,11.5,37.45,12.5,36.3,15,35.5,23.4,34.6,26.5,34.7,28.6,36,27.2,37.2,26.7,39,26,40,26.1,40.7,26.6,41.3,26.4,41.75,28,42,29,43.5,29.9,45.2,28.2,45.5,28.1,46.9,26.6,48.25,24.9,47.75,22.9,48,22.2,48.4,22.6,49.1,24.1,50.8,23.6,51.6,23.9,52.7,23.6,53.9,25.7,54.3,26.7,55.5,28.2,56.2,27.5,57.5,28.1,59.5,27.8,60.5,29.5,61.4,31.5,62.9,30.5,64.1,29.7,64.8,30.1,65.7,29.2,66.8,30,67.7,28.5,68.3,28.9,69.05,29.2,69.6,28,70.05,26.5,69.9,25.8,69,24.9,68.6,23.7,68.75,22,68.9,20.5,69.05,18.2,68.5,16.5,68,14.5,66.1,13.5,64.3,12.2,63,12.6,61.5,12.2,60.2,11.4,59,10.5,58.3,7.5,57.6,7.5,55.5,4,53.9,2.6,51.6,1.6,51.05,-2,49.95,-5.5,48.9,-10,48];
const EU_IE=[-10.7,51.3,-6,51.9,-6,54,-7.3,54.1,-8.2,54.5,-7.2,55.4,-10.5,54.5],EU_CY=[32.2,34.5,34.7,34.5,34.7,35.8,32.2,35.8];
const EU_EX=[[15.8,45.2,19.1,44.9,18.9,45.9,20.3,46.1,21.4,44.8,22.7,44.2,22.4,42.3,22.9,41.3,21,40.85,20.2,39.7,19.2,40.3,19.3,41.9,18.4,42.5,17.5,43.2,16.2,44.2],[6.1,46.2,7,45.9,9,46,10.4,46.6,9.6,47.5,8.5,47.7,7,47.4],[19.8,54.45,22.8,54.4,22.6,55.1,21,55.3,20,55]];
function pip(p,x,y){let c=false;for(let i=0,j=p.length-2;i<p.length;j=i,i+=2){const xi=p[i],yi=p[i+1],xj=p[j],yj=p[j+1];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)c=!c}return c}
const any=(a,x,y)=>a.some(p=>pip(p,x,y));
function tagOf(x,y){ // -1 sea · 0 land · 1 Kenya · 2 Venezuela · 3 India · 4 Philippines · 5 EU
 if(pip(KENYA,x,y))return 1;
 if(!any(LAND,x,y)||any(LAKES,x,y))return -1;
 if(pip(VEN,x,y))return 2;if(pip(IND,x,y))return 3;
 if(x>116&&x<127.5&&y>4.5&&y<19.5)return 4;
 if((pip(EU_MAIN,x,y)||pip(EU_IE,x,y)||pip(EU_CY,x,y))&&!any(EU_EX,x,y))return 5;
 return 0}
const BOX1={x0:-30,x1:66,y0:20,y1:78},BOX2={x0:26,x1:52,y0:-12,y1:14};
const inB=(b,x,y)=>x>=b.x0&&x<=b.x1&&y>=b.y0&&y<=b.y1;
function layer(x0,x1,dx,y0,y1,dy,zone){const b={};for(let y=y0;y<=y1+1e-6;y+=dy)for(let x=x0;x<=x1+1e-6;x+=dx){const t=tagOf(x,y);if(t<0)continue;const z=zone?(inB(BOX1,x,y)?1:inB(BOX2,x,y)?2:0):0,k=t+'_'+z;(b[k]||(b[k]={t,z,p:[]})).p.push(x,y)}return Object.values(b)}
const LA=layer(-178.8,180,2.4,-55,77,2,true),LB=layer(BOX1.x0,BOX1.x1,1.5,BOX1.y0,BOX1.y1,1),LC=layer(BOX2.x0,BOX2.x1,.5,BOX2.y0,BOX2.y1,.5);
const NAIROBI=[36.82,-1.29],BRUSSELS=[4.35,50.85];
const HUBS=[{n:'KENYA',p:[37.9,.6]},{n:'VENEZUELA',p:[-66,7.5]},{n:'INDIA',p:[79,22]},{n:'PHILIPPINES',p:[122,12.5]}];

/* ---------- camera ---------- */
const POSES={
 title:{lon:25,lat:22,s:6.2,kx:.82,fx:1265,fy:450},
 hubs:{lon:12,lat:18,s:5.5,kx:.82,fx:800,fy:520},
 kenya:{lon:37.9,lat:.2,s:52,kx:1,fx:1170,fy:450},
 eu:{lon:11,lat:53,s:18.5,kx:.62,fx:1170,fy:440},
 hubs2:{lon:12,lat:18,s:5.5,kx:.82,fx:800,fy:465},
 market:{lon:12,lat:18,s:5.5,kx:.82,fx:800,fy:345},
 spread:{lon:12,lat:18,s:5.5,kx:.82,fx:800,fy:560}
};
const cv=document.getElementById('map'),ctx=cv.getContext('2d'),stage=document.getElementById('stage'),paper=document.getElementById('paper');
let W,H,K,OX,OY,DPR,cam={...POSES.title},fly=null,paperF=0;
function setPaper(f){paperF=f;paper.style.width=(f>=1?W:f>0?OX+f*1600*K:0)+'px';paper.classList.toggle('in',f>0&&f<1)}
function resize(){DPR=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*DPR;cv.height=H*DPR;K=Math.min(W/1600,H/900);OX=(W-1600*K)/2;OY=(H-900*K)/2;stage.style.transform=`translate(${OX}px,${OY}px) scale(${K})`;setPaper(paperF)}
addEventListener('resize',resize);resize();
function flyTo(name){const to=POSES[name]||POSES.hubs,from={...cam};
 const same=['lon','lat','s','kx','fx','fy'].every(k=>Math.abs(from[k]-to[k])<1e-3);if(same){fly=null;return 0}
 const far=Math.hypot(from.lon-to.lon,from.lat-to.lat),zoomed=Math.min(from.s,to.s)>14;
 const dur=clamp(900+Math.abs(Math.log(to.s/from.s))*520+far*9,1000,2300);
 fly={from,to,t0:performance.now(),dur,bump:zoomed&&far>25?.45:0};return dur}
const MODES=['title','hubs','kenya','link','eu','spread'],mw={},mt={},since={};MODES.forEach(m=>{mw[m]=0;mt[m]=0;since[m]=0});
function setMode(m){MODES.forEach(k=>{const v=k===m?1:0;if(v&&!mt[k])since[k]=performance.now();mt[k]=v})}

/* ---------- drawing ---------- */
const RED='238,47,74',GOLD='255,204,51',LANDC='rgb(170,164,158)';
let S,FX,FY,last=performance.now(),now=last;
const PX=(lon,lat)=>[FX+(lon-cam.lon)*S*cam.kx,FY-(lat-cam.lat)*S];
function dots(p,r){ctx.beginPath();const kx=S*cam.kx;for(let i=0;i<p.length;i+=2){const x=FX+(p[i]-cam.lon)*kx,y=FY-(p[i+1]-cam.lat)*S;if(x<-9||y<-9||x>W+9||y>H+9)continue;ctx.moveTo(x+r,y);ctx.arc(x,y,r,0,TAU)}ctx.fill()}
function hl(t){ // highlight colour + weight per tag: red = where the work is done, gold = the EU and what its standard reaches
 const hub=t>=1&&t<=4,hot=hub?Math.max(mw.hubs,mw.link,mw.title*.85,t===1?mw.kenya:0):0,fair=hub?mw.spread:0,eu=t===5?Math.max(mw.eu,mw.spread,mw.link,mw.title*.85):0;
 if(eu>.01)return[GOLD,eu];if(fair>hot)return[GOLD,fair];return[RED,hot]}
function drawLayer(L,r,af){for(const b of L){const a=af(b.z);if(a<=.01)continue;const[c,w]=hl(b.t);
 ctx.globalAlpha=a*.4*(1-w);ctx.fillStyle=LANDC;dots(b.p,r);
 if(w>.01){ctx.globalAlpha=a*w;ctx.fillStyle=`rgb(${c})`;dots(b.p,r)}}}
function rings(x,y,c,a,max,n=2,speed=2600){ctx.lineWidth=1.6*K;ctx.strokeStyle=`rgb(${c})`;for(let i=0;i<n;i++){const p=((now/speed)+i/n)%1;ctx.globalAlpha=a*(1-p)*.75;ctx.beginPath();ctx.arc(x,y,p*max,0,TAU);ctx.stroke()}}
function pin(x,y,c,a){ctx.globalAlpha=a;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y,3.6*K,0,TAU);ctx.fill();ctx.strokeStyle=`rgb(${c})`;ctx.lineWidth=2*K;ctx.beginPath();ctx.arc(x,y,8*K,0,TAU);ctx.stroke()}
function label(x,y,t,c,a,size=15,align='left'){ctx.globalAlpha=a;ctx.font=`800 ${size*K}px Manrope,system-ui,sans-serif`;if('letterSpacing'in ctx)ctx.letterSpacing=(size*.14*K)+'px';ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillStyle='rgba(4,11,28,.88)';const w=ctx.measureText(t).width,pad=7*K,x0=align==='left'?x-pad:align==='center'?x-w/2-pad:x-w-pad;ctx.fillRect(x0,y-size*K*.85,w+pad*2,size*K*1.7);ctx.fillStyle=c==='w'?'#fff':`rgb(${c})`;ctx.fillText(t,x,y)}
function arc(A,B,c,a,prog,bend=.24,width=2){const mx=(A[0]+B[0])/2,my=(A[1]+B[1])/2;let nx=-(B[1]-A[1]),ny=B[0]-A[0];if(ny>0){nx=-nx;ny=-ny}const cx=mx+nx*bend,cy=my+ny*bend,pt=t=>[(1-t)*(1-t)*A[0]+2*(1-t)*t*cx+t*t*B[0],(1-t)*(1-t)*A[1]+2*(1-t)*t*cy+t*t*B[1]];
 ctx.globalAlpha=a*.85;ctx.strokeStyle=`rgb(${c})`;ctx.lineWidth=width*K;ctx.setLineDash([7*K,6*K]);ctx.lineDashOffset=-now/45;ctx.beginPath();const n=48,m=Math.floor(n*clamp(prog));for(let i=0;i<=m;i++){const q=pt(i/n);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])}ctx.stroke();ctx.setLineDash([]);
 if(prog>=1){const q=pt((now/2200)%1);ctx.globalAlpha=a;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(q[0],q[1],3.2*K,0,TAU);ctx.fill()}}
function outline(p,c,a){ctx.globalAlpha=a;ctx.strokeStyle=`rgb(${c})`;ctx.lineWidth=2*K;ctx.lineJoin='round';ctx.shadowColor=`rgb(${c})`;ctx.shadowBlur=18*K;ctx.beginPath();for(let i=0;i<p.length;i+=2){const q=PX(p[i],p[i+1]);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])}ctx.closePath();ctx.stroke();ctx.shadowBlur=0}
function frame(t){now=t;const dt=Math.min(64,t-last);last=t;
 if(fly){const u=clamp((t-fly.t0)/fly.dur),e=ease(u),f=fly.from,g=fly.to;cam.lon=mix(f.lon,g.lon,e);cam.lat=mix(f.lat,g.lat,e);cam.kx=mix(f.kx,g.kx,e);cam.fx=mix(f.fx,g.fx,e);cam.fy=mix(f.fy,g.fy,e);cam.s=Math.exp(mix(Math.log(f.s),Math.log(g.s),e))*(1-fly.bump*Math.sin(Math.PI*e));if(u>=1)fly=null}
 const kf=1-Math.exp(-dt/380);MODES.forEach(m=>mw[m]+=(mt[m]-mw[m])*kf);
 S=cam.s*K;FX=OX+cam.fx*K;FY=OY+cam.fy*K;
 ctx.setTransform(DPR,0,0,DPR,0,0);ctx.clearRect(0,0,W,H);
 const a1=sm((S-7.5)/4),a2=sm((.5*S-7.5)/4);
 const rad=st=>clamp(st*S*.21,1.1*K,5*K),rAB=mix(rad(2),rad(1),a1);
 drawLayer(LA,rAB,z=>z===1?1-a1:z===2?1-a2:1);if(a1>.01)drawLayer(LB,rAB,()=>a1);if(a2>.01)drawLayer(LC,rad(.5),()=>a2);
 const nb=PX(...NAIROBI),br=PX(...BRUSSELS);
 if(mw.hubs>.01)HUBS.forEach((h,i)=>{const q=PX(...h.p);rings(q[0],q[1],RED,mw.hubs,46*K,2,2400+i*150);label(q[0]+22*K,q[1]-20*K,h.n,'w',mw.hubs)});
 if(mw.kenya>.01){outline(KENYA,RED,mw.kenya);pin(nb[0],nb[1],RED,mw.kenya);rings(nb[0],nb[1],RED,mw.kenya,34*K);label(nb[0]+18*K,nb[1]+2*K,'NAIROBI','w',mw.kenya);const top=PX(37.9,5.6);label(top[0],top[1],'KENYA','w',mw.kenya*.9,19,'center')}
 if(mw.link>.01){let all=true;HUBS.forEach((h,i)=>{const q=PX(...h.p),pr=clamp((t-since.link-700-i*260)/1500);if(pr<1)all=false;rings(q[0],q[1],RED,mw.link,30*K);arc(q,br,GOLD,mw.link,pr,.22,2.2);label(q[0]+22*K,q[1]+22*K,h.n,'w',mw.link*.9,13)});
  if(all||t-since.link>2200){pin(br[0],br[1],GOLD,mw.link);rings(br[0],br[1],GOLD,mw.link,60*K,2,3000);label(br[0]+18*K,br[1]-16*K,'EUROPEAN UNION',GOLD,mw.link,17)}}
 if(mw.eu>.01){pin(br[0],br[1],GOLD,mw.eu);rings(br[0],br[1],GOLD,mw.eu,150*K,3,3600);label(br[0]+18*K,br[1]-2*K,'BRUSSELS',GOLD,mw.eu)}
 if(mw.spread>.01){rings(br[0],br[1],GOLD,mw.spread,640*K,4,5200);pin(br[0],br[1],GOLD,mw.spread);HUBS.forEach((h,i)=>{const q=PX(...h.p),pr=clamp((t-since.spread-700-i*320)/1500);arc(br,q,GOLD,mw.spread,pr,.22,2);if(pr>=1){rings(q[0],q[1],GOLD,mw.spread,34*K);label(q[0]+16*K,q[1]+22*K,h.n,'w',mw.spread,14)}})}
 ctx.globalAlpha=1;requestAnimationFrame(frame)}
requestAnimationFrame(frame);

/* ---------- deck ---------- */
const slides=[...document.querySelectorAll('.slide')],dotsEl=document.getElementById('dots'),countEl=document.getElementById('count'),bar=document.getElementById('bar');
let cur=-1,at=0,timerOn=false,t0=0,pending=0;
const stepsOf=s=>+(s.dataset.steps||0);
const A=(s,k,i)=>{for(;i>0;i--){const v=s.dataset[k+i];if(v!=null)return v}return s.dataset[k]};
slides.forEach((s,i)=>{let d=0;s.querySelectorAll('.rv').forEach(el=>{if(el.dataset.d!=null)d=+el.dataset.d;el.style.setProperty('--d',d);d+=1.6});
 const b=document.createElement('button');b.title=`${i+1} · ${s.dataset.name}`;b.setAttribute('aria-label',b.title);b.onclick=e=>{e.stopPropagation();go(i)};dotsEl.append(b)});
function countUp(s){s.querySelectorAll('[data-count]').forEach((el,i)=>{const end=+el.dataset.count,start=+(el.dataset.from||0),dec=+(el.dataset.dec||0),dur=+(el.dataset.dur||1400),delay=+(el.dataset.delay||350+i*200),tok=el._tok=Symbol(),fmt=v=>v.toFixed(dec);el.textContent=fmt(start);const b=performance.now()+delay;(function step(n){if(el._tok!==tok)return;const p=clamp((n-b)/dur);el.textContent=fmt(start+(end-start)*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step)})(performance.now())})}
function play(s){s.classList.remove('play');void s.offsetWidth;s.classList.add('play');countUp(s)}
function applyStep(s){s.dataset.at=at;
 s.querySelectorAll('[data-s]').forEach(el=>{const v=el.dataset.s;el.classList.toggle('on',v.endsWith('+')?at>=parseInt(v):v.split(',').map(Number).includes(at))});
 s.querySelectorAll('[data-k]').forEach(el=>{const k=+el.dataset.k;el.classList.toggle('act',k===at);el.classList.toggle('done',k<at)})}
function view(s){const dur=flyTo(A(s,'cam',at));setMode(A(s,'map',at)||'');cv.style.opacity=A(s,'dim',at)||.5;setPaper(+(s.dataset.paper||0));return dur}
function sync(){[...dotsEl.children].forEach((d,i)=>d.classList.toggle('on',i===cur));const n=stepsOf(slides[cur]);countEl.textContent=`${cur+1} / ${slides.length}`+(n?` · ${at}/${n}`:'');
 const tot=slides.reduce((a,s)=>a+1+stepsOf(s),0),pos=slides.slice(0,cur).reduce((a,s)=>a+1+stepsOf(s),0)+1+at;bar.style.width=(pos/tot*100)+'%';showNotes()}
function go(n,instant,last){if(n<0||n>=slides.length||n===cur)return;const old=slides[cur],nx=slides[n];cur=n;at=last?stepsOf(nx):0;
 slides.forEach(s=>{if(s!==nx)s.classList.remove('active','play')});
 applyStep(nx);const dur=view(nx);
 clearTimeout(pending);const show=()=>{nx.classList.add('active');play(nx)};
 history.replaceState(null,'','#'+(n+1));if(instant||!old)show();else pending=setTimeout(show,dur?Math.min(dur*.62,1250):nx.dataset.paper||old.dataset.paper?520:260);sync()}
function step(d){const s=slides[cur],n=stepsOf(s);
 if(d>0&&at<n||d<0&&at>0){at+=d;applyStep(s);view(s);sync();return}
 go(cur+d,false,d<0)}
const timer=document.getElementById('timer'),LIMIT=+(document.body.dataset.limit||180),notesEl=document.getElementById('notes');
function showNotes(){const s=slides[cur],n=s.querySelector('.notes');notesEl.innerHTML=`<b>${cur+1} · ${s.dataset.name}${s.dataset.time?' · about '+s.dataset.time+' s':''}</b>`+(n?n.innerHTML:'')}
function toggleTimer(){timerOn=!timerOn;timer.style.display=timerOn?'block':'none';t0=performance.now()}
setInterval(()=>{if(!timerOn)return;const s=Math.floor((performance.now()-t0)/1000);timer.textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');timer.classList.toggle('over',s>LIMIT)},250);
document.getElementById('tbtn').onclick=e=>{e.stopPropagation();toggleTimer()};
document.getElementById('nbtn').onclick=e=>{e.stopPropagation();document.body.classList.toggle('notes-on')};
const fsT=()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})};
document.getElementById('fs').onclick=e=>{e.stopPropagation();fsT()};
document.addEventListener('keydown',e=>{if(e.metaKey||e.ctrlKey||e.altKey)return;const k=e.key;
 if(k==='ArrowRight'||k==='ArrowDown'||k==='PageDown'||k===' '||k==='Enter'){e.preventDefault();if(!e.repeat)step(e.shiftKey?-1:1)}
 else if(k==='ArrowLeft'||k==='ArrowUp'||k==='PageUp'||k==='Backspace'){e.preventDefault();if(!e.repeat)step(-1)}
 else if(k==='Home')go(0);else if(k==='End')go(slides.length-1);
 else if(k==='f'||k==='F')fsT();else if(k==='t'||k==='T')toggleTimer();else if(k==='n'||k==='N')document.body.classList.toggle('notes-on');else if(k==='r'||k==='R'){at=0;applyStep(slides[cur]);view(slides[cur]);play(slides[cur]);sync()}});
document.addEventListener('click',e=>{if(e.target.closest('#nav,#notes,a,button'))return;step(e.clientX<innerWidth*.25?-1:1)});
let navT;addEventListener('mousemove',()=>{document.body.classList.add('nav-on');clearTimeout(navT);navT=setTimeout(()=>document.body.classList.remove('nav-on'),2200)});
const start=Math.max(0,Math.min(slides.length-1,(parseInt(location.hash.slice(1))||1)-1));
cam={...(POSES[slides[start].dataset.cam]||POSES.title)};paper.style.transition='none';go(start,true);requestAnimationFrame(()=>requestAnimationFrame(()=>paper.style.transition=''));
addEventListener('hashchange',()=>{const n=parseInt(location.hash.slice(1));if(n)go(n-1)});
