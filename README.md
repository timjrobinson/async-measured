# async-measured
A drop in replacement for async that adds timings to functions.

I eventually want this to give [measured](https://github.com/felixge/node-measured) timings on all functions. For now it just gives basic timings.

Currently it only supports basic measurements for async.series. Feel free to submit PR's for your own measurements.

## Usage

```
var async = require("async-measured");

var timer = async.series([
    function (next) {
        setTimeout(next, 100);
    },
    function (next) {
        setTimeout(next, 50);
    }
], function () {
    console.log(timer);
});
```

After the async.series is done timer will be an object like:
```
{
    start: <timestamp>
    time: 150
    tasks: [
        {
            start: <timestamp> 
            time: 100
        },
        {
            start: <timestamp>
            time: 50
        }
    ]
}
```

## License

MIT


    
    
