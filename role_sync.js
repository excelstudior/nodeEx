const Q =require('q');

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
        if(typeof roles !== 'object') {
            throw new TypeError('Expected an object as input');
        }
    
        this.roles = roles;
        let map = {};
        Object.keys(roles).forEach(role => {
            map[role] = {
                can: {}
            };
            if(roles[role].inherits) {
                map[role].inherits = roles[role].inherits;
            }
      
            roles[role].can.forEach(operation => {
                if(typeof operation === 'string') {
                    map[role].can[operation] = 1;
                } else if(typeof operation.name === 'string'
                    && typeof operation.when === 'function') {
        
                    map[role].can[operation.name] = operation.when;
                }
                // Ignore definitions we don't understand
            });
    
        });
    
        this.roles = map;
    }
  
    // ... //

    can(role, operation, params, cb) {

        if(typeof params === 'function') {
            cb = params;
            params = undefined;
        }
    
        let callback = cb ;
    
        return Q.Promise((resolvePromise, rejectPromise) => {
    
            // Collect resolve handling
            function resolve(result) {
                resolvePromise(result);
                callback(undefined, result);
            }
    
            // Collect error handling
            function reject(err) {
                rejectPromise(err);
                callback(err);
            }
    
            if (typeof role !== 'string') {
                throw new TypeError('Expected first parameter to be string : role');
            }
    
            if (typeof operation !== 'string') {
                throw new TypeError('Expected second parameter to be string : operation');
            }
    
            let $role = this.roles[role];
    
            if (!$role) {
                throw new Error('Undefined role');
            }
    
            // IF this operation is not defined at current level try higher
            if (!$role.can[operation]) {
                // If no parents reject
                if (!$role.inherits) {
                    return reject(false);
                }
                // Return if any parent resolves true or all reject
                return Q.any($role.inherits.map(parent => this.can(parent, operation, params)))
                    .then(resolve, reject);
            }
    
            // We have the operation resolve
            if ($role.can[operation] === 1) {
                return resolve(true);
            }
    
            // Operation is conditional, run async function
            if (typeof $role.can[operation] === 'function') {
                $role.can[operation](params, function (err, result) {
                    if(err) {
                        return reject(err);
                    }
                    if(!result) {
                        return reject(false);
                    }
                    resolve(true);
                });
                return;
            }
            // No operation reject as false
            reject(false);
        });
    };
}


let roleModule=new RBAC(roles);
//console.log(roleModule.roles)

console.log(roleModule.can('writer', 'edit', {user: {id:'a'}, post: {owner:'a'}}))