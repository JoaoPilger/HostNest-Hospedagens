import { prisma } from '../prisma/client.js';
import {randomBytes} from 'crypto'

//GET
export const getUser = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

//GET BY ID
export const getUserId = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await prisma.user.findUnique({ where: { id }});
  if (!user) {
    return res.status(404).json({error: 'Usuário não encontrado'})
  };
};

//POST
export const createUser = async (req, res) => {
  const {nome, email} = req.body;
  try {
    const users = await prisma.user.create({data: { nome, email }});
    res.status(201).json(users);
  }
  catch (error) {
    console.log(error);
    res.status(400).json({error: 'Erro ao criar usuário'});
  };
  
};

//PUT / UPDATE BY ID
export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const {nome, email} = req.body;

  try {
    const users = await prisma.user.update({
      where: {id},
      data: {nome, email}
    })
    res.status(200).json(users) 
  } 
  catch (error) {
    console.log(error);
    res.status(404).json({error: 'User nao encontrado'})
  };
};

//DELETE BY ID

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const users = await prisma.user.delete({where:{ id }})
    res.status(200).end()
  }
  catch (error) {
    console.log(error);
    respose.status(404).json({error:'User não encontrado'})
  };
};