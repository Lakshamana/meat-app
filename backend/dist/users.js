"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return (another &&
            another.email === this.email &&
            another.password === this.password);
    };
    return User;
}());
exports.User = User;
exports.users = {
    'juliana@gmail.com': new User('Juliana', 'juliana@gmail.com', 'juju1234'),
    'amanda@gmail.com': new User('Amanda', 'amanda@gmail.com', 'juju1234')
};
