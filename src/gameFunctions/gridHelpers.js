export function checkForBomb(value, e) {
    if (value === true) {
        e.target.innerHTML = "BOMB";
        alert("YOU HAVE HIT ABOMB");
    }
}

