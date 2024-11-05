CREATE TABLE IF NOT EXISTS game(
    game_id BIGINT PRIMARY KEY,
    game_name VARCHAR(255) NOT NULL,
    game_image_path VARCHAR(255),
    game_path VARCHAR(255),
    favorite BOOLEAN,
    core_core_id BIGINT,
    description_game_description_id BIGINT
);

CREATE TABLE IF NOT EXISTS cores(
    core_id BIGINT PRIMARY KEY,
    core_name VARCHAR(255) NOT NULL,
    library_path VARCHAR(255),
    priority INTEGER,
    associated_platform_platform_id BIGINT
);

CREATE TABLE IF NOT EXISTS game_description(
    game_description_id BIGINT PRIMARY KEY,
    description oid,
    developer VARCHAR(255),
    players VARCHAR(255),
    publisher VARCHAR(255),
    rating FLOAT,
    release_date VARCHAR(255),
    platform_platform_id BIGINT
);

CREATE TABLE IF NOT EXISTS game_genres(
    id BIGINT,
    genres VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS platform(
 platform_id BIGINT PRIMARY KEY,
 display_name VARCHAR(255),
 platform_image_path VARCHAR(255),
 platform_name VARCHAR(255),
 description_platform_description_id BIGINT
);

CREATE TABLE IF NOT EXISTS platform_description(
    platform_description_id BIGINT PRIMARY KEY,
    description OID,
    publisher VARCHAR(255),
    release_date VARCHAR(255)
);

CREATE UNIQUE INDEX PK_GAME_ID ON game(game_id);
CREATE INDEX FK_GAME_DESCRIPTION_ID ON game(description_game_description_id);
CREATE UNIQUE INDEX PK_CORES_ID ON cores(core_id);
CREATE UNIQUE INDEX PK_GAME_DESCRIPTION_ID ON game_description(game_description_id);
CREATE UNIQUE INDEX PK_PLATFORM_ID ON platform(platform_id);
CREATE UNIQUE INDEX PK_PLATFORM_DESCRIPTION_ID ON platform_description(platform_description_id);

CREATE UNIQUE INDEX P_PLATFORM_NAME ON platform(platform_name);
CREATE INDEX P_GAME_NAME ON game(game_name);
CREATE INDEX P_GAME_GENRES_ID ON game_genres(id);

CREATE SEQUENCE game_seq MINVALUE 0 START WITH 0 INCREMENT BY 50;
CREATE SEQUENCE game_description_seq MINVALUE 0 START WITH 0 INCREMENT BY 50;
CREATE SEQUENCE cores_seq MINVALUE 0 START WITH 0 INCREMENT BY 50;
CREATE SEQUENCE platform_seq MINVALUE 0 START WITH 0 INCREMENT BY 50;
CREATE SEQUENCE platform_description_seq MINVALUE 0 START WITH 0 INCREMENT BY 50;