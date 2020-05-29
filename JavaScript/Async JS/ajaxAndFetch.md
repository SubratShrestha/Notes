## AJAX and Fetch.

# AJAX.

AJAX stands for Asynchronous Javascript And XML.

Its a way to communicate to a server with GET, POST, DELETE requests, like flask was to Python.



# Fetch.

Fetch is modern JS API for handling requests to servers. It doesn't have perfect browser support, but its still widely supported.

It takes as argument, the url from which we expect the response. It returns a promise, because a fetch can take a while and so it must happen in the background.

Most of the time, we never really have to produce promises, and instead just consume them, this is an example of that because fetch automatically produces the promise and returns it, we only have to consume it.



## CORS.

JS has something called **Same-origin** policy, which restricts us from accessing servers that are not ours. This is a security feature, but then how are we supposed to access the data provided by other servers? This is where CORS comes in.

CORS stands for Cross Origin Resource Sharing, and its what allows us to share resources from other servers. This must be enabled in the server we are trying to access, otherwise the same-origin policy will not allow us to access data from other servers.

Some servers don't have CORS, but still allow for resource sharing. This problem is fixed with a workaround which is to **proxy** or channel the request through our own server where the same-origin policy doesn't exist, but if we don't have our own server, then we can use a tool like [crossorigin.me](), but such a tool should definitely not be used in production.



## JSON method.

Most servers will provide responses in a `.json` format. This needs to be converted or parsed to JS for us to be able to extract some data from it.

This is where the `json()` method, it parses the json file to a JS object, but since that process can take a while depending on the size of the json file, it returns a promise and does the parsing in the background.  

So the data must be used with a `.then()`.



## Using fetch and .then().

```js
// Ex. Here, we're using an API of methaweather.com, documentation is: https://www.metaweather.com/api/
// This is an example of an API that doesn't have CORS enabled, and so we use the crossorigin
// tool to redirect the request and get the json.

function getWeatherToday(id) {
    fetch(`https://www.crossorigin.me/https://www.metaweather.com/api/location/${id}`)
    .then(req => return req.json())
    .then(data => {
        const today = data.consolidated_weather[0];
        console.log(`the temp today in ${data.title} will be between ${today.min_temp} and ${today.max_temp}`));
    }
    .catch(error => console.log(error));
}

// id for San Francisco.
getWeatherToday(2487956);

// id for London.
getWeatherToday(44418);
```





## Using fetch and async/await.

