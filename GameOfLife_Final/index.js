let express = require("express");
let app = express();

app.get("/google/:search", function (req, res) {
    let search = req.params.search;
    res.redirect("https://google.com/search?q=" + search);
});

app.listen(3000, function () {
    console.log("Server works!");
});


