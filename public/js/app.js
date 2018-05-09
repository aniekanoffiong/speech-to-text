var file = '';

$('.form-input').change((e) => {
    file = e.target.files;
});

$('.form-button').click((e) => {
    e.preventDefault();
    $('.loading').css('display', 'block');
    $('.file-content').css('display', 'none');
    const formData = new FormData();
    formData.append('image', file[0]);
    $.ajax({
        method: 'post',
        url: '/api/convert',
        data: formData,
        processData: false,
        contentType: false,
        success: ((data) => {
            if (data != '') {
                if (typeof data === 'string' || data instanceof String) {
                    display(data);
                } else if (typeof data === 'array' || data instanceof Array) {
                    let status = data[0].TranscriptionJob.TranscriptionJobStatus;
                    const jobName = data[0].TranscriptionJob.TranscriptionJobName;
                    const fileDuration = data[1] * 60000; // Converting to milliseconds
                    $('.loading .overlay').html('<div>Currently Transcribing ...<br> Please Wait</div>');
                    // Using a function to ensure ease of repeating action using setTimeout function
                    handleAction(data, fileDuration - 30000, jobName);
                }
            } else {
                $('.file-content').html('Error Transcribing File').css('display', 'block');
            }
        }),
        error: ((err) => {
            $('.loading').css('display', 'none');
            $('.file-content').html(err).css('display', 'block');
        })
    });
});

function display(data) {
    $('.loading').css('display', 'none');
    $('.file-content').html(data.replace(new RegExp('\r?\n', 'g'), '<br >'))
        .css('display', 'block');
    return;
}

function handleAction(data, timeout, jobName) {
    getTranscript(data, timeout, jobName);
}

function getTranscript(data, timeout, jobName) {
    setTimeout(() => {
        $('.loading .overlay').html('<div>Still Loading ...<br> Please Wait</div>');
        $.get('/api/retrieve/' + jobName, (data) => {
            status = data.TranscriptionJob.TranscriptionJobStatus;
            if (status == 'COMPLETED') {
                $.get(data.TranscriptionJob.Transcript.TranscriptFileUri, (data) => {
                    const final = JSON.parse(data);
                    const transcript = final.results.transcripts[0].transcript;
                    display(transcript);
                });
            } else {
                handleAction(data, 30000);
            }
        });
    }, timeout);
}