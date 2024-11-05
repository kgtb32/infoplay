package dev.kgtb32.infoplay.infoplay_web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dev.kgtb32.infoplay.infoplay_web.entities.Game;


@Repository
public interface GameRepository extends JpaRepository<Game, Long>{   
    List<Game> findAllByFavorite(boolean favorite);
    List<Game> findAllByDescriptionPlatformName(String platformName);
    List<Game> findAllByDescriptionPlatformNameAndNameStartingWithIgnoreCase(String platformName, String name);
    
    @Query(
        nativeQuery = true,
        value = "SELECT * FROM game g LEFT JOIN game_description gd ON g.description_game_description_id = gd.game_description_id LEFT JOIN platform p ON gd.platform_platform_id = p.platform_id WHERE p.platform_name = :platformName AND g.game_name ~ :regex"
    )
    List<Game> findAllGamesByPlatformAndRegex(@Param("platformName") String platformName, @Param("regex") String regex);
}
