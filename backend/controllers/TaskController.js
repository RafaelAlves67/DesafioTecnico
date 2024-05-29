import Task from "../models/Task.js";

export class TaskController {
        // função para cadastrar tarefas
        static async addTasks(req,res){
        const {title, description, status} = req.body 

        // VALIDAÇÃO DE CAMPOS VAZIOS
        if(!title){
            return res.status(400).json({msg: "Preencha o campo do título!"})
        }

        if(!description){
            return res.status(400).json({msg: "Preencha o campo de descrição!"})
        }

        // TRY E CATCH PARA TRATAMENTO DE ERRO
        try{

            // CRIANDO E SALVANDO NOVA TAREFA NO BANCO DE DADOS
            const newTask = await Task.create({
                title: title,
                description: description,
                status: status
            })

            return res.status(200).json({
                msg: "Tarefa criada!", 
                statusCode: 200,
                newTask
            })
        }catch(error){
            console.log("Erro de servidor ao criar tarefa => " + error)
            return res.status(500).json("Erro de servidor interno => " + error)
        }
}

// função para edição de tarefa
static async editTask(req,res){

    const taskEdit = req.body 
    const id = req.params.id

    // VALIDANDO SE ESTÁ VINDO UM OBJETO VAZIO
    if(Object.keys(taskEdit).length === 0){
        return res.status(400).json({msg: "Não há nada para ser alterado!"})
    }

    // VALIDANDO SE ESSA TAREFA EXISTE PELO id
    const taskExist = await Task.findByPk(id)

    if(!taskExist){
        return res.status(400).json({msg: "Tarefa não encontrada!"})
    }

    // FAZENDO A EDIÇÃO NO BANCO DE DADOS
    await Task.update(taskEdit, {where: {id: id}})

    // PEGANDO A TAREFA ALTERADA PARA MANDAR COMO RESPOSTA
    const newTaskEdit = await Task.findByPk(id)

    return res.status(200).json({
        msg: "Tarefa alterada!",
        statusCode: 200,
        newTaskEdit
    })

}

    // função para remoção de tarefa
    static async deleteTask(req,res){
        const id = req.params.id 

        // VALIDANDO SE EXISTE A TAREFA PELO ID
        const taskExist = await Task.findByPk(id)

        if(!taskExist){
            return res.status(400).json({msg: "Tarefa não encontrada!"})
        }

        // DELETANDO A TAREFA DO BANCO DE DADOS
        await taskExist.destroy({_id: id})

        return res.status(200).json({msg: "Tarefa deletada!", statusCode: 200})
    }

    // função para ler as tarefas
    static async getTasks(req,res){

        try{
            const tasks = await Task.findAll()

            if(tasks.length === 0){
                return res.status(404).json({msg: "Nenhuma tarefa cadastrada!"})
            }

            return res.status(200).json(tasks)
        }catch(error){
            console.log("Erro de servidor => " + errror)
        }
    }

    // função para buscar tarefas pelo titulo 
    static async searchTask(req,res){
        const title = req.params.title.toLowerCase(); // Convertendo o título de pesquisa para minúsculas

        const tasks = await Task.findAll()
        console.log(tasks)

        const tasksFound = tasks.filter((task) => task.title.toLowerCase().includes(title))

        if (tasksFound.length === 0) {
            return res.status(404).json({ msg: "Nenhuma tarefa encontrada com esse título." });
        }
    
        return res.status(200).json(tasksFound);
    }

}   