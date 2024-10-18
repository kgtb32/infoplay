package dev.kgtb32.infoplay.infoplay_web.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(name = "game_description")
@AllArgsConstructor
@Data
@Builder
public class GameDescription{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY, generator = "game_description_seq")
    @SequenceGenerator(name = "game_description_seq", initialValue = 0)
    @JsonIgnore
    private long id;
    private Float rating;
    private String releaseDate;
    private String developer;
    private String publisher;
    private List<String> genres;
    private String players;

}