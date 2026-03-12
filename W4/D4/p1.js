const inspectBtn=document.getElementById("inspectBtn");
const out=document.getElementById("out");

inspectBtn.addEventListener("click",function(){
    const info={
        htmlLang:document.documentElement.lang,
        charset:document.characterSet,
        //browser's primary preferred languages
        browserLanguage:navigator.language, 
        //array of all browser languages
        browserLanguages:navigator.languages,
        sampleText:document.getElementById('sampleText').textContent
    };
    console.log(info);
    out.textContent=JSON.stringify(info,null,2)
})