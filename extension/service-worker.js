function jumpToRecipe() {
  const headers = "h1, h2, h3, h4, h5, h6"
  let matchingElement;
  for (const a of document.querySelectorAll("a")) {
    if (a.textContent.trim().toLowerCase().includes("jump to recipe")) {
      matchingElement = a
    }
  }
  if(matchingElement) {
      let id = matchingElement.getAttribute('href')
      let destination = elementFromId(id)
      scrollTo(destination)
  } else {
    for (const a of document.querySelectorAll(headers)) {
      if (a.textContent.trim().toLowerCase() == "ingredients") {
        matchingElement = a
      }
    }
    if(matchingElement) {
      scrollTo(matchingElement)
    }
  }

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

}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: jumpToRecipe
    });
  }
});

