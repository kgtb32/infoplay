package dev.kgtb32.infoplay.infoplay_web.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "platform_description")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Data
public class PlatformDescription {
    private static final String ID_SEQUENCE = "platform_description_seq";

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY, generator = ID_SEQUENCE)
    @SequenceGenerator(name = ID_SEQUENCE, initialValue = 0)
    @JsonIgnore
    private long id;

    private String releaseDate;
    @Lob
    private String description;
    private String publisher;
}
