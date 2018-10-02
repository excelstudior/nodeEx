let roles = {
    manager: {
        can: ['publish'],
        inherits: ['writer']
    },
    writer: {
        can: ['write', {
            name: 'edit',
            when: function (params) {
                return params.user.id === params.post.owner;
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

    can(role, operation) {
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
            // if (!_role.can[operation]) {
            //     // If no parents reject
            //     if (!_role.inherits) {
            //         return reject(false);
            //     }
            //     // Return if any parent resolves true or all reject
            //     return 
            // }

            if (_role.can[operation] === 1) {
                console.log(_role.can[operation])
                resolve(true)
            }
            //    else {
            //        return reject(false)
            //    }
            // Operation is conditional, run async function
            if (typeof _role.can[operation] === 'function') {
                // $role.can[operation](params, function (err, result) {
                //     if(err) {
                //         return reject(err);
                //     }
                //     if(!result) {
                //         return reject(false);
                //     }
                //     resolve(true);
                // });
                //return;
                return resolve('function');
            } else {
                return reject('it is not a function')
            }
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

roleModule.can('yea', 'eya')
    .then((value) => {
        console.log(value)
    }, (reason) => {
        console.log(reason)
    })
    .catch(err => console.log(err))

roleModule.can('guest', 'r3ead')
    .then((value) => {
        console.log(value)
    }, (reason) => {
        console.log(reason)
    })
    .catch(err => console.log(err))

