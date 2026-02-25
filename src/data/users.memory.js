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
    return users.find(u => u.id === parseInt(id, 10)) || null;
}

function createUser(name){
    const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = {
        id: nextId,
        name: name.trim()
            .toLowerCase()
            .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    };
    users.push(newUser);
    return newUser;
}

function update(id, name){
    const user = getById(id);
    if (!user) return null;

    const index = users.findIndex(u => u.id === parseInt(id, 10));
    users[index].name = name.trim()
        .toLowerCase()
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    return users[index];
}

function deleteById(id){
    const index = users.findIndex(u => u.id === parseInt(id, 10));
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
}

module.exports = {
    getAll,
    getById,
    createUser,
    update,
    deleteById
};