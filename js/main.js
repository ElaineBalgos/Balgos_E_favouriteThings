import {fetchData} from "./modules/TheDataMiner.js";

(() => {
    // stub * just a place for non-component-specific stuff
    console.log('loaded');
    
    function popErrorBox(message) {
        alert("Something has gone horribly, horribly wrong");
    }

    function handleDataSet(data) {
    // populate a lightbox with this data and then open it
    let lightbox = document.querySelector('.lightbox'),
        closeBTN = document.querySelector('.closeBTN'),
        clickBTN = document.getElementById('nav-item');
        
    function showLB(){
        lightbox.classList.add("showLB");
    }
            
    function hideLB(){
        lightbox.classList.remove("hideLB");
    }

    clickBTN.addEventListener("click",showLB);
    closeBTN.addEventListener("click",hideLB);
    }

    function retrieveProjectInfo(event) {
        // test for an ID
        let userImage = document.getElementById("#user-image");
        
        //console.log(event.target.id);
        // debugger;


        // check for an ID and if there isnt one, then dont try the fetch call because it'll  break (the PHP choke)
        if (!event.target.id) { return }

        fetchData(`./includes/index.php?id=${event.target.id}`).then(data => retrieveProjectInfo(event)).catch(err => console.log(err));
    }

    function renderPortfolioThumbnails(thumbs) {
        let userSection = document.querySelector('.user-section'),
            userTemplate = document.querySelector('#user-template').content;
        
        for (let user in thumbs) {  
            let currentUser = userTemplate.cloneNode(true),
                currentUserText = currentUser.querySelector('.user').children;

             currentUserText[1].src = `images/${thumbs[user].Image}`;
             currentUserText[1].id = thumbs[user].id;
            // add this new user to the view
             currentUser.addEventListener("click", retrieveProjectInfo);
             userSection.appendChild(currentUser);
         }

         userSection.addEventListener("click", retrieveProjectInfo);
    }
    fetchData("./includes/index.php").then(data => renderPortfolioThumbnails(data)).catch(err => console.log(err));
    // fetchData("./includes/functions.php").then(data => handleDataSet(data)).catch(err => console.log(err));
})();