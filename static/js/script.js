const renderContent = (title, content) => {
    $('.title-text').text(title);
    $('.content-text').text(content);
};

const getContent = (dateStr) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/story?dateStr=" + dateStr);
    xhr.addEventListener("load", (e) => {
        const storyJson = JSON.parse(xhr.responseText);
        renderContent(storyJson.title, storyJson.content);
    });
    xhr.send();    
}

flatpickr("#flatpickr", {
    locale:"ja",
    onChange: (selectedDates, dateStr, instance) => {
        getContent(dateStr);
    },
    dateFormat: 'md'
});
