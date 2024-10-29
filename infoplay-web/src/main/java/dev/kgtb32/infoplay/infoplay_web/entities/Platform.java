package dev.kgtb32.infoplay.infoplay_web.entities;

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
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY, generator = "platform_seq")
    @SequenceGenerator(name = "platform_seq", initialValue = 0)
    private long id;
    @Column(name = "name", unique = true, nullable = false)
    private String name;
    private String displayName;
    private String imagePath;

    @OneToOne(cascade = CascadeType.ALL)
    private PlatformDescription description;

}
