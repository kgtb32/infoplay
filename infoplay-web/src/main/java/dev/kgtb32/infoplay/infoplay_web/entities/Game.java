package dev.kgtb32.infoplay.infoplay_web.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(name = "game")
@Data
@AllArgsConstructor
@Builder
public class Game{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY, generator = "game_seq")
    @SequenceGenerator(name = "game_seq", initialValue = 0)
    private long id;
    private String name;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    GameDescription description;
    private String imagePath;
    private String gamePath;
    private boolean favorite;
}