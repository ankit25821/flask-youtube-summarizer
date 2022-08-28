function sendData() {
    // Toggling Buttons
    summaryBtn.style.display = 'none';
    loaderBtn.style.display = 'inline-block';

    fetch(URL, {
        method: 'POST',
        signal: AbortSignal.timeout(10000),
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'video_id': (youtube_parser(userInput.value.trim()) || userInput.value.trim()),
            'ratio': rangeElement.value
        }),
    }).then(
        response => {
            if (!response.ok) {
                showServerError('errorModel', response.json())
                return false;
            }
            return response.json()
        }
    ).then(data => {

        // Toggling Buttons
        summaryBtn.style.display = 'inline-block';
        loaderBtn.style.display = 'none';
        resetInput();
        if (data) {
            document.body.innerHTML = renderSummary(data);
        }
    }).catch(error => {
        console.log(error)
        error = {
            'code': 'SERVER_NOT_REACHABLE',
            'description': 'Server is down or not reachable.'
        }
        showServerError('errorModel', error)
        // Toggling Buttons
        summaryBtn.style.display = 'inline-block';
        loaderBtn.style.display = 'none';
    });
}



// Assigning Events
document.addEventListener('DOMContentLoaded', function () {
    // Hiding Loader Button & Image Container On Page Load
    loaderBtn.style.display = 'none';
    outputContainer.style.display = 'none';
})

// Adding Event Listener On Generate Button To Handle Form Submission
summaryBtn.addEventListener('click', handleFormSubmission);

// Adding Event Listener To Validate User Input
userInput.addEventListener('input', ValidateInput)


// For displaying summary percentage
rangeDisplayValue.textContent = `Summary percentage : ${rangeElement.value}%`

rangeElement.addEventListener('change', function (e) {
    rangeDisplayValue.textContent = `Summary percentage : ${e.target.value}%`
})

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('reload')) {
        Reload();
    }
    if (e.target.classList.contains('copy')) {
        CopyData(e.target, e.target.getAttribute('data-id'));
    }
})