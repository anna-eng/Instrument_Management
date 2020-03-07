var DB = (function () {
    var instance;

    function mockDB() {
        this.users = [];
        this.idInc = 0;
        this.getUsers = () => this.users;
        this.getUserByName = (name) =>  this.users.find((user) => user.name == name)
        this.getUserById = (id) => this.users.find((user) => user.id == id)
        this.saveUser = (userToSave) => {
            if(this.users.find((user)=> user.id == userToSave.id)) {
                this.users.map((user) => user.id == userToSave.id ? userToSave: user )
            } else {
                this.users.push(userToSave);
            }
            return userToSave;
        }
        this.deleteUserById = (id) => {this.users = this.users.filter((user) => user.id != id)}
        this.createId = () => ++this.idInc
    }
    function createInstance() {
        return new mockDB();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

module.exports = DB;