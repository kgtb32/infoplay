package dev.kgtb32.infoplay.infoplay_web.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY, generator = "cores_seq")
    @SequenceGenerator(name = "cores_seq", initialValue = 0)
    private long id;

    private String name;
    private String libraryPath;
    private String associatedPlatform;
    private int priority;
}
