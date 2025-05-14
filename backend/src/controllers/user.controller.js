import { prisma } from '../prisma/client.js';

//GET
export const getUsers = async (requise, response) => {
  const users = await prisma.user.findMany();
  response.json(users);
};

//GET BY ID
export const getUserId = async (require, response) => {
  const id = parseInt(require.params.id);
  const user = await prisma.user.findUnique({ where: { id }});
  if (!user) {
    return response.status(404).json({error: 'Usuário não encontrado'})
  };
};

//POST
export const createUser = async (require, response) => {
  const {nome, email} = require.body;
  try {
    const user = await prisma.user.create({data: nome, email})
    response.status(201).json(user)
  } catch (err) {
    response.status(400).json({error: 'Erro ao criar usuário'})
  };
  
};

//PUT user/id
export const updateUser = async (require, response) => {
  const id = parseInt(require.params.id);
  const {nome, email} = require.body;

  try {
    const user = await prisma.user.update({
      where: id,
      data: nome, email
    })
    response.status(200).json(user) 
  } catch (error) {
    response.status(404).json({error: 'User nao encontrado'})
  };
};

//DELETE

export const deleteUser = async (require, respose) => {
  const id = parseInt(require.params.id)
  try {
    const user = await prisma.user.delete({where:{ id }})
    response.status(200).end()
  } catch (error) {
    respose.status(404).json({error:'User não encontrado'})
  };
};