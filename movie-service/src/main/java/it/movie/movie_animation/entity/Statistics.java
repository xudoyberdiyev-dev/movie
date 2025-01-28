package it.movie.movie_animation.entity;

import it.movie.movie_animation.entity.templates.AbsEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Statistics extends AbsEntity {
    private long usersCount;
    private long moviesCount;
}
