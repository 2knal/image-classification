// TODO: Shutdown webcam after stopping

let mobilenet;
let classifier;

function videoReady() {
    console.log('Video ready!');
}

function modelReady() {
    console.log('Model ready!');
}

function setup() {
    mobilenet = ml5.featureExtractor('Mobilenet', modelReady);
    classifier = mobilenet.classification(videoReady)
}

function startVideo(cue) {
    const config = {
        video: {
            mandatory: {
              maxWidth: 315,
              maxHeight: 315
            },
        },      
    }
    let video = createCapture(config, VIDEO);
    video.id(`v-${cue.id.slice(2, cue.id.length)}`);
    // This size is required by MobileNet model

    document.querySelector(`#${cue.id}`).parentNode.appendChild(video.elt);
    cue.style.display = 'none';
    document.querySelector(`#v-${cue.id.slice(2, cue.id.length)}`).setAttribute('width', '224');
    document.querySelector(`#v-${cue.id.slice(2, cue.id.length)}`).setAttribute('height', '224');

    // Tagging this video to classifier
    classifier.video = video.elt;
    document.querySelector(`#g-${cue.id.slice(2, cue.id.length)}`).style.display = 'block'
}

function stopVideo(cue) {
    const id = cue.parentNode.id.slice(2, cue.parentNode.id.length);
    document.querySelector(`#v-${id}`).remove();
    document.querySelector(`#g-${id}`).style.display = 'none';
    document.querySelector(`#s-${id}`).style.display = 'block';
}

function getLabelName(label) {
    const labelName = document.querySelector(`#s-${label}`).parentNode.previousElementSibling;
    return labelName.innerHTML
}

function clickPhotos(cue) {
    const label = getLabelName(cue.parentNode.id.slice(2, cue.parentNode.id.length));
    classifier.addImage(label);
}

function whileTraining(loss) {
    // TODO: Raise a toast
    if (loss === null) alert('Training complete!');
    else console.log('Loss reduced to:', loss);
}

function trainModel() {
    classifier.train(whileTraining)
}

function addPs(n) {
    let result = document.querySelector('.result');
    for (let i=0; i<n; i++) {
        let newP = document.createElement('p');
        newP.id = `p-class-${i+1}`;
        result.appendChild(newP);
    }
}

function result(err, data) {
    if (err) console.error(err);
    else {
        for (let i=0; i<data.length; i++) {
            const { label, confidence } = data[i];
            document.querySelector(`#p-class-${i+1}`).innerHTML = `${label} -> ${confidence}`;
        }
        predict()
    }
}

function predict() {
    classifier.classify(result);
}

function evaluateModel() {
    const config = {
        video: {
            mandatory: {
              maxWidth: 315,
              maxHeight: 315
            },
        },      
    }
    let video = createCapture(config, VIDEO);
    video.id('eval-model');

    // This size is required by MobileNet model
    document.querySelector(`#eval-model`).setAttribute('width', '224');
    document.querySelector(`#eval-model`).setAttribute('height', '224');

    // Tagging this video to classifier
    classifier.video = video.elt;

    document.querySelector('#preview').appendChild(video.elt);
    predict();

    const n = document.querySelectorAll('.upload .card').length - 1;
    addPs(n);
}