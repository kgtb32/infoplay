package dev.kgtb32.infoplay.infoplay_web.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "platform")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class Platform {
    private static final String SEQUENCE_NAME = "platform_seq";

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY, generator = SEQUENCE_NAME)
    @SequenceGenerator(name = SEQUENCE_NAME, initialValue = 0)
    @JsonIgnore
    @Column(name = "platform_id")
    private long id;
    @Column(name = "platform_name", unique = true, nullable = false)
    private String name;
    private String displayName;
    @Column(name = "platform_image_path")
    private String imagePath;

    @OneToOne(cascade = CascadeType.ALL)
    private PlatformDescription description;

}
