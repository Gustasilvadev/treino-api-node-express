const http = require("http");

function readJsonBody(req){
    return new Promise((resolve, reject) =>{
        let data = "";
        req.on("data",(chunk) => (data += chunk));
        req.on("end", () =>{
            if(!data){
                return resolve(null);
            }
            try {
                resolve(JSON.parse(data))
            }catch(error){
                reject(new Error("Json invalido"));
            }
        })
    })
}


function sendJson(res,statusCode,payload){
    res.writeHead(statusCode,{"Content-type": "application/json; charset=utf-8"});
    res.end(JSON.stringify(payload));
}

const server = http.createServer(async(req,res) =>{
    const {method,url} = req;

    //Endpoint
    if(method === "GET" && url === "/health"){
        return sendJson(res,200,{status:"ok", timestamp:new Date().toISOString()});
    }

    if(method === "GET" && url === "/api/v1/users"){
        return sendJson(res,200,users);
    }

    if (method === "GET" && url.startsWith("/api/v1/users/")) {
        const id = parseInt(url.split("/")[4]); 
        const user = users.find(u => u.id === id);
        if (!user) {
            return sendJson(res, 404, { error: "Usuário não encontrado" });
        }
        return sendJson(res, 200, user);
    }

    if (method === "POST" && url === "/api/v1/createUser") {
        try {
            const body = await readJsonBody(req);
            if ( body === null ) return badRequest(res, "Corpo da requisição vazio");

            const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
            const newUser = {
                id: nextId,
                name: body.name.trim()
            };
            users.push(newUser);
            return sendJson(res, 201, { message: "Usuário criado", user: newUser });
        } catch(error) {
            return sendJson(res, 400, { error: "JSON inválido" });
        }
    }

    if (method === "PUT" && url.startsWith("/api/v1/users/")) {
        const id = parseInt(url.split("/")[4]);
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return sendJson(res, 404, { error: "Usuário não encontrado" });
        }

        try {
            const body = await readJsonBody(req);
            if (!body || !body.name) {
                return sendJson(res, 400, { error: "Nome obrigatório" });
            }
            users[userIndex].name = body.name;
            return sendJson(res, 200, users[userIndex]);

        } catch (error) {
            return sendJson(res, 400, { error: "Erro no JSON" });
        }
    }

    if (method === "DELETE" && url.startsWith("/api/v1/users/")) {
        const id = parseInt(url.split("/")[4]);
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return sendJson(res, 404, { error: "Usuário não encontrado" });
        }
        users.splice(userIndex, 1);
        return sendJson(res, 200, { message: "Usuário deletado" });
    }

});

const PORT = process.env.PORT || 3000;
    server.listen(PORT, ()=>console.log(`Api Rodando em http://localhost:${PORT}`))