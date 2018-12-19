let roles = {
    manager: {
        can: ['publish'],
        inherits: ['writer']
    },
    writer: {
        can: ['write', {
            name: 'edit',
            when: function (params) {
                return new Promise ((resolve,reject)=>{
                    if(params.user.id === params.post.owner){
                        resolve(true);
                    } else {
                        reject(false)
                    }
                })
            }
        }],
        inherits: ['guest']
    },
    guest: {
        can: ['read']
    }
}

class RBAC {
    constructor(opts) {
        this.init(opts);
    }

    init(roles) {
        if (typeof roles !== 'object') {
            throw new TypeError('Expected an object as input');
        }

        this.roles = roles;
        let map = {};
        Object.keys(roles).forEach(role => {
            map[role] = {
                can: {}
            };
            if (roles[role].inherits) {
                map[role].inherits = roles[role].inherits;
            }

            roles[role].can.forEach(operation => {
                if (typeof operation === 'string') {
                    map[role].can[operation] = 1;
                } else if (typeof operation.name === 'string'
                    && typeof operation.when === 'function') {

                    map[role].can[operation.name] = operation.when;
                }
                // Ignore definitions we don't understand
            });

        });

        this.roles = map;
    }

    can(role, operation,params) {
      

        return new Promise((resolve, reject) => {
            //Check if parameters are string
            if (typeof role !== 'string') {
                throw new TypeError('Expected first parameter to be string : role');
            }

            if (typeof operation !== 'string') {
                throw new TypeError('Expected second parameter to be string : operation');
            }
            //
            let _role = this.roles[role]
            if (!_role) {
                throw new Error('Undefined role');
            }

            // IF this operation is not defined at current level try higher
            if (!_role.can[operation]) {
                // If no parents reject
                if (!_role.inherits) {
                    return reject(false);
                }
                // Return if any parent resolves true or all reject
                return _role.inherits.map(parent=>this.can(parent,operation))
                        .then(resolve(true),reject(false))
            }

            if (_role.can[operation] === 1) {
                console.log(_role.can[operation])
                return resolve(true)
            }
           
            // Operation is conditional, run async function
            if (typeof _role.can[operation] === 'function') {
                if(params===undefined){
                    throw new Error("Missing parameters")
                }
                _role.can[operation](params)
                .then((res)=>{
                    return resolve(true)
                },(rej)=>{
                    return reject(false)
                })
            }
            reject(false)
        })


    }
}

let roleModule = new RBAC(roles);
console.log(roleModule.roles)
// Test throw error ---- invalid data type, need to pass in strings
roleModule.can(1, 'eya')
    .then((value) => {
        console.log(value)
    }, (reason) => {
        console.log(reason)
    })
    .catch(err => console.log(err))
//should return Undefined Role
roleModule.can('yea', 'eya')
    .then((value) => {
        console.log(value)
    }, (reason) => {
        console.log(reason)
    })
    .catch(err => console.log(err))
//should return false
roleModule.can('guest', 'r3ead')
    .then((value) => {
        console.log(value)
    }, (reason) => {
        console.log(reason)
    })
    .catch(err => console.log(err))
//should return true
roleModule.can('writer', 'read')
    .then((value) => {
        console.log(value)
    }, (reason) => {
        console.log(reason)
    })
    .catch(err => console.log(err))

// should run the function and return true or false
roleModule.can('writer', 'edit')
    .then((value) => {
        console.log(value)
    }, (reason) => {
        console.log(reason)
    })
    .catch(err => console.log(err))
// should run the function and return true or false
roleModule.can('writer', 'edit', {user:{id:"Jim"}, post:{owner:"Jim"}})
    .then((value) => {
        console.log(value)
    }, (reason) => {
        console.log(reason)
    })
    .catch(err => console.log(err))