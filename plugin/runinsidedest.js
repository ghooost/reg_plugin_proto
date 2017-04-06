browser.runtime.onMessage.removeListener(sendCatcher);
browser.runtime.onMessage.addListener(sendCatcher);

function sendCatcher(request, sender, sendResponse){
  switch(request.action){
    case 'send':
      var rnd=Math.random();
      for(var cnt=0,m=request.data.length;cnt<m;cnt++){
        var f=document.createElement('form');
        for(var o in request.data[cnt]){
          var i=document.createElement('input');
          i.type='hidden';
          i.value=request.data[cnt][o];
          i.name=o;
          f.appendChild(i);
        }
        var iframe=document.createElement('iframe');
        iframe.src="about:blank";
        iframe.name="frame"+rnd;
        iframe.style.width="100%";
        iframe.style.height="200px";
        document.body.appendChild(iframe);
        rnd+=1.0;
        document.body.appendChild(f);
        console.log(f);
        f.target=iframe.name;
        f.action="gate.php";
        f.method="post";
        f.submit();
      }

      return Promise.resolve({isready: true});
    break;
  }
}
