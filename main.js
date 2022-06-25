const search = document.getElementById('search')
const matchList = document.getElementById('match-list')

//Search data.json and filter it

const searchStates = async searchText => {
    const res = await fetch('./data.json')
    const states = await res.json();
    // Get matches to current text input
    
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex)
    
    })

    if(!searchText.length) {
        matches = []
        matchList.innerHTML = ''
    }
  
    // render html 
    outputHtml(matches);

    
}

// Show result = html
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => 
            `<div>
                <h3>${match.name} (${match.abbr})</h3>
            </div>`).join('');

        matchList.innerHTML = html;    
    }
    
}
let typingTimer;

search.addEventListener('keyup', () => {
    clearTimeout(typingTimer)
    if(search.value) {
        typingTimer = setTimeout(doneTyping, 3000)
    }
    else {
        searchStates(search.value)
    }


})
function doneTyping () {
    searchStates(search.value)
}