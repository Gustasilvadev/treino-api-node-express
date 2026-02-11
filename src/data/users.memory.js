let users = [
    {id:1, name:"ana"},
    {id:2, name:"joao"},
    {id:3, name:"carla"},
    {id:4, name:"pedro"},
    {id:5, name:"erick"}
]

function getAll(){
    return users;
}

function getById(id){
    return users.find(u => u.id === id) || null;
}

function createUser(name){
    const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = {
        id: nextId,
        name: name.trim()
            .toLowerCase()
            .split(' ')
            .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
            .join(' ')
    };
    users.push(newUser);
    return newUser;
}

module.exports = {
    getAll,
    getById,
    createUser
};