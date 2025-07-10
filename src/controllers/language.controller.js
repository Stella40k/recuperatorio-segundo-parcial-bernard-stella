import { programa } from "../models/language.model.js";
import { config } from "dotenv";

//traer todo
export const getAllPrograma = async (req, res) => {
    try {
     const programas = await programa.findAll();
     res.status(200).json(programas)
    } catch (error) {
        res.status(500).json({error: "no se pudo traer todos los programas", error: error.message});
    }
};

//traere uno solo por su id
export const getProgramaById =async (req, res) =>{
    try {
        const programa = programa.findByPk(req.params.id);
        if(!programa){
        return res.status(404).json({error: "No se pudo traer al programa"});
        }
    } catch (error) {
        return res.status(404).json({error: "No existe el programa o esta mal puesto la id", error: error.message});
      
    }
};

//agregar uno
export const createPrograma = async (req, res) => {
    try {
        let {name, paradigm, release_year} = req.body;
        if(!name || !paradigm || !release_year){
            return res.status(400).json({message: "completa los campos obligatorios"});
        }
        if (!release_year && release_year !== 'number') {
            return res.status(400).json({message: "solo numeros enteros"});
        }
        if (!name || name.trim() === "") {
            return res.status(400).json({message: "no se permiten campos vacios"});
        }
        if (!paradigm || paradigm.trim() === "") {
            return res.status(400).json({message: "no se permiten campos vacios"});
        }
        const nuevoPrograma = await programa.create({ name, paradigm, release_year });
        return res.status(201).json({ message: "programa creado", programa: nuevoPrograma }); 
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "error con el servidor", error: error.message});
     
    }
};

//actualizar
export const updatePrograma = async (req, res) =>{
    try {
        const { id } = req.params;
        const {name, paradigm, release_year} = req.body; 
        const programa = await programa.findByPk(id);
        if(!programa){
            return res.status(404).json({message: "no se encontro el programa"});
        }
        if(name) programa.name = name.trim();
        if(paradigm) programa.paradigm = paradigm.trim();
        if(release_year || release_year ===0) programa.release_year = release_year;
       
        await programa.save();
        res.status(200).json({message: "se actualizo un programa", programa});
    } catch (error) {
        res.status(500).json({message: "error con el servidor", error: error.message});
    }
};

//borrar un programa
export const deletePrograma = async (req, res) => {
    try {
        const { id } = req.params;
        const programa = await programa.findByPk(id);
        if (!programa) {
            return res.status(404).json({message: "no se encontro el programa"});
        }

        await programa.destroy();
        res.status(200).json({message: "se elimino un programa"});
    } catch (error) {
        return res.status(500).json({message: "error con el servidor", error: error.message});
    }
};


