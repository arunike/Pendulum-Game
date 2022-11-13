// Variable Declarations
const game = document.querySelector('.game');
const score = document.querySelector('#val');
const max = 9;
let index = 0;

const data = Array.from(new Array(max)).map((v, i) => { // Create array of objects
    const deg = i * 360 / max;
    return `<div class="item" style="transform: rotate(${deg}deg) translate(160px);z-index:${i === index ? '10' : ''}">
        <span class="item-name"></span>
        ${i === index ? `<div class="tool">
            <div class="tool-circle"><span id="curr"></span></div>	
        </div>`:''}
    </div>`
})

game.innerHTML = data.join(''); // Add array of objects to DOM

document.onclick = () => { // Rotate the pendulum
    // Variable initializations 
    const tool = game.querySelector('.tool');
    tool.classList.add('paused');
    const nextIndex = index === max - 1 ? 0 : index + 1;
    const list = game.children;
    const currRect = document.getElementById('curr').getBoundingClientRect();
    const moveEl = list[nextIndex].querySelector('.item-name');
    const moveRect = moveEl.getBoundingClientRect();

    if (Math.abs(currRect.left - moveRect.left) < 12.5 && Math.abs(currRect.top - moveRect.top) < 12.5) { // Check if the tool is in the center of the item
        list[nextIndex].appendChild(tool);
        tool.classList.remove('paused');
        list[index].style.zIndex = '';
        list[nextIndex].style.zIndex = '10';

        if (index === max - 1) { // Check if the pendulum is at the end of the list
            index = 0;
        } else {
            index++;
        }

        score.innerHTML = parseInt(score.innerHTML) + 1;

    } else if (score.innerHTML.indexOf(',') ===  - 1) { // Check if the score is in the thousands
        score.innerHTML += ', Game Over';
    }
}