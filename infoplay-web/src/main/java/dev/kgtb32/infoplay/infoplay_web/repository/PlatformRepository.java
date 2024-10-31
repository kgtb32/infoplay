package dev.kgtb32.infoplay.infoplay_web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import dev.kgtb32.infoplay.infoplay_web.entities.Platform;

public interface PlatformRepository extends JpaRepository<Platform, Long>{
    Optional<Platform> findFirstByName(String name);
    Optional<Platform> findByName(String name);
}
