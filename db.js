import conn from './conn.js'

export async function getAllPosts() {
 const [rows] = await conn.query('SELECT * FROM blog_crk_posts')
 return rows
}

export async function createPost(
    title, 
    cookieName,
    battle_role,
    abilityDesc,
    content,
    skins
) {
    const [result] = await conn.query('INSERT INTO blog_crk_posts (title, cookie_name, battle_role, ability, content, skins) VALUES (?, ?, ?, ?, ?, ?)', 
    [title,cookieName,battle_role,abilityDesc,content,skins]
    )
    const rowInserted = await getPostByID(result.insertId)
    return result
}

export async function getPostByID(blogPostID) {
    const [rows] = await conn.query('SELECT * FROM blog_crk_posts WHERE id = ?',
    [blogPostID])
    return rows.length?rows[0]:null
}

export async function deletePost(blogPostID) {
    try {
        const [result] = await conn.query('DELETE FROM blog_crk_posts WHERE id = ?', [blogPostID]);
        
        if (result.affectedRows === 1) {
          console.log(`El Post con ID ${blogPostID} fue eliminada exitosamente.`);
          return true
        } else {
          console.error(`No se encontró ningun post con el ID ${blogPostID} para eliminar.`);
          return false; // Indica que no se encontró la fila para eliminar
        }
    } 
    catch (error) {
        console.error('Error al intentar eliminar el post:', error);
        return false; // Indica que ocurrió un error al intentar eliminar la fila
    }
}

export async function updateSkinInPost(blogPostID, skins) {
    try {
        const [result] = await conn.query('UPDATE blog_crk_posts SET skins = ? WHERE id = ?', [skins, blogPostID]);
        
        if (result.affectedRows === 1) {
          console.log(`La información del post con ID ${blogPostID} fue actualizada exitosamente.`);
          const updatedPost = await getPostByID(blogPostID);
          return updatedPost;
        } else {
          console.error(`No se encontró ningun post con el ID ${blogPostID} para actualizar.`);
          return null; // Indica que no se encontró el post para actualizar
        }
    } 
    catch (error) {
        console.error('Error al intentar actualizar la informacion del post:', error);
        return null; // Indica que ocurrió un error al intentar actualizar la información del post
    }
}