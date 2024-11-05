package dev.kgtb32.infoplay.infoplay_web.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cores")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class GameCore{
    private static final String SEQUENCE_NAME = "cores_seq";

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY, generator = SEQUENCE_NAME)
    @SequenceGenerator(name = SEQUENCE_NAME, initialValue = 0)
    @JsonIgnore
    @Column(name = "core_id")
    private long id;
    @Column(name = "core_name")
    private String name;
    private String libraryPath;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Platform associatedPlatform;
    private int priority;
}
