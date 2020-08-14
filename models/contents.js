const contents = {
    fakeDB: [],
    initContents(){
        this.fakeDB.push({path: "images/pick.jpg",title: "Pick",text: "300+ menu of all-natural dishes."});
        this.fakeDB.push({path: "images/heat.jpg",title: "Heat",text: "Cooked & delivered."});
        this.fakeDB.push({path: "images/eat.jpg",title: "Eat",text: "Delicious & nutritious"});
    },
    getContents(){
        return this.fakeDB;
    }
}
contents.initContents();
module.exports=contents;