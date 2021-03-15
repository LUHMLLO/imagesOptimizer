const Jimp = require("jimp");
const Filehound = require("filehound");
const fs = require("fs");

let directories = Filehound.create().path("./assets").directory().find();
directories.each((homeDir, index) => {
  fs.readdirSync(homeDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .forEach((subdir) => {
      //console.log("[" + index + "]  " + homeDir + "--------------/--------------" + subdir);

      let jimpPath = "./"+homeDir+"/"+subdir+"/";

      fs.readdir(jimpPath, (err, files) => {
        files.forEach((file) => {
          Jimp.read(jimpPath + file)
            .then(function (image) {
              image.resize(1440, Jimp.AUTO);
              image.quality(75);
              image.write("./optimized/" + "/" + homeDir + "/" + subdir + "/" + file.slice(0, -4) + ".jpg");
              console.log("written: " + file.slice(0, -4));
            })
            .catch(function (err) {
              console.error(err);
            });
        });

        if (err) {
          console.log(err);
        }
      });
      /**********/
    });
});

/*


*/

/*

fs.readdir(UnOptimizedImagesFolder, (err, files) => {

  files.forEach(file => {
    Jimp.read(UnOptimizedImagesFolder+file).then(function (image) {
      image.resize(1280, Jimp.AUTO);
      image.quality(75);
      image.write('./optimized/'+file.slice(0, -4)+'.jpg');
      console.log('written: '+file.slice(0, -4))
    }).catch(function (err) {
        console.error(err);
    });
  });

  if(err){
    console.log('');
    console.log('');
    console.log(err);
    console.log('');
    console.log('');
  }
})
*/
