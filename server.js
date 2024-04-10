// import 'pills' veb-server
const pills = require('./app');

// start 'pills' veb-server
pills.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
});