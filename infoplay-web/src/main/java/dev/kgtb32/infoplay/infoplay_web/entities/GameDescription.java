package dev.kgtb32.infoplay.infoplay_web.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "game_description")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GameDescription{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY, generator = "game_description_seq")
    @SequenceGenerator(name = "game_description_seq", initialValue = 0)
    @Column(name = "game_description_id")
    @JsonIgnore
    private long id;
    private Float rating;
    private String releaseDate;
    private String developer;
    private String publisher;

    @ElementCollection
    @CollectionTable(name = "game_genres", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "genres")
    private List<String> genres;

    private String players;
    @Lob
    private String description;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Platform platform;
}