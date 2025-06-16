import { prisma } from '../prisma/client.js';
import bcrypt from 'bcrypt'

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
  const {nome, email, senha} = req.body;
  try {
    const senhaHash = await bcrypt.hash(senha, 10)

    const users = await prisma.user.create({data: { nome, email, senha: senhaHash}});
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
    res.status(404).json({error: 'Usuário nao encontrado'})
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
    respose.status(404).json({error:'Usuario não encontrado'})
  };
};

//LOGIN

export const loginUser = async (req, res) =>{
    const {email, senha} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {email},
        })
        
        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const senhaValida = await bcrypt.compare(senha, user.senha)

        if (!user || !senhaValida) {
            return res.status(401).json({ error: 'Senha ou usuário não correspondem' });
        }

        // Criar a sessão do usuário
        req.session.user = {
            id: user.id,
            nome: user.nome,
            email: user.email
        };

        // Salvar a sessão
        req.session.save((err) => {
            if (err) {
                console.error('Erro ao salvar sessão:', err);
                return res.status(500).json({ error: 'Erro ao criar sessão' });
            }
            res.json({ 
                message: 'Login realizado com sucesso',
                user: {
                    id: user.id,
                    nome: user.nome,
                    email: user.email
                }
            });
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
}


// VERIFICACAO DE SESSION
export const sessionVer = async (req, res) => {
  if (req.session.user) {
    // Usuário está autenticado, responde com dados da sessão
    console.log("Sessão válida");
    return res.json({ loggedIn: true, user: req.session.user });
    
  } else {
    // Sessão não existe
    console.log("Não autenticado");
    return res.status(401).json({ loggedIn: false, message: 'Não autenticado' });
  }
};

// LOGOUT
export const logOut = async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout realizado' });
  });
};