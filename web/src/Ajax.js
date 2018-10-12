export class Ajax{
    // sends an async http request 
    static request(options={}){
        return new Promise((resolve, reject) => {
            // extract config from options object
            let method = (typeof options.method === "string") ? options.method : "GET",
                url = (typeof options.url === "string") ? options.url : window.location.origin,
                headers = (typeof options.headers === "object" && options.headers) ? options.headers : {},
                query = (typeof options.query === "object" && options.query) ? options.query : {},
                data = (typeof options.data !== "undefined") ? options.data : null;

            // create the request
            let xhr = new XMLHttpRequest();

            // attach listeners
            xhr.onload = () => resolve(xhr);
            xhr.onerror = err => reject(err);

            // apply query string
            if(query){
                url += Ajax.queryString(query);
            }

            // open the request
            xhr.open(method, url);

            // apply http headers
            for(let h in headers){
                xhr.setRequestHeader(h, headers[h]);
            }

            // send the request
            // send JSON if the data is not a string
            if(data){
                if(typeof data !== "string"){
                    xhr.send(JSON.stringify(data));
                }
                else xhr.send(data);
            }
            else xhr.send();
        });
    }

    // async http get request
    static get(url, headers, query){
        return Ajax.request({method: "GET", url, headers, query});
    }

    // async http post request
    static post(url, headers, data){
        return Ajax.request({method: "POST", url, headers, data});
    }

    // creates a query string from an object
    static queryString(dict){
        let qs = "?";

        for(let param in dict){
            qs += `${param}=${dict[param]}&`;
        }

        return qs.substring(0, qs.length - 1);
    }
}