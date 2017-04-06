var data=null;

window.postMessage({action:'hello'},'*');

window.addEventListener("message", function(event){
    if(event.source==window && event.data && event.data.action=='dataResponse')
      data=event.data;
}, false);

browser.runtime.onMessage.addListener(function (request, sender, sendResponse){
  switch(request.action){
    case 'hello':
      return Promise.resolve({isready: true,data:data});
    break;
  }
});
