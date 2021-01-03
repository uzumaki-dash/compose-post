//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/blogDB", {
   useNewUrlParser: true,
   useUnifiedTopology: true
 });

const postsSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", postsSchema);

const homeStartingContent = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";
const aboutContent = "Lacus laoreet non curabitur gravida arcu ac tortor. Etiam erat velit scelerisque in dictum non consectetur. Magna fringilla urna porttitor rhoncus dolor purus non. Sit amet volutpat consequat mauris nunc congue nisi. Morbi non arcu risus quis varius. Facilisis sed odio morbi quis commodo odio. Sed egestas egestas fringilla phasellus. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque. Leo urna molestie at elementum eu facilisis sed odio morbi. Scelerisque viverra mauris in aliquam sem fringilla ut. Eu turpis egestas pretium aenean pharetra magna ac. Urna nunc id cursus metus aliquam eleifend mi in nulla. Felis imperdiet proin fermentum leo vel orci porta. Condimentum lacinia quis vel eros donec. A scelerisque purus semper eget duis at tellus at. Quam vulputate dignissim suspendisse in est ante in nibh. Hac habitasse platea dictumst quisque sagittis purus sit. Lobortis feugiat vivamus at.";
const contactContent = "Dictumst quisque sagittis purus sit amet volutpat. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Tincidunt dui ut ornare lectus sit amet est. Massa massa ultricies mi quis hendrerit dolor magna eget. In aliquam sem fringilla ut morbi. Vel quam elementum pulvinar etiam non. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Luctus accumsan tortor posuere ac ut consequat semper. Magna fermentum iaculis eu non. Pretium viverra suspendisse potenti nullam. In cursus turpis massa tincidunt dui ut ornare. Scelerisque purus semper eget duis at. Pretium viverra suspendisse potenti nullam. Nec nam aliquam sem et tortor consequat. Aenean pharetra magna ac placerat vestibulum. Enim tortor at auctor urna nunc. Nunc non blandit massa enim nec dui nunc.";

app.get("/", function (req, res) {
  // find all posts and render to home.ejs
   Post.find({}, function (err, posts) {
     res.render("home", {
       value: homeStartingContent,
       posts: posts
      });
   });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    value: contactContent
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    value: aboutContent
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/posts/:postId", function(req, res){
// to store the postId parameter value
const requestedPostId = req.params.postId;
  // to find the post with a matching id
  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      dataTitle: post.title,
      dataContent: post.content
    });
  });
});

app.post("/compose", function (req, res) {

  const post = new Post({
    title: req.body.inputTitle,
    content: req.body.inputPost
  });
  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
