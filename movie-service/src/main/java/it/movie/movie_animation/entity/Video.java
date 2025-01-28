package it.movie.movie_animation.entity;

import it.movie.movie_animation.entity.templates.AbsEntity;
import jakarta.persistence.*;
import jdk.jfr.Enabled;
import lombok.*;

@EqualsAndHashCode(callSuper = false)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Video extends AbsEntity {
    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String video;



}
