export function fetchFiles(url, div) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const targetElement = document.querySelector(div);
                if (targetElement) {
                    targetElement.innerHTML = data;
                    resolve(); // Resolve the promise once the content is loaded
                } else {
                    reject(new Error(`Element with selector ${div} not found`));
                }
            })
            .catch(error => {
                console.error("The file cannot be loaded:", error);
                reject(error); // Reject the promise if there's an error
            });
    });
}
