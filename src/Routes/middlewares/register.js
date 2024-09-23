export const register = async (req, res, next) => {
    const {username, password} = req.body
    try {
        if(username.length < 6 || password.length < 6){
            return res.status(400).send(`
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                    <h1>Username ou Password precisam de no mínimo 7 digitos!</h1>
                    <a href="/register" style="text-decoration: none; margin-top: 20px;">
                        <button style="
                            padding: 10px 20px; 
                            font-weight: bold; 
                            color: white; 
                            border-radius: 2rem; 
                            cursor: pointer; 
                            width: 200px; 
                            height: 50px; 
                            border: none; 
                            background-color: #4F46E5; 
                            display: flex; 
                            justify-content: center; 
                            align-items: center; 
                            transition: background-color 0.3s;">
                            Voltar
                        </button>
                    </a>
                </div>
            `);
        }
        
    const findUser = await UserModel.findOne({username: username})
    if(findUser || username.length < 6){
        return res.status(400).send(`
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>Username inválido!</h1>
                <a href="/register" style="text-decoration: none; margin-top: 20px;">
                    <button style="
                        padding: 10px 20px; 
                        font-weight: bold; 
                        color: white; 
                        border-radius: 2rem; 
                        cursor: pointer; 
                        width: 200px; 
                        height: 50px; 
                        border: none; 
                        background-color: #4F46E5; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        transition: background-color 0.3s;">
                        Voltar
                    </button>
                </a>
            </div>
        `);
    }

    if(!password){
        return res.status(400).send(`
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>Digite uma senha válida</h1>
                <a href="/register" style="text-decoration: none; margin-top: 20px;">
                    <button style="
                        padding: 10px 20px; 
                        font-weight: bold; 
                        color: white; 
                        border-radius: 2rem; 
                        cursor: pointer; 
                        width: 200px; 
                        height: 50px; 
                        border: none; 
                        background-color: #4F46E5; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        transition: background-color 0.3s;">
                        Voltar
                    </button>
                </a>
            </div>
        `);
    }
    const splUser = username.split(" ")
    const splPass = password.split(" ")

    if(splUser.length >= 2 || splPass.length >= 2){
        return res
        .status(400)
        .send(`
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>Username ou Password precisam de 1 palavra!!</h1>
                <a href="/register" style="text-decoration: none; margin-top: 20px;">
                    <button style="
                        padding: 10px 20px; 
                        font-weight: bold; 
                        color: white; 
                        border-radius: 2rem; 
                        cursor: pointer; 
                        width: 200px; 
                        height: 50px; 
                        border: none; 
                        background-color: #4F46E5; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        transition: background-color 0.3s;">
                        Voltar
                    </button>
                </a>
            </div>
        `)
    }

    next();
    } catch (error) {
        res.status(410).send(error.message)
    }
}
