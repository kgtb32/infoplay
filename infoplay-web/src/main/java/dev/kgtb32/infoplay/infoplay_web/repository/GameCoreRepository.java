package dev.kgtb32.infoplay.infoplay_web.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.kgtb32.infoplay.infoplay_web.entities.GameCore;

@Repository
public interface GameCoreRepository extends JpaRepository<GameCore, Long>{
    public Optional<GameCore> findFirstByAssociatedPlatformNameOrderByPriorityDesc(String associatedPlatformName);
}
