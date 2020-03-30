// Initial count of classes
let total = 2; 
// Uploaded files
let classNames = {};

function addLabel() {
    const addLabelDiv = document.querySelector('#add-label');
    let newLabel = document.createElement('div');
    newLabel.className = 'card';
    let labelName = document.createElement('div');
    labelName.className = 'label-name';
    labelName.setAttribute('contenteditable', 'true');
    total += 1
    labelName.innerHTML = `Class ${total}`

    let content = document.createElement('div');
    content.className = 'content';

    let startBtn = document.createElement('button');
    startBtn.className = 'btn'
    startBtn.id = `s-class-${total}`
    startBtn.setAttribute('onclick', 'startVideo(this)');
    startBtn.innerHTML = 'Start webcam';

    let btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';
    btnGroup.id = `g-class-${total}`;
    btnGroup.style.display = 'none';

    let holdBtn = document.createElement('button');
    holdBtn.className = 'btn'
    holdBtn.setAttribute('onclick', 'clickPhotos(this)');
    holdBtn.innerHTML = 'Hold button';

    let stopBtn = document.createElement('button');
    stopBtn.className = 'btn'
    stopBtn.setAttribute('onclick', 'stopVideo(this)');
    stopBtn.innerHTML = 'Stop';

    btnGroup.appendChild(holdBtn);
    btnGroup.appendChild(stopBtn);

    content.appendChild(startBtn);
    content.appendChild(btnGroup);

    newLabel.appendChild(labelName);
    newLabel.appendChild(content);
    addLabelDiv.parentNode.insertBefore(newLabel, addLabelDiv);
}

function modifyLabel(label) {
    console.log(label.value, 'CHANGE')
}

function fileUpload(input) {
    const fileDisplay = document.querySelector(`#fd-${input.id}`);
    for (let fileIndex in input.files) {
        if (!isNaN(fileIndex)) {
            const file = input.files[fileIndex];
            let reader = new FileReader();
            reader.onload = function(e) {
                console.log('IMAGE', e.target.result);
            }   
            reader.readAsDataURL(file);

            // Add file name to display
            const p = document.createElement('p');
            p.innerHTML = file.name;
            fileDisplay.appendChild(p);
        }
    }
}
