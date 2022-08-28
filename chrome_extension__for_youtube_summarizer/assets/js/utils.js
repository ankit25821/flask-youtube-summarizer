function ValidateInput() {
    // Function That Validate User Input

    if (Boolean(userInput.value.trim()) === false) {
        // Remove Valid class
        userInput.classList.remove('is-valid');

        userInput.classList.add('is-invalid');
        invalidFeedback.innerHTML = '<small>This Field Is Required!</small>';
    } else if (userInput.value.trim().length <= 3) {
        // Remove Valid class
        userInput.classList.remove('is-valid');

        userInput.classList.add('is-invalid');
        invalidFeedback.innerHTML = '<small>Provide Atleast 4 Charactors</small>';
    } else {
        // Remove Invalid class
        userInput.classList.remove('is-invalid');

        userInput.classList.add('is-valid');
        validFeedback.innerHTML = '<small>Looks Ok (;';
    }
}

function resetInput() {
    // Function Resets Input Field
    userInput.value = '';
    userInput.classList.remove('is-valid');
    userInput.classList.remove('is-invalid');
}

function handleFormSubmission() {
    // Function Handles Form Submission & Validation Of Input

    ValidateInput()

    if (userInput.value.trim().length >= 3) {
        // Function That Sends Data To Server
        sendData()
    }
}

function youtube_parser(url) {
    /* 
        Extracts youtube video id from url 
        code taken from -> https://stackoverflow.com/a/8260383/14457833
    */
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

function MDBmodel(modalId) {
    let options = {}
    const myModal = new mdb.Modal(document.getElementById(modalId), options)
    return myModal;
}

async function showServerError(modalId = null, response = null) {
    let model = MDBmodel(modalId);
    response = await response
    modalTitle.innerHTML = `Error`;
    modalBody.innerHTML = renderError(response);
    model.show();
}

function renderError(obj) {
    if ('code' in obj) {
        return `
        <h6 class="mx-2">Code</h6>
        <p class="mx-4"><i><code>${obj.code}</code><i></p>
        <h6 class="mx-2">Description</h6>
        <p class="mx-4 font-monospace">${obj.description}</p>
        `;
    }
    return `
    <h6 class="mx-2">Description</h6>
    <p class="mx-4 font-monospace">${error}</p>
    `;
}

function changeToolTipContent(element, content) {
    element.setAttribute('title', content);
    element.setAttribute('data-mdb-original-title', content);
    element.textContent = content;
}

function CopyData(btn, elementId) {
    element = document.getElementById(elementId)
    navigator.clipboard.writeText(element.textContent.trim());
    changeToolTipContent(btn, "Copied!");
}

function Reload() {
    window.navigation.reload()
}

function renderSummary(response) {
    return `
    <button class="btn btn-primary m-3 reload">
    <i class="fas mx-2 fa-arrow-circle-left"></i> Go Back
    </button>
    <h2 class="text-center my-3">Details</h2>

    <div class="col-md-10 mx-auto mt-5">
        <div class="border p-5">
            <div class="d-flex justify-content-between my-2">
                <h4>Summary</h4>
                <p><strong>Word Count : </strong>${response.summarized_word_count}</p>
            </div>
            <p class="lead text-capitalize fs-6 fw-normal text-center">
                <i class="fas fa-quote-left me-2 text-muted fa-2x"></i>
                <span id="item-1">
                    ${response.summarized_text}
                </span>
                <i class="fas fa-quote-right text-muted ms-2 fa-2x"></i>
            </p>
            <div class="text-center">
                <button data-id="item-1" class="btn btn-info btn-sm copy tooltip-btn"
                    data-mdb-toggle="tooltip" title="Copy">
                    Copy
                </button>
            </div>
            <hr>
            <div class="d-flex justify-content-between my-2">
                <h4>Video Transcript</h4>
                <p><strong>Word Count : </strong>${response.transcript_word_count}</p>
            </div>
            <p class="lead text-capitalize fs-6 fw-normal text-center">
                <i class="fas fa-quote-left me-2 text-muted fa-2x"></i>
                <span id="item-2">
                    ${response.transcript}
                </span>
                <i class="fas fa-quote-right text-muted ms-2 fa-2x"></i>
            </p>
            <div class="text-center">
                <button data-id="item-2" class="btn btn-info copy btn-sm tooltip-btn"
                    data-mdb-toggle="tooltip" title="Copy">
                    Copy
                </button>
            </div>
            <hr>
        </div>
    </div>
    `
}
