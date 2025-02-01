package it.movie.movie_animation.entity;

import it.movie.movie_animation.entity.templates.AbsEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Like extends AbsEntity {

    @ManyToOne
    private Movie movie;

    @ManyToOne
    private Users users;

}
