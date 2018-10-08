export const ajax = function(method, url, headers, data){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open(method, url, true);
        xhr.onerror = err => reject(err);
        xhr.onload = () => resolve(xhr);

        if(headers){
            for(let h in headers){
                xhr.setRequestHeader(h, headers[h]);
            }
        }
        
        data ? xhr.send(data) : xhr.send();
    });
};