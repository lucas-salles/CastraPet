const Pet = require('../models/Pet');

module.exports = {

    async indexedDB(req,res) {
        const pets = await Pet.findAll();
        
        return res.json(pets);
    },
    async store(req, res){
        const { nome, especie, sexo, raca, corPelagem, porteFisico, comportamento, estadoSaude, idade} = req.body;

        const pet = await Pet.store({ nome, especie, sexo, raca, corPelagem, porteFisico, comportamento, estadoSaude, idade});

        return res.json(pet);
    }
};
