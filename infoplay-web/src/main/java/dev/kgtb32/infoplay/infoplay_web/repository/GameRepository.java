package dev.kgtb32.infoplay.infoplay_web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.kgtb32.infoplay.infoplay_web.entities.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, Long>{
    List<Game> findAllByFavorite(boolean favorite);
}
