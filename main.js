import express from 'express'
import fs from 'fs'
import { getAllPosts, createPost, getPostByID, deletePost, updateSkinInPost } from './db.js';

const app = express()
app.use(express.json())
const port = 3000

app.use((req, res, next) => {
  const logDetails = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    payload: req.body
  };
  fs.appendFileSync('log.txt', JSON.stringify(logDetails) + '\n');
  next();
});

// Para errores
app.use((err, req, res, next) => {
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    // El servidor de base de datos cerró la conexión
    console.error('Error de conexión con la base de datos:', err.message);
    res.status(500).send('Error interno en el servidor.');
  } else {
    // Otro tipo de error
    console.error(err.stack);
    res.status(500).send('Error interno en el servidor.');
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Endpoint para obtener todos los posts
app.get('/posts', async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } 
  catch (error) {
    next(error); 
  }
});

// Endpoint para crear un nuevo post
app.post('/posts', async (req, res, next) => {
  try {
    const { 
      title, 
      cookieName, 
      battle_role, 
      abilityDesc, 
      content, 
      skins 
    } = req.body;
    const result = await createPost(
      title, 
      cookieName, 
      battle_role, 
      abilityDesc, 
      content, 
      skins
    );
    res.status(200).json(result)
  }
  catch (error) {
    next(error); 
  }
});

// Endpoint para obtener un post por su ID
app.get('/posts/:postId', async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await getPostByID(postId);

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post no encontrado' });
    }
  } catch (error) {
    next(error);
  }
});

// Endpoint para eliminar un post por su ID
app.delete('/posts/:postId', async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const result = await deletePost(postId);
    
    if (result) {
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'Post no encontrado' });
    }
  } catch (error) {
    next(error); 
  }
});

// Endpoint para actualizar skins de un post por su ID
app.put('/posts/:postId/skins', async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const { skins } = req.body;
    const updatedPost = await updateSkinInPost(postId, skins);
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ error: 'Post no encontrado' });
    }
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})