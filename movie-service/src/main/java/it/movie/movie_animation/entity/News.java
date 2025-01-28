package it.movie.movie_animation.entity;

import it.movie.movie_animation.entity.templates.AbsEntity;
import it.movie.movie_animation.entity.templates.AbsNameEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jdk.jfr.Enabled;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class News extends AbsEntity {
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String img;
    private LocalDate startDate; // Reklama qoshilgan sanasi
    //    private LocalDateTime startDate; // Reklama qoshilgan vaqti
    private LocalDate endDate; // Reklama tugash sanasi
    //    private LocalDateTime endDate; // Reklama tugash vaqti
    private boolean isArchived = false; // Arxivlangan yoki yo'q

}
