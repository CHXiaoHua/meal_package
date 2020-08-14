const Nav = {
    fakeDB: [],
    initNav(){
        this.fakeDB.push({url:'/', string:'Home'});
        this.fakeDB.push({url:'MealPackage', string:'Meal Package'});
        this.fakeDB.push({url:'CustomerRegistration', string:'Sign Up'});
        this.fakeDB.push({url:'Login', string:'Login'});
    },
    getNavDatas(){
        return this.fakeDB;
    }
}
Nav.initNav();
module.exports=Nav;