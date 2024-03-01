CREATE TABLE IF NOT EXISTS blog_crk_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    cookie_name VARCHAR(255),
    battle_role VARCHAR(255),
    ability TEXT NOT NULL,
    content TEXT NOT NULL,
    skins TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);