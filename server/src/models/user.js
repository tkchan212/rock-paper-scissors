const db = require('../utils/database');

module.exports = class User {
    constructor(name, email, hpw, admin){
        this.name = name;
        this.email = email;
        this.hpw = hpw;
        this.admin = admin;
    }

    createUser() {
        return db.execute(
            'INSERT INTO User (name, email, hpassword, admin, deleted, suspended) VALUES (?, ?, ?, ?, 0, 1)', [this.name, this.email, this.hpw, this.admin]
        )
    }
    static fetchAll() {
        return db.execute('SELECT * FROM User');
    }

    static fetchUser(name_or_email){
        return db.execute('SELECT * FROM User where name = ? OR email = ?',  [name_or_email, name_or_email])
    }
    
    static fetchUserById(id){
        return db.execute('SELECT * FROM User where id = ?',  [id])
    }

    static activateUser(email){
        return db.execute('UPDATE User SET suspended = 0 where email = ?',  [email])
    }

    static suspendUser(id){
        return db.execute('UPDATE User SET suspended = 1 where id = ?',  [id])
    }
    
    static unsuspendUser(id){
        return db.execute('UPDATE User SET suspended = 0 where id = ?',  [id])
    }
}