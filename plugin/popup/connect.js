var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then(tabs => {
   var tabID=tabs[0].id;
   browser.tabs.sendMessage(tabID, {action: 'hello'}).then(response=>{
     $('.page.sel').removeAttr('sel');
     if(response && response.isready && response.data && response.data.data){
//let's show the quest window
        if(!response.data.data.length){
          $('.page#nodocs').attr('sel',1);
        } else {
          $('.page#upload').attr('sel',1);
          $('.page#upload .num').html(response.data.data.length);
          $('#dosubmit').click(function(){
            browser.tabs.query({url: response.data.url,active:false}).then(tabs=>{
                processSending(tabs[0].id,response.data.data);
            }).catch(err=>{
                browser.tabs.create({url:response.data.url,active:false}).then(tab=>{
                  processSending(tab.id,response.data.data);
                }).catch(err=>{
                  console.log('Can not ctreate a tab for '+response.data.url);
                });

            });
          });
        }
     } else {
      $('.page#noinfo').attr('sel',1);
     }
   }).catch(err=>{
//no connection to the content script
      $('.page#noconnection').attr('sel',1);
   });
})

function processSending(tabId,data){
  browser.tabs.executeScript(
    tabId,{file:'/runinsidedest.js'}
  ).then(response=>{
    browser.tabs.sendMessage(tabId, {action: 'send',data:data}).then(response=>{
      $('.page.sel').removeAttr('sel');
      $('.page#done').attr('sel',1);
    }).catch(err=>{
      console.log('No connection to the script!');
    });
  }).catch(err=>{
    console.log("Can't execute!");
    console.log(err);
  });
}
