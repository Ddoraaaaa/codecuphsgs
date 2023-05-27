function displayMili(mili: number) : string { 
    let sec = Math.floor(mili / 1000); 
    let min = Math.floor(sec / 60); 
    let hr = Math.floor(min / 60); 
    return `${hr}h${min % 60}m${sec % 60}s`; 
}

export { 
    displayMili
}