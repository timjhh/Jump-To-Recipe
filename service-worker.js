function execute() {
  function jumpToRecipe() {
    if(jumpFromAnchor()) {
      return "Found from Anchor"
    }
    if(jumpFromHeading()) {
      return "Found from Heading"
    }
    return "Could not find recipe indicator."

    // Remove class or id tag from match
    function elementFromId(id) {
      if(id.substring(0,1) == "#") id = id.substring(1, id.length)
      if(id.substring(0,1) == ".") id = id.substring(1, id.length)
      return document.getElementById(id)
    }

    function scrollTo(element) {
      element.scrollIntoView({
        behavior: 'instant',
        block: 'start'
      })
    }

    // Match an anchor tag containing 'jump to recipe' reference and scroll to it.
    // Returns status of operation.
    function jumpFromAnchor() {
      for (const a of document.querySelectorAll("a")) {
        if (a.textContent.trim().toLowerCase().includes("jump to recipe")) {
          let id = a.getAttribute('href')
          let destination = elementFromId(id)
          if(destination) {
            scrollTo(destination)
            return true
          }

        }
      }
      return false
    }

    // Match the 'ingredients' section of a page and scroll to it.
    // Returns status of operation.
    function jumpFromHeading() {
      const headers = "h1, h2, h3, h4, h5, h6"
      for (const a of document.querySelectorAll(headers)) {
        if (a.textContent.trim().toLowerCase() == "ingredients") {
          scrollTo(a)
          return true
        }
      }
      return false
    } 

}


jumpToRecipe()
}


chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: execute
    });
  }
});

