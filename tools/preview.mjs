import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
  const requested=new URL(req.url,'http://localhost').pathname;
  const file=requested==='/'?'index.html':requested.slice(1);
  if(!['index.html','styles.css','script.js'].includes(file)&&!/^assets\/[\w/.-]+\.(png|svg)$/.test(file)){res.writeHead(404).end();return;}
  const target=path.resolve(root,file);
  if(!target.startsWith(root+path.sep)||!fs.existsSync(target)){res.writeHead(404).end();return;}
  res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream'});
  fs.createReadStream(target).pipe(res);
}).listen(4174,'127.0.0.1',()=>console.log('Portfolio preview: http://127.0.0.1:4174'));
